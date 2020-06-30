// next = 次のpid count = 移動したパネルの数 line = パネルの辺の長さ hgt = 現在のパネルの行 
let next = 0;
let line = 6;
let row = 0;
let col = 0;
let round = 0;
let flg = false;
let panelEXE = "";

// 6×6のパネルを作成し、次に移動するパネルを呼び出す
const makePanel = () => {
    let panelSource = "";
    let pid = 0;
    // 上段の2つの9パネルを作成(panel1,panel2)
    for (let i = 0; i < (line / 2); i++) {
        panelSource += "<div class=\"row\">";
        for (let j = 0; j < (line / 2); j++) {
            panelSource += "<div id=\"pid" + pid + "\" class=\"panel1\"></div>";
            pid++;
        }
        for (let k = 0; k < (line / 2); k++) {
            panelSource += "<div id=\"pid" + pid + "\" class=\"panel2\"></div>";
            pid++;
        }
        panelSource += "</div>";
    }

    // 下段の2つの9パネルを作成(panel1,panel2)
    for (let i = 0; i < (line / 2); i++) {
        panelSource += "<div class=\"row\">";
        for (let j = 0; j < (line / 2); j++) {
            panelSource += "<div id=\"pid" + pid + "\" class=\"panel3\"></div>";
            pid++;
        }
        for (let k = 0; k < (line / 2); k++) {
            panelSource += "<div id=\"pid" + pid + "\" class=\"panel4\"></div>";
            pid++;
        }
        panelSource += "</div>";
    }

    // movePanel.htmlに反映
    document.getElementById("panel").innerHTML = panelSource;

    // 移動するパネルを設定
    if (flg) {
        setPanel();
    }
}

// 外周から中央に向かって1枚のパネルが移動する
const setPanel = () => {
    document.getElementById("pid" + next).style.backgroundColor = "black";
    next = getPanel(next);
}

const getPanel = (value) => {
    if (row === (line / 2) && col === (line / 2) && value === 20) {
        row = 0;
        col = 0;
        round = 0;
        return 0;
    }

    else if (row === (line - 1 - round)) {
        if (value > ((line - 1) * (line - round))) {
            value--;
        } else {
            value -= line;
        }
        if (value === 0 || value === (line * round) + 1) {
            round++;
            row = round;
            col = round;
            value = (line + 1) * round;
        }
    } else if (col === (line - 1 - round)) {
        value += line;
        row++;
    } else {
        value++;
        col++;
    }
    return value;
}

// 初期起動
makePanel();

document.getElementById("startBtn").onclick = () => {
    if (!flg) {
        flg = true;
        panelEXE = setInterval("makePanel()", 100);
    }
}

document.getElementById("stopBtn").onclick = () => {
    if (flg) {
        flg = false;
        clearInterval(panelEXE);
    }
}
