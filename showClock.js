let nextHoriday = "";
let horidayName = "";

// 時分秒が10未満の時に先頭に0を足す
const set2dig = (num) => {
    let ret;
    if (num < 10) { ret = "0" + num; }
    else ret = num;
    return ret;
}

// 日付と時刻を表示
const showClock = () => {
    let weekDay = ["日", "月", "火", "水", "木", "金", "土"];
    let dt = new Date();

    document.getElementById("today").innerHTML =
        `今日は ${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日${weekDay[dt.getDay()]}曜日`;

    document.getElementById("nowClock").innerHTML =
        `現在時刻は ${set2dig(dt.getHours())}:${set2dig(dt.getMinutes())}:${set2dig(dt.getSeconds())}`;
}

const regularTimer = () => {
    let dt = new Date();
    let msg = "今は就業時間外です！帰ってください！";

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
    let dt = new Date();
    let fridayDt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 18);
    let msg2 = "今日は休日です！休んでください！";

    // 曜日のカウント用、初期値は金曜日
    let cnt = 5;

    // 土日ならタイマーの代わりにメッセージを表示
    if (dt.getDay() == 0 || dt.getDay() == 6) {
        document.getElementById("fridayCount").innerHTML = msg2;
    }
    // 平日なら金曜日までの差分を表示
    else {
        // 今日から金曜日までの差分を求める
        cnt -= dt.getDay();
        fridayDt.setDate(dt.getDate() + cnt);
        fridayDt -= dt;

        // 金曜日までの残日数を算出
        let leftDay = (Math.floor(fridayDt / (1000 * 60 * 60 * 24)));

        // 金曜日までの残り時間を算出、求めた単位の余りから次の単位を算出
        let hour = set2dig((Math.floor(fridayDt / (1000 * 60 * 60))));
        fridayDt %= (1000 * 60 * 60);

        let min = set2dig((Math.floor(fridayDt / (1000 * 60))));
        fridayDt %= (1000 * 60);

        let sec = set2dig((Math.floor(fridayDt / 1000)));

        document.getElementById("fridayCount").innerHTML = `金曜日の終業時間まで ${hour}:${min}:${sec}(あと${leftDay}日)`;
    }
}

const checkHoriday = () => {
    // 2020年から2021年までの祝日
    let ary = [
        ['2020/1/1', '元日'],
        ['2020/1/13', '成人の日'],
        ['2020/2/11', '建国記念の日'],
        ['2020/2/23', '天皇誕生日'],
        ['2020/2/24', '休日'],
        ['2020/3/20', '春分の日'],
        ['2020/4/29', '昭和の日'],
        ['2020/5/3', '憲法記念日'],
        ['2020/5/4', 'みどりの日'],
        ['2020/5/5', 'こどもの日'],
        ['2020/5/6', '休日'],
        ['2020/7/23', '海の日'],
        ['2020/7/24', 'スポーツの日'],
        ['2020/8/10', '山の日'],
        ['2020/9/21', '敬老の日'],
        ['2020/9/22', '秋分の日'],
        ['2020/11/3', '文化の日'],
        ['2020/11/23', '勤労感謝の日'],
        ['2021/1/1', '元日'],
        ['2021/1/11', '成人の日'],
        ['2021/2/11', '建国記念の日'],
        ['2021/2/23', '天皇誕生日'],
        ['2021/3/20', '春分の日'],
        ['2021/4/29', '昭和の日'],
        ['2021/5/3', '憲法記念日'],
        ['2021/5/4', 'みどりの日'],
        ['2021/5/5', 'こどもの日'],
        ['2021/7/19', '海の日'],
        ['2021/8/11', '山の日'],
        ['2021/9/20', '敬老の日'],
        ['2021/9/23', '秋分の日'],
        ['2021/10/11', 'スポーツの日'],
        ['2021/11/3', '文化の日'],
        ['2021/11/23', '勤労感謝の日']
    ];

    let dt = new Date();

    for (let i = 0; i < ary.length; i++) {

        // 祝日が入るまでループ(直近の祝日が決まったら代入はやめる)
        if (nextHoriday == "") {
            let dt2 = new Date(ary[i][0]);

            // 未来の祝日なら日付と名前を代入
            if (dt.getTime() < dt2.getTime()) {
                nextHoriday = ary[i][0];
                horidayName = ary[i][1];
            }
        }
    }
}

const horidayCount = () => {
    let dt = new Date();
    let horiday = new Date(nextHoriday);

    // 祝日までの差分を求める
    horiday -= dt;

    // 祝日までの残日数を算出
    let leftDay = (Math.floor(horiday / (1000 * 60 * 60 * 24)));

    //ミリ秒で差分を求めているため、日数を+1日する
    document.getElementById("horidayCount").innerHTML = `${horidayName}まで ${leftDay + 1}日`;
}

// 初回読み込み
showClock();
regularTimer();
fridayCount();
checkHoriday();
horidayCount();

// 1秒(=1000ミリ秒)毎にタイマーを動かす
setInterval('showClock()', 1000);
setInterval('regularTimer()', 1000);
setInterval('fridayCount()', 1000);
setInterval('checkHoriday()', 1000);
setInterval('horidayCount()', 1000);

