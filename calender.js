let weekDay = ["日", "月", "火", "水", "木", "金", "土"];

const getMonth = () => {
    let calenderList = "";
    let dt = new Date();

    // 月初めを取得
    let firstDay = new Date(dt.getFullYear(), dt.getMonth(), 1);
    // 月末日を取得
    let lastDay = new Date(dt.getFullYear(), (dt.getMonth() + 1), 0).getDate();
    // 月初めの曜日を取得
    let wd = firstDay.getDay();

    let count = wd;

    calenderList = "<table border=1><tr>"
    for (let i = 0; i < weekDay.length; i++) {
        calenderList += "<th>" + weekDay[i] + "</th>";
    }

    calenderList += "<tr/>"

    for (let i = 0; i < lastDay; i++) {
        if ((i == 0) || count == 0) calenderList += "<tr>";
        if (i == 0) {
            for (let j = 0; j < count; j++) {
                calenderList += "<td></td>";
            }
        }
        calenderList += "<td>" + (i + 1) + "</td>";
        count++;
        if (count == 7) {
            calenderList += "</tr>"
            count = 0;
        }
    }
    for (let i = count; i < 7; i++) {
        calenderList += "<td></td>";
    }
    calenderList += "</table>"
    document.getElementById("calender").innerHTML = calenderList;

}

getMonth();