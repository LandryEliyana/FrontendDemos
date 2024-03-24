// 获取容纳方格的容器
const container = document.querySelector('.container')
// 初始化
function Init() {
    createrow()
}
function createrow() {
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
Init()