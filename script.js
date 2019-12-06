let firstOperand = ''
let secondOperand = ''
let operator = ''
let result = ''
let checkSize = true
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const display = document.querySelector('.display')
const main = document.querySelector('.main')
const deleteButton = document.querySelector('#deleteButton')
const changePrefix = document.querySelector('#changePrefix')
const percentButton = document.querySelector('#percentButton')
const equalButton = document.querySelector('#equalButton')
const numArray = Array.from(numbers)
const oprArray = Array.from(operators)

window.addEventListener('load', () => {
    if (String(display.innerHTML).length < 10) {
        numArray.map(elem => elem.addEventListener('click', () => {
            oprArray.map(element => {
                if (element.innerHTML !== '=') {
                    element.style.background = '#ff9206'
                    element.style.color = 'white'
                }
            })
            let str = String(display.innerHTML)
            let check = true

            if (checkSize !== true) display.style.fontSize = 68 + 'px'
            checkSize = true
    
            for (let i = 0; i < str.length; i++) {
                if (str[i] === '.') {
                    check = !check
                }
            }
    
            if (result !== '') {
                display.innerHTML = '0'
                result = ''
            }
    
            if (elem.innerHTML === '.' && display.innerHTML === '0') {
                display.innerHTML += elem.innerHTML
                firstOperand = display.innerHTML
    
            } else if (elem.innerHTML === '.' && check === true || elem.innerHTML !== '.') {
                if (operator === '') {
                    if (display.innerHTML === '0') display.innerHTML = ''
                    display.innerHTML += elem.innerHTML
                    firstOperand = display.innerHTML
                } else {
                    secondOperand += elem.innerHTML
                    display.innerHTML = secondOperand
                }       
            } 
    
            if (String(display.innerHTML).length > 6 && String(display.innerHTML).length < 10) {
                display.style.fontSize = parseInt(getComputedStyle(display).fontSize) - 7 + 'px'
            }
        }))
    }

    oprArray.map(elem => elem.addEventListener('click', () => {
        checkSize = false
        oprArray.map(element => {
            if (element.innerHTML !== '=') {
                element.style.background = '#ff9206'
                element.style.color = 'white'
            }
        })

        if (elem.innerHTML !== '=') {
            elem.style.background = 'white'
            elem.style.color = '#ff9206'
            operator = elem.innerHTML
        }

        secondOperand = ''
    }))
})

deleteButton.addEventListener('click', () => {
    oprArray.map(element => {
        if (element.innerHTML !== '=') {
            element.style.background = '#ff9206'
            element.style.color = 'white'
        }
    })
    display.style.fontSize = 68 + 'px'
    checkSize = true
    display.innerHTML = '0'
    firstOperand = ''
    secondOperand = ''
    operator = ''
})

changePrefix.addEventListener('click', () => {
    if (+display.innerHTML < 0) {
        display.innerHTML = firstOperand = Math.abs(+firstOperand)
    } else if (+display.innerHTML > 0) {
        display.innerHTML = firstOperand = - +firstOperand
    }
})

percentButton.addEventListener('click', () => {
    firstOperand = display.innerHTML /= 100
})

equalButton.addEventListener('click', () => {
    display.style.fontSize = 68 + 'px'
    checkSize = true

    if (firstOperand === '' && operator === '') {
        result = 0
    } else if (operator === '') {
        result = firstOperand
    } else if (secondOperand === '') {
        secondOperand = firstOperand
    } 

    if (operator === '+') {
        result = +firstOperand + +secondOperand
    } else if (operator === '-') {
        result = +firstOperand - +secondOperand
    } else if (operator === '×') {
        result = +firstOperand * +secondOperand
    } else if (operator === '/') {
        result = +firstOperand / +secondOperand
    }

    operator = ''
    firstOperand = display.innerHTML = result

    if(String(result).length > 9) display.innerHTML = result.toString(16)

    let x = String(display.innerHTML).length - 6

    if (String(display.innerHTML).length > 6) {
        display.style.fontSize = parseInt(getComputedStyle(display).fontSize) - 7*x + 'px'
    } else if (display.innerHTML === 'NaN') {
        display.style.fontSize = 60 + 'px'
        display.innerHTML = 'Ошибка'
    }
})

