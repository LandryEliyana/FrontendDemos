一. 游戏流程

    一定的速度下移，点击黑块，黑块消失，新的黑块出现在普通游戏玩家眼中，应该是游戏开始，黑块不断向下移动，若黑块触底则游戏结束.

    而以开发者来说，**应将每一个黑块和白块抽象成一个个的数据结构，黑块的消失和出现其实就是数据结构的创造和销毁.**

二. 游戏功能

1. 初始化: 游戏开始创造四行白块,并隐藏最上面的那行
2. 黑块下移: 通过设置定时器,调用函数,使得黑块匀速下移
3. 黑块触底则游戏结束
4. 黑块未触底,则判断是否踩到黑块. 没踩到黑块则游戏结束, 踩到黑块则删除黑块所在行, 分数+1.
5. 踩到黑块并且下落一个黑块的高度后,创造一个新的行插入到第一行.

三. 游戏设计

1. ui层: 包括游戏开始的按钮，容纳方块的容器，分数显示区域。

HTML代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>别踩白块</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <!--分数显示区域-->
    <div class="score-ui">
        <h2 class="score">score</h2>
        <h2 class="score">0</h2>
    </div>
    <!--方块下落区域-->
    <div class="main">
        <!--先静态布局，测试样式，之后会将此处的逻辑放入js文件中-->
        <div class="row">
            <div class="cell"></div>
            <div class="cell black"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
        <div class="row">
            <div class="cell"></div>
            <div class="cell black"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
        <div class="row">
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell black"></div>
            <div class="cell"></div>
        </div>
        <div class="row">
            <div class="cell black"></div>
            <div class="cell"></div>
            <div class="cell"></div>
            <div class="cell"></div>
        </div>
    </div>
    <!--开始按钮-->
    <button class="start-btn">开始游戏</button>
</body>
</html>
```

CSS代码如下：

```
.score-ui {
    width: 100px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
.score {
    text-align: center;
}
.main {
    width: 408px;
    height: 408px;
    background: white;
    border: 2px solid gray;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

/* 行 */
.row {
    height: 100px;
    width: 100%;
}
/* 一个块 */
.cell {
    height: 100px;
    width: 100px;
    float: left;
    border: rgb(54, 74, 129) 1px solid;
}
  
.black {
    background: black;
}

.start-btn {
    margin: 20px auto;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    background: yellowgreen;
    line-height: 50px;
    text-align: center;
    color: #fff;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}
```

2. 动态层：包括游戏初始化，方块的下落，点击方块，游戏开始与结束等逻辑存放于index.js文件中。
   ```

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
           // 获取最后一排
           let lastrow = document.querySelectorAll('.row')[document.querySelectorAll('.row').length - 1]
           let top = parseInt(container.style.top)
           container.style.top = `${top + 1}px`
           if(top == 0) {
   	    //如果到达底部时最后一排中还有黑方块，则失败
               if(lastrow.querySelector('.black')) {
                   alert('你失败了')
                   timers.forEach(timer => {
   		    // 逐个清除所有定时器
                       clearInterval(timer)
                       return
                   })
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
           } else {
               timers.forEach(timer => {
                   clearInterval(timer)
                   return
               })
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
       // 随机生成一行中黑方格的位置
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
   ```
