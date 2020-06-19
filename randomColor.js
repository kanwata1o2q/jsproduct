
// 0~255のランダムな数字を返す
const randomNum = () => {
    return Math.floor((Math.random()) * 255);
}

// RGB値からカラーコードを作成
const getColor = () => {
    let r = randomNum();
    let b = randomNum();
    let g = randomNum();
    let colorCode = "#" + check2dig(r) + check2dig(g) + check2dig(b);

    return colorCode;
}

// 返ってきたカラーコードをページに反映
const setHTML = () => {
    let source = "";
    let colorCode = getColor();
    let fontColor = setFontColor(colorCode);

    // 指定された文字色でdivタグを記述
    if (fontColor === "white") {
        source += "<div class=\"fontWhite\" style=\"background-color:" + colorCode + "\">" + colorCode + "</div>";
    } else {
        source += "<div class=\"fontBlack\" style=\"background-color:" + colorCode + "\">" + colorCode + "</div>";
    }

    return source;
}

const setColor = () => {
    let htmlSource = "";

    for (i = 0; i < 100; i++) {
        htmlSource += setHTML();
    }

    document.getElementById("result").innerHTML = htmlSource;
}

// 背景色に合わせて文字色を白か黒か判断する
const setFontColor = (color) => {
    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);

    return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128) ? "white" : "black";
}


// RGB値が15以下の場合、先頭に0を付加
const check2dig = (code) => {
    if (code < 16) {
        return "0" + code.toString(16);
    } else {
        return code.toString(16);
    }
}

// 初期設定
setColor();

document.getElementById("update").onclick = () => {
    setColor();
}