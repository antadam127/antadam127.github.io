function addStyleSwitcher() {
    // Create Radio Buttons
    if (styleOptions.length > 0) {
        let menu = document.createElement('div');
        menu.id = 'stylemenu';
        let radioStyles = styleOptions;
        // Add all if -1
        if (styleOptions[0] === -1) {
            radioStyles = [];
            for (let i = 0; i < allMapStyles.length; i++) {
                radioStyles.push(i);
            }
        }
        for (const i of radioStyles) {
            let item = document.createElement('input');
            item.id = allMapStyles[i][2];
            item.type = 'radio';
            item.name = 'rtoggle';
            item.checked = allMapStyles[i] == config.startingStyle ? true : false;
            item.onclick = () => {
                // currentStyle =
                if (allMapStyles[i] != currentStyle) {
                    currentStyle = allMapStyles[i];
                    map.setStyle(allMapStyles[i][2]);
                }
            }
            menu.appendChild(item);
            let label = document.createElement('label');
            label.setAttribute('for', allMapStyles[i][2]);
            label.innerHTML = ' ' + allMapStyles[i][1] + ' ';
            menu.appendChild(label);
        }
        document.body.appendChild(menu);
    }
    console.log('Style Switcher Initialized');
}

function nextStyle(dir) {
    let radioStyles = styleOptions;
    if (styleOptions[0] === -1) {
        radioStyles = [];
        for (let i = 0; i < allMapStyles.length; i++) radioStyles.push(i);
    }
    let index = radioStyles.findIndex((e) => e == currentStyle[0]);
    index += (dir === -1) ? -1 : 1;
    if (index == radioStyles.length) index = 0;
    else if (index == -1) index = radioStyles.length - 1;
    setTheStyleSwitchers(allMapStyles[radioStyles[index]]);
}

function setTheStyleSwitchers(style) {
    currentStyle = style;
    map.setStyle(currentStyle[2]);
    document.getElementById(currentStyle[2]).click();
}

// Add Keydown Listeners
if (config.styleSwitcher && config.styleSwitcherOptions.enableKeyboardShortcuts && styleOptions.length > 0) {
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') nextStyle(e.shiftKey ? -1 : 1);
        if (e.key == 'Backspace') setTheStyleSwitchers(getRandomStyle());
    });
}
