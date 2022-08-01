function cekPalindrom(param) {
    let paramLower = param.toLowerCase()
    return paramLower === paramLower.split('').reverse().join('')
}

console.log(cekPalindrom('Katak'))