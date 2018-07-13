
 /*设计图的尺寸如果是750，按照设计图的字体大小，除以100，单位rem，就是需要设置的字体大小*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;

            if (!clientWidth) return;
            // if(clientWidth < 320){
            //     docEl.style.fontSize = '42.66666666666667px';
            // }else if(clientWidth >540){
            //     docEl.style.fontSize = '72px';
            // }else{
            //     docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            // }
            if(clientWidth < 320){
                docEl.style.fontSize = '30px';
            }else{
                docEl.style.fontSize = 75 * (clientWidth / 750) + 'px';
            }


        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

    