let p = {};
// Check URL Paramaters
(function checkParams() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("item")) {
        const check = portfolio.filter(e => e.id == urlParams.get("item"));
        if (check.length > 0) p = check[0];
    }
})();

// Populate Webpage
document.title = p.title;
$('#mod1').append(p.title);
$('#mod2').append(p.desc);
if (p.externalSite) {
    $('#mod3').attr("href", p.externalSite);
    $('#mod3').addClass('external-button');
    // $('#mod9').append(`<a href="${p.externalSite}" target="_blank" class="readmore">Visit Site</a>`);
    $('#mod9').append(`<a href="${p.externalSite}" class="readmore">Visit Site</a>`);
} else $('#mod3').addClass('external-button-greyed');
if (p.main) {
    if (p.main.type == 'iframe') {
        $('#main-content').append(`<iframe id="iframe-content" defer src="${p.main.src}" frameborder="0" style="border-radius: 0 0 6px 6px; width: 100%; height: 100%"></iframe>`);
    } else if (p.main.type == 'script') { }
}
$('#mod5').append(p.title2);
if (p.tags) p.tags.forEach((t, i) => $('#mod6').append(`<span class="text-muted">${i == 0 ? '' : ', '}${t}</span>`));
$('#mod7').append(p.desc2);
if (p.skills) p.skills.forEach(s => $('#mod8').append(`<li>${s}</li>`));

// Set Up Red X
$('#redX').click(function () {
    // document.getElementById('iframe-content').contentWindow.location.reload();
    const iframe = document.getElementById('iframe-content');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(`<button onclick="window.location.href = '${p.main.src}';">Reload</button>`);
    iframe.contentWindow.document.close();

});