
function isRequired(param) {
    let hasil = {}

    if (typeof param !== 'object') {
        let warn = 'Warning **Parameter isRequred must Object {} **'
        console.log(warn)
        return warn
    }
    Object.entries(param).forEach(
        ([key, val], i) => {
            i++
            val = (typeof val === 'string') ? val.trim() : val
            if (typeof val === 'undefined' || val == '') {
                hasil = { ...hasil, ...{ [key]: "Required" } }
            }
        }
    )
    hasil = (Object.keys(hasil).length === 0 && hasil.constructor === Object) ? '' : { data: hasil, message: 'Incomplete Data' };
    return hasil
}



function isDate(param) {

    let hasil = {}
    if (typeof param !== 'object') {
        let warn = 'Warning **Parameter isDate must Object {} **'
        console.log(warn)
        return warn
    }

    Object.entries(param).forEach(
        ([key, val], i) => {
            i++
            if ((isNaN(Date.parse(val)) || val.length != 10) && val !== '' && typeof val !== 'undefined') {
                hasil = { ...hasil, ...{ [key]: "Invalid Date" } }
            }
        }
    )
    hasil = (Object.keys(hasil).length === 0 && hasil.constructor === Object) ? '' : { data: hasil, message: 'Incomplete Data' };
    return hasil

}


module.exports = { isRequired, isDate }