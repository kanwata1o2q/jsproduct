let weekDay = ["日", "月", "火", "水", "木", "金", "土"];
let msg = "今は就業時間外です！帰ってください！";
let msg2 = "今日は休日です！休んでください！";

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

    document.getElementById("today").innerHTML =
        `今日は ${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日${weekDay[dt.getDay()]}曜日`;

    document.getElementById("nowClock").innerHTML =
        `現在時刻は ${set2dig(dt.getHours())}:${set2dig(dt.getMinutes())}:${set2dig(dt.getSeconds())}`;
}

const regularTimer = () => {
    let dt = new Date();
    // 当日の18時
    let period = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 18);

    let leftTime = period - dt;

    // 目標までの残時分秒を算出、求めた単位の余りから次の単位を算出
    let hour = set2dig((Math.floor(leftTime / (1000 * 60 * 60))));
    leftTime %= (1000 * 60 * 60);

    let min = set2dig((Math.floor(leftTime / (1000 * 60))));
    leftTime %= (1000 * 60);

    let sec = set2dig((Math.floor(leftTime / 1000)));

    //　勤務時間外はメッセージを表示
    if (leftTime > 0 && hour < 7) {
        document.getElementById("remTime").innerHTML = `終業時間まで ${hour}:${min}:${sec}`;
    }
    else {
        document.getElementById("remTime").innerHTML = msg;
    }
}

const fridayCount = () => {
    let dt2 = new Date();
    let fridayDt = new Date(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), 18);
    // 曜日のカウント用、初期値は金曜日
    let cnt = 5;

    // 土日ならタイマーの代わりにメッセージを表示
    if (dt2.getDay() == 0 || dt2.getDay() == 6) {
        document.getElementById("fridayCount").innerHTML = msg2;
    }
    // 平日なら金曜日までの差分を表示
    else {
        // 今日から金曜日までの差分を求める
        cnt -= dt2.getDay();
        fridayDt.setDate(dt2.getDate() + cnt);
        fridayDt -= dt2;

        // 目標までの残日数を算出
        let leftDay = (Math.floor(fridayDt / (1000 * 60 * 60 * 24)));

        // 目標までの残時分秒を算出、求めた単位の余りから次の単位を算出
        let hour = set2dig((Math.floor(fridayDt / (1000 * 60 * 60))));
        fridayDt %= (1000 * 60 * 60);

        let min = set2dig((Math.floor(fridayDt / (1000 * 60))));
        fridayDt %= (1000 * 60);

        let sec = set2dig((Math.floor(fridayDt / 1000)));

        document.getElementById("fridayCount").innerHTML = `金曜日の終業時間まで ${hour}:${min}:${sec}(あと${leftDay}日)`;
    }
}

// 初回読み込み
showClock();
regularTimer();
fridayCount();

// 1秒(=1000ミリ秒)毎にタイマーを動かす
setInterval('showClock()', 1000);
setInterval('regularTimer()', 1000);
setInterval('fridayCount()', 1000)
