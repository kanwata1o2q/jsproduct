// パネルの数字(1~9)
let ary = [];

// 何枚クリックしたか
let count = 0;

// 次の数字
let nextNum = 1;

// 開始時間
let startTime;

// スタート時、9枚のパネルにランダムな数字をセット
const setNumber = () => {
    ary.length = 0;
    count = 0;
    nextNum = 1;

    for (let i = 0; i < 9; i++) {

        // 配列に入っていない数字が出るまでループ
        while (true) {

            // 1~9のランダムな値を生成
            tmp = Math.floor((Math.random() * 9)) + 1;

            if (!ary.includes(tmp)) {
                // 入ってない数字なら配列に格納して抜ける
                ary.push(tmp);
                break;
            }
        }

        // パネルに表示
        document.getElementById("p" + (i + 1)).innerHTML = ary[i];
    }
}

// クリックされた数字が次の番号かチェック
const checkNumber = (num) => {

    // クリックされた数字が次の数字と一致していればカウントアップ
    if (nextNum === ary[num - 1]) {
        count++;
        nextNum++;
    }
    // 間違った数字なら、やり直し(タイマーは継続)
    else {
        setNumber();
    }

    // 9枚カウントしたら終わり
    if (count === 9) {
        setTimer();
    }
}

const setTimer = () => {

    // 停止時間
    let stopTime = new Date();

    // 停止と開始の差分
    let diff = stopTime - startTime;

    // 差分からかかった時間の分秒ミリ秒を算出
    let diffMin = set2dig(Math.floor(diff / (1000 * 60)));
    diff %= (1000 * 60);
    let diffSec = set2dig(Math.floor(diff / 1000));
    let diffMilli = diff % 1000;

    // 画面に表示
    document.getElementById("timer").innerHTML = `${diffMin}:${diffSec}:${diffMilli}`;
}

// 分秒が10未満なら、先頭に0を追加
const set2dig = (value) => {
    if (value < 10) {
        return "0" + value;
    } else {
        return value;
    }
}

// スタートボタン
document.getElementById("start").onclick = () => {
    setNumber();
    document.getElementById("timer").innerHTML = "順番にクリックすると、最後にタイムが表示されます。";
    startTime = new Date();
}


// クリックしたパネルの位置を引数に数字チェック
document.getElementById("p1").onclick = () => {
    checkNumber(1);
}

document.getElementById("p2").onclick = () => {
    checkNumber(2);
}

document.getElementById("p3").onclick = () => {
    checkNumber(3);
}

document.getElementById("p4").onclick = () => {
    checkNumber(4);
}

document.getElementById("p5").onclick = () => {
    checkNumber(5);
}

document.getElementById("p6").onclick = () => {
    checkNumber(6);
}

document.getElementById("p7").onclick = () => {
    checkNumber(7);
}

document.getElementById("p8").onclick = () => {
    checkNumber(8);
}

document.getElementById("p9").onclick = () => {
    checkNumber(9);
}