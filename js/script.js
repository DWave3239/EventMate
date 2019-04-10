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
        if(pos < -elem.offsetWidth)
            pos = -elem.offsetWidth;
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

function changeTheme(){
    var elems = document.getElementsByTagName('link'),
        menuIconImage = document.getElementById('menuIconImage'),
        found = false,
        elem = null,
        link = null,
        filename = null,
        iconFilename = null,
        newFilename = null,
        newIconFilename = null;

    for(i=0; i<elems.length && !found; i++){
        if(elems[i].dataset.id){
            elem = elems[i];
            found = true;
        }
    }

    link = elem.href;

    filename = link.substr(link.lastIndexOf('/')+1);
    
    switch(filename){
        case 'bg_bright.css':
            newFilename = 'bg_dark.css';
            newIconFilename = 'menu_bright.png';
            iconFilename = 'menu_dark.png';
            break;
        case 'bg_dark.css':
            newFilename = 'bg_bright.css';
            newIconFilename = 'menu_dark.png';
            iconFilename = 'menu_bright.png';
            break;
        default:
            newFilename = filename;
            newIconFilename = 'menu_dark.png';
            iconFilename = 'menu_bright.png';
            break;
    }

    elem.href = elem.href.replace(filename, newFilename);
    menuIconImage.src = menuIconImage.src.replace(iconFilename, newIconFilename);
}