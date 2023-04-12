// Set Skills
skills.forEach((e) => {
    $('#skill-container').append(`
        <li class="mb-2">
            <div class="d-flex mb-1">
                ${e.link ? `<strong><a class="inherit hover-color" href="${e.link}" target="_blank">${e.skill}</a></strong>` : `<strong>${e.skill}</strong>`}
                <span class="ml-auto">&nbsp;${e.percent}%</span>
            </div>
                <div class="progress custom-progress">
                <div class="progress-bar" role="progressbar" style="width: ${e.percent}%" aria-valuenow="${e.percent}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </li>
    `);
});

// Set Filters
filters.forEach((e) => {
    // $("#filters").append(`<a href="#" data-filter=".${e.toLowerCase()}">${e}</a>`);
    $("#filters").append(`<a href="#" data-filter=".${(match = e.toLowerCase().match(/^[a-zA-Z]+/)) ? match[0] : ''}">${e}</a>`);
});

// Shuffle Portfolio Order
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }
// shuffle(portfolio);
function shuffleWithSeed(arr) {
    const seed = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
    console.log(seed);
    const random = new Math.seedrandom(seed); // Create a seeded random number generator
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1)); // Generate a random index based on the seed
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the elements at index i and j
    }
}
shuffleWithSeed(portfolio);

// Add Portfolio Items
portfolio.forEach((e, i) => {
    $('#portfolio-grid').append(`
        <div id="itemAdded_${i + 1}" class="item col-sm-6 col-md-4 col-lg-4 mb-4">
            <a href="portfolio/index-page.html?item=${e.id}" class="item-wrap fancybox" style="box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;">
                <div class="work-info">
                    <h3>${e.title}</h3>
                </div>
                <img class="img-fluid" src="portfolio/images/${e.id}.jpg" />
            </a>
        </div>
    `);
    if (e.tags) e.tags.forEach((ee, ii) => {
        // $(`#itemAdded_${i + 1}`).addClass(ee.toLowerCase());
        $(`#itemAdded_${i + 1}`).addClass((match = ee.toLowerCase().match(/^[a-zA-Z]+/)) ? match[0] : '');
        $(`#itemAdded_${i + 1} .work-info`).append(`<span>${ii == 0 ? '' : ' | '}${ee}</span>`);
    });
});

// CHECK URL PARAMETERS
(function setConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("jumpto")) {
        const target = urlParams.get("jumpto");
        urlParams.delete("jumpto");
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`); // IMPORTANT LINE
        $(document).ready(function () {
            setTimeout(function () {
                window.location.href = "#" + target;
                console.log(window.location.href);
            }, 1000);
        });
    }
})();