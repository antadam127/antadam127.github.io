// Set Filters
$("#filter-wrapper-ua").append($(`<li><a href="#" class="opc-main-bg selected" data-filter="*">All</a></li>`));
filters.forEach((e) => {
  $("#filter-wrapper-ua").append($(`<li><a href="#" class="opc-main-bg" data-filter=".${e}">${e.charAt(0).toUpperCase() + e.slice(1)}</a></li>`));
});

//Shuffle Portfolio Order
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(portfolio);

// Set Portfolio Items
portfolio.forEach((e, i) => {
  // Add Items
  $("#portfolio-wrapper-ua").append(
    $(`
        <div id="portfolio-item-${i + 1}-ua" class="iso-box col-md-3 col-sm-3 col-xs-12">
            <div class="portfolio-thumb">
            <img src="${
              e.image ? "more/portfolio/images/" + e.image : `https://picsum.photos/3${i * 3 < 10 ? "0" + i * 3 : i * 3}/2${i * 2 < 10 ? "0" + i * 2 : i * 2}`
            }" class="fluid-img" alt="${e.name} Image" />
            <a ${e.url ? `href="${e.url}" target="_blank"` : 'href="#portfolio"'}>
                <div class="portfolio-overlay">
                    <h3 class="portfolio-item-title">${e.name}</h3>
                    <p>${e.description ? e.description : ""}</p>
                </div>
            </a>
            </div>
        </div>
    `)
  );
  // Add Classes
  if (e.tags)
    e.tags.forEach((t) => {
      $(`#portfolio-item-${i + 1}-ua`).addClass(t);
    });
});
