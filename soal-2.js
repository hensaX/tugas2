function print() {
    const start = 0
    const end = 100

    for (let i = start; i <= end; i++) {
        if (i !== 0) {
            if (i % 25 === 0) console.log('MC')
            if (i % 40 === 0) console.log('Pay')
            if (i % 60 === 0) console.log('Ment')
            if (i % 99 === 0) console.log('MCPAYMENT')
        }
    }

}

print()