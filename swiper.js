function Swiper(uname, config) {
    this.swiper_containe = uname;//最外层包裹
    this.swiper_wrapper = '.swiper-wrapper';//内容包裹
    this.swiper_pagination = config.pagination.el;//分页器包裹
    this.nextEl = config.navigation.nextEl;//上按钮
    this.prevEl = config.navigation.prevEl;//下按钮
    this.clickable = config.pagination.clickable;//分页器控制
    this.autoplay = config.autoplay;//是否自动轮播
    this.elNum = 0;
    this.renderPoint();//分页器渲染
    this.size();//轮播图尺寸和克隆
    this.nextSwipterItemt();//下一张
    this.prenvetSwipterIten();//上一张
    this.autoplayFn();//自动轮播
    this.ponit();//分页器控制
    this.inerval = setInterval;
    this.nextSwipterItemt = config.nextSwipterItemtFn
    this.flag = 1;
}
Swiper.prototype.renderPoint = function () {
    var swiper_slide = document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_wrapper}`).children
    for (var i = 0; i < swiper_slide.length; i++) {
        var span = document.createElement("span")
        span.setAttribute('ii', i)
        document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_pagination}`).appendChild(span)
    }
    document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_pagination} span`).classList.add('spanThis')
}
Swiper.prototype.size = function () {
    var conSize = document.querySelector(`${this.swiper_containe}`).offsetWidth;
    var swiper_slide = document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_wrapper}`).children;
    document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_wrapper}`).style.width = conSize * (swiper_slide.length + 1) + "px";
    document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_wrapper}`).appendChild(swiper_slide[0].cloneNode(true));
    swiper_slide = document.querySelector(`${this.swiper_containe}`).querySelector(`${this.swiper_wrapper}`).children;
    for (var i = 0; i < swiper_slide.length; i++) {
        swiper_slide[i].style.width = conSize + "px";
    }
}
Swiper.prototype.nextSwipterItemt = function () {
    var nextEl = document.querySelector(`${this.nextEl}`);
    var thisSw = this;
    nextEl.onclick = function x() {
        nextSwipterItemtFn.call(thisSw)
    }
}
Swiper.prototype.prenvetSwipterIten = function () {
    var prevEl = document.querySelector(`${this.prevEl}`);
    var thisSw = this;
    prevEl.onclick = function x() {
        prenvetSwipterItenFn.call(thisSw)
    }
}

Swiper.prototype.autoplayFn = function () {
    if (this.autoplay) {
        var s = setInterval(() => {
            this.nextSwipterItemt()
        }, 3000)
    }
}
Swiper.prototype.ponit = function () {
    if (this.clickable) {
        var renderPoint = document.querySelectorAll(`${this.swiper_containe} ${this.swiper_pagination} span`);
        var swiper_containe_W = document.querySelector(`${this.swiper_containe}`).offsetWidth;
        var swiper_wrapperx = document.querySelector(`${this.swiper_containe} ${this.swiper_wrapper}`);
        var thisw = this;
        for (var i = 0; i < renderPoint.length; i++) {
            renderPoint[i].onclick = function (e) {
                var ex = +e.target.getAttribute('ii');
                ponitFn.call(thisw, ex, renderPoint)
            }
        }
        function ponitFn(ex) {
            for (var j = 0; j < renderPoint.length; j++) {
                renderPoint[j].classList.remove("spanThis")
            }
            renderPoint[ex].classList.add("spanThis")
            this.elNum = ex;
            swiper_wrapperx.style.marginLeft = -ex * swiper_containe_W + "px"
        }
    }
}
function nextSwipterItemtFn() {
    var swiper_containe_W = document.querySelector(`${this.swiper_containe}`).offsetWidth;
    var swiper_wrapperx = document.querySelector(`${this.swiper_containe} ${this.swiper_wrapper}`);
    var renderPoint = document.querySelectorAll(`${this.swiper_containe} ${this.swiper_pagination} span`);
    if (this.flag) {
        this.elNum++
        this.flag = 0;
        var xs = this;
        setTimeout(function () {
            xs.flag = 1
        }, 500)
        swiper_wrapperx.style.marginLeft = -this.elNum * swiper_containe_W + "px"
        if (this.elNum >= renderPoint.length) {
            this.elNum = 0;
            this.elNum = 0;
            setTimeout(function () {
                swiper_wrapperx.style.transition = 'none';
                swiper_wrapperx.style.marginLeft = 0 + "px"
            }, 400)
            setTimeout(function () {
                swiper_wrapperx.style.transition = 'all .4s';
            }, 420)
        }
        for (var i = 0; i < renderPoint.length; i++) {
            renderPoint[i].classList.remove("spanThis")
        }
        renderPoint[this.elNum].classList.add("spanThis")
    }
}
function prenvetSwipterItenFn() {
    var swiper_containe_W = document.querySelector(`${this.swiper_containe}`).offsetWidth;
    var swiper_wrapperx = document.querySelector(`${this.swiper_containe} ${this.swiper_wrapper}`);
    var renderPoint = document.querySelectorAll(`${this.swiper_containe} ${this.swiper_pagination} span`);
    if (this.flag) {
        this.elNum--;
        if (this.elNum == -1) {
            this.elNum = renderPoint.length - 1
            var x = this.elNum;
            swiper_wrapperx.style.transition = 'none';
            swiper_wrapperx.style.marginLeft = -(this.elNum + 1) * swiper_containe_W + "px";
            setTimeout(function () {
                swiper_wrapperx.style.transition = 'all .4s';
                swiper_wrapperx.style.marginLeft = -x * swiper_containe_W + "px"
            }, 16)

        } else {
            swiper_wrapperx.style.marginLeft = -this.elNum * swiper_containe_W + "px"
        }
        for (var i = 0; i < renderPoint.length; i++) {
            renderPoint[i].classList.remove("spanThis")
        }
        renderPoint[this.elNum].classList.add("spanThis")
    }
}

