// Set Skills
skills.forEach((e) => {
    $('#skill-container').append($(`
        <li class="mb-2">
            <div class="d-flex mb-1">
                ${e.link ? `<strong><a class="inherit hover-color" href="${e.link}" target="_blank">${e.skill}</a></strong>` : `<strong>${e.skill}</strong>`}
                <span class="ml-auto">&nbsp;${e.percent}%</span>
            </div>
                <div class="progress custom-progress">
                <div class="progress-bar" role="progressbar" style="width: ${e.percent}%" aria-valuenow="${e.percent}" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </li>
    `));
});

// Set Filters
filters.forEach((e) => {
    $("#filters").append($(`<a href="#" data-filter=".${e.toLowerCase()}">${e}</a>`));
});

//Shuffle Portfolio Order
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(portfolio);

// CHECK URL PARAMETERS
(function setConfig() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("jumpto")) {
        $(document).ready(function () {
            console.log('load');
            setTimeout(function () {
                console.log('delay');
                // window.location.href = "#" + urlParams.get("jumpto");
                window.location.href = "#" + urlParams.get("jumpto");
                console.log(window.location.href);
                urlParams.delete("jumpto");
            }, 1000);
        });
        //   if (allConfigSets.hasOwnProperty(con)) config = allConfigSets[con];
    }
})();