const calcBMI = (h, w) => {
    let result = 0;
    h /= 100;
    result = (w / (h * h));
    result = (Math.round(result * 100)) / 100;
    return result;
}

const checkBMI = (bmi) => {
    let status = [
        '低体重(痩せ型)'
        , '普通体重'
        , '肥満(1度)'
        , '肥満(2度)'
        , '肥満(3度)'
        , '肥満(4度)'
    ]

    if (bmi < 18.5) {
        return status[0];
    } else if (bmi < 25) {
        return status[1];
    } else if (bmi < 30) {
        return status[2];
    } else if (bmi < 35) {
        return status[3];
    } else if (bmi < 40) {
        return status[4];
    } else if (40 <= bmi) {
        return status[5];
    } else {
        return "エラー";
    }
}

const bestWeight = (h) => {
    h /= 100;
    let result = h * h * 22;
    result = (Math.round(result * 100)) / 100;
    return result;
}

document.getElementById("checkBMI").onclick = () => {
    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let resultMsg = "";

    let resultBMI = calcBMI(height, weight);
    let bmiStatus = checkBMI(resultBMI);
    let bWeight = bestWeight(height);
    let diff = Math.round((weight - bWeight) * 100) / 100;
    if (diff > 0) {
        diff = "+" + diff;
    }

    resultMsg = "<p>あなたのBMIは " + resultBMI + " で " + bmiStatus + " です。</p>";
    resultMsg += "<p>適正体重は " + bWeight + " で差分は " + diff + " です。</p>"
    document.getElementById("resultData").innerHTML = resultMsg;
}