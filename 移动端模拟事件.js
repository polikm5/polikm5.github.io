

// 模拟移动端双击事件
let clickTime = 1;
let startTime;
let timer = null;
document.addEventListener('touchstart', function(ev) {
    // 如果是第一次点击
    if(clickTime == 1) {
        startTime = new Date().getTime();
        clickTime++;
        timer = setTimeout(() => {
            clickTime = 1;
            // 处理单击事件 do something


        }, 300)
    } else {
        let endTime = new Date().getTime();
        if(endTime - startTime <= 300) {
            clickTime = 1;
            clearTimeout(timer);
            // 处理双击事件
        }
    }
})

document.addEventListener('touchend', function(ev) {

})

// 模拟移动长按事件
let pressS;
let pressE;
document.addEventListener('touchstart', function(ev) {
    pressS = new Date().getTime();
    // do something
})

document.addEventListener('touchend', function(ev) {
    pressE = new Date().getTime();

    // 此处不能设置太小， 否则单击事件也会触发该事件
    if(pressE - pressS >= 500) {
        // 触发长按事件
    }
})


// 模拟移动双指缩放事件 根据touchEvent 的 touches   
// 一 个 TouchList 对象，包含了所有当前接触触摸平面的触点的 Touch 对象，无论它们的起始于哪个 element 上，也无论它们状态是否发生了变化。多指操作，获取多个触点会用到。
// 计算开始时双指的距离 与 结束时双指的距离 即可知道是缩放还是放大

let distance = 0;
let pos = 0;  // 0表示 正常     -1 代表 缩放    1 代表放大
function getDistance(start,end) {
    return Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
}
document.addEventListener('touchstart', function(ev) {
    let { touches } = ev;
    if(touches.length > 1) {
        distance = getDistance({x: touches[0].screenX, y: touches[0].screenY}, {x: touches[1].screenX, y: touches[1].screenY})
    }
    // do something
})

document.addEventListener('touchmove', function(ev) {
    let { touches } = ev;
    if(touches.length > 1) {
        let endDistance = getDistance({x: touches[0].screenX, y: touches[0].screenY}, {x: touches[1].screenX, y: touches[1].screenY});
        if(endDistance < distance) {
            // 如果结束距离 比 开始距离 小 说明 是放大
            // do something  缩放
            pos = -1;
            
        } else {
            pos = 1;
        }
    } else {
        pos = 0;
    }
})

// 注意在touchend touches length是为0的
document.addEventListener('touchend', function(ev) {
    if(pos == -1) {
        console.log('缩放')
    } else if(pos == 1) {
        console.log('放大')
    }
})