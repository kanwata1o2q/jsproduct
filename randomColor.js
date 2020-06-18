
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
    let colorCode = "";

    colorCode = getColor();
    source += "<div class=\"panelBlack\" style=\"background-color:" + colorCode + "\">" + colorCode +"</div>";
    return source;
}

const setColor = () => {
    let htmlSource = "";
    for (let i = 0; i < 100; i++) {
        htmlSource += setHTML();
    }
    document.getElementById("result").innerHTML = htmlSource;
}


// RGB値が10未満の場合、先頭に0を付加
const check2dig = (code) => {
    if (code < 10) {
        return "0" + code;
    } else {
        return code.toString(16);
    }
}

// 初期設定
setColor();

document.getElementById("update").onclick = () => {
    setColor();
}