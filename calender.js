// 現在のカレンダーの日付
let dt = new Date();

// 何月のカレンダーかタイトルに記載
const setTitle = () => {
    document.getElementById("title").innerHTML = `${dt.getFullYear()}年${dt.getMonth() + 1}月`;
}

//　dtの月のカレンダーを表示
const setCalender = () => {
    // カレンダーのリスト用
    let calenderList = "";

    // 曜日
    let weekDay = ["日", "月", "火", "水", "木", "金", "土"];

    // 月初めを取得
    let firstDay = new Date(dt.getFullYear(), dt.getMonth(), 1);
    // 月末日を取得
    let lastDay = new Date(dt.getFullYear(), (dt.getMonth() + 1), 0).getDate();
    // 月初めの曜日を取得
    let count = firstDay.getDay();

    // テーブルの宣言 
    calenderList = "<table border=1><tr>"

    // 曜日をリストに追加
    for (let i = 0; i < weekDay.length; i++) {
        calenderList += "<th>" + weekDay[i] + "</th>";
    }

    // 各月の日付をリストに追加
    calenderList += "<tr/>"

    // 日数分ループ
    for (let i = 0; i < lastDay; i++) {

        // 月初めが日曜日でなければ、月初めまで空欄を追加する 
        if ((i == 0) || count == 0) calenderList += "<tr>";
        if (i == 0) {
            for (let j = 0; j < count; j++) {
                calenderList += "<td></td>";
            }
        }

        // 日付を追加し曜日を1日進める
        calenderList += "<td>" + (i + 1) + "</td>";
        count++;

        // 土曜日を出力したら改行し、曜日を日曜に戻す
        if (count == 7) {
            calenderList += "</tr>"
            count = 0;
        }
    }

    // 月末が日曜日でなければ、土曜日まで空欄で埋める
    if (count != 0) {
        for (let i = count; i < 7; i++) {
            calenderList += "<td></td>";
        }
    }
    calenderList += "</table>"


    // 作られたカレンダーをHTMLに表示
    document.getElementById("calender").innerHTML = calenderList;

}

// 初期表示
setTitle();
setCalender();

// 前月ボタンクリックで前月のカレンダー表示
document.getElementById("lastMonth").onclick = () => {
    dt.setMonth(dt.getMonth() - 1);
    setTitle();
    setCalender();
}

// 今月ボタンクリックで今月のカレンダー表示
document.getElementById("thisMonth").onclick = () => {
    let nowDate = new Date();
    dt.setFullYear(nowDate.getFullYear());
    dt.setMonth(nowDate.getMonth());
    setTitle();
    setCalender();
}

// 来月ボタンクリックで来月のカレンダー表示
document.getElementById("nextMonth").onclick = () => {
    dt.setMonth(dt.getMonth() + 1);
    setTitle();
    setCalender();
}

