let num = 10;

const makeRow = () => {
    let row = "";
    for (let i = 0; i < (num*4); i++) {
        row += "<div class=\"dotBlack\" style=\"animation-delay:" + (0.1 * i) + "s\"></div>";
    }
    return row;
}

const makeCol = () => {
    let wave = "";

    for (let i = 0; i < num; i++) {
        wave += "<div class=\"row\">";
        wave += makeRow();
        wave += "</div>";
    }

    document.getElementById("waveContents").innerHTML = wave;
}

makeCol();