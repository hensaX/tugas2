function CekMaxmin(param) {
    if (!Array.isArray(param)) return 'Parameter Must be Array'
    if (param.length === 0) return 'Parameter Array Cannot be Empty'
    let maxVal = param[0]
    let minVal = param[0]

    for (let i = 1; i < param.length; i++) {
        let loopVal = param[i];
        maxVal = loopVal > maxVal ? loopVal : maxVal
        minVal = loopVal < minVal ? loopVal : minVal
    }

    return `Max Value = ${maxVal}\nMin Value = ${minVal}`
}




const arrayList = [1, 5, 8, 0, 9, 7, 4, 3, 2]

console.log(CekMaxmin(arrayList))