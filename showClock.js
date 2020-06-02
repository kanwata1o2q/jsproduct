
// 時分秒が10未満の時に先頭に0を足す
const set2dig = (num) => {
    let ret;
    if (num < 10) { ret = "0" + num; }
    else ret = num;
    return ret;
}

// 日付と時刻を表示
const showClock = () => {
    let dt = new Date();
    let weekDay = ["日", "月", "火", "水", "木", "金", "土"];

    document.getElementById("today").innerHTML =
        `今日は ${dt.getFullYear()}年${dt.getMonth()}月${dt.getDate()}日${weekDay[dt.getDay()]}曜日`;

    document.getElementById("nowClock").innerHTML =
        `現在時刻は ${set2dig(dt.getHours())}:${set2dig(dt.getMinutes())}:${set2dig(dt.getSeconds())}`;
}

const regularTimer = () => {
    let dt = new Date();
    let endToday = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 18);
    let leftTime = endToday - dt;

    let endHour = set2dig((Math.floor(leftTime / (1000 * 60 * 60))));
    leftTime %= (1000 * 60 * 60);

    let endMin = set2dig((Math.floor(leftTime / (1000 * 60))));
    leftTime %= (1000 * 60);

    let endSec = set2dig((Math.floor(leftTime / 1000)));
    let msg = "就業時間外です！休んでください！";

    if (leftTime > 0 && endHour < 7) {
        document.getElementById("remTime").innerHTML = `残り時間は ${endHour}:${endMin}:${endSec}`;
    }
    else {
        document.getElementById("remTime").innerHTML = msg;
    }
}

// 初回読み込み
showClock();
regularTimer();

// 1秒(=1000ミリ秒)毎に現在時刻表示
setInterval('showClock()', 1000);
setInterval('regularTimer()', 1000);