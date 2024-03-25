// 获取主界面
const main = document.querySelector('.main')
// 获取容纳方格的容器
let container = document.querySelector('.container')
// 获取开始按钮
const start_btn = document.querySelector('button')
// 初始化一个定时器
let timer = null
let timers = []
// 初始化行的集合， 存放每行方块
let rows = []
// 初始化单元格集合
let cells = []
// 初始化分数
let score = 0
// 获取分数显示区域
const score_area = document.querySelector('.score-num')
// 下落速度
let speed = 10
// 初始化
function Init() {
    score_area.innerHTML = 0
    container.style.top = '-408px'
    createrows()
    updaterows()   
}
function createrows() {
    for(let i = 0 ; i < 4 ; i ++) {
        let row = document.createElement('div')
        row.classList.add('row')
        container.appendChild(row)
        for(let j = 0 ; j < 4 ; j ++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            row.appendChild(cell)
        }
    }
}
// 更新行的集合
function updaterows() {
    rows = []
    cells = document.querySelectorAll('.cell')
    let cell = []
    for(let i = 0 ; i < cells.length ; i++) {
        cell.push(cells[i])
        if((i + 1) % 4 == 0) {
            rows.push(cell)
            cell = []
        }
    }
}
Init()
// 监听开始按钮的点击事件
start_btn.addEventListener('click', () => {
    // 游戏开始
    startGame()
})
// 游戏开始函数
function startGame() {
    // 初始化黑方块
    for(let i = 0 ; i < 4 ; i ++) {
        let random = Math.floor(Math.random() * 4)
        rows[i][random].classList.add('black')
    }
    //方块下落
    timer = setInterval(() => {
        timers.push(timer)
        let lastrow = document.querySelectorAll('.row')[document.querySelectorAll('.row').length - 1]
        let top = parseInt(container.style.top)
        container.style.top = `${top + 1}px`
        if(top == 0) {
            if(lastrow.querySelector('.black')) {
                container.innerHTML = ''
                score = 0
                score_area.innerHTML = 0
                cells = []
                rows = []
                alert('你失败了')
                timers.forEach(timer => {
                    clearInterval(timer)
                    return
                })
                timers = []
            }
            container.style.top = '-102px'
            createSinglerow()
            render()
        }
    }, score < 200 ? (speed - score / 20) : 1)
}
// 点击方块事件
document.addEventListener('click', (e) => {
    if(e.target.className.includes('cell')) {
        if(e.target.className.includes('black')) {
            score ++
            score_area.innerHTML = score
            e.target.classList.remove('black')
            let row = e.target.parentNode
            clearInterval(timers[rows.findIndex(item => item == row)])
        } else {
            container.innerHTML = ''
            score = 0
            score_area.innerHTML = 0
            cells = []
            rows = []
            timers.forEach(timer => {
                clearInterval(timer)
                //return
            })
            timers = []
            alert('你失败了')
        }
    }
})
// 创建一行方块
function createSinglerow() {
    let newrow = []
    for(let i = 0 ; i < 4 ; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        newrow.push(cell)
    }
    let random = Math.floor(Math.random() * 4)
    newrow[random].classList.add('black')
    rows.unshift(newrow)
}
// 渲染
function render() {
    container.innerHTML = ''
    for(let i = 0 ; i < 5 ; i ++) {
        let row = document.createElement('div')
        row.classList.add('row')
        container.appendChild(row)
        for(let j = 0 ; j < rows[i].length ; j ++) {
            row.appendChild(rows[i][j])
        }
    }
}