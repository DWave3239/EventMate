function changeRotation(element){
    if(element.classList.contains('fa-rotate-90')){ // rotate back -> close nav
        element.classList.remove('fa-rotate-90');
        moveNav('in');
    }else{ // rotate -> open nav
        element.classList.add('fa-rotate-90');
        moveNav('out');
    }
}

var intervalId = null;

function moveNav(direction) {
    var elem    = document.getElementById('sidenav'),
        header  = document.getElementsByTagName('header')[0],
        underlay= document.getElementById('underlay'),
        stop    = header.getBoundingClientRect().left, 
        step    = 5 + getPageWidth()/1920 * 15,
        pos     = elem.getBoundingClientRect().left;

    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }

    if(direction === 'in'){
        stop        = -elem.offsetWidth;
        step        = -step;
        intervalId  = setInterval(frameOut, 1);
        underlay.style.display = 'none';
    }else{
        intervalId  = setInterval(frameIn, 1);
        underlay.style.display = 'block';
    }

    function frameIn() {
        if (pos >= stop) {
              clearInterval(intervalId);
              intervalId = null;
        } else {
            if(pos + step >= stop){
                pos = stop;
            }else{
                pos += step;
            }
            elem.style.left = pos + 'px';
        }
    }

    function frameOut(){
        if (pos <= stop) {
            clearInterval(intervalId);
            intervalId = null;
        } else {
            if(pos + step <= stop){
                pos = stop;
            }else{
                pos += step;
            }
            elem.style.left = pos + 'px';
        }
    }
}

function initPageLayout(){
    var elem = document.getElementById('sidenav');
    elem.style.left = -elem.offsetWidth + 'px';

    checkPageSize();
}

function getPageWidth(){
    if (typeof window.innerWidth != 'undefined')
        return window.innerWidth;
    if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        return document.documentElement.clientWidth;
    return document.getElementsByTagName('body')[0].clientWidth;
}

function getPageHeight(){
    if (typeof window.innerWidth != 'undefined')
        return window.innerHeight;
    if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        return document.documentElement.clientHeight;
    return document.getElementsByTagName('body')[0].clientHeight;
}

function checkPageSize(){
    var viewportwidth;
    var viewportheight;
    
    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    
    if (typeof window.innerWidth != 'undefined'){
        viewportwidth = window.innerWidth;
        viewportheight = window.innerHeight;
    }else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){ // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
        viewportwidth = document.documentElement.clientWidth;
        viewportheight = document.documentElement.clientHeight;
    }else{ // older versions of IE
        viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }

    console.log(viewportwidth + ", " + viewportheight);
}