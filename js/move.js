function initialMoves(){
    // sidenav
    var elem = document.getElementById('sidenav');
    elem.style.left = -elem.offsetWidth + 'px';

    document.getElementById('sidenavunderlay').addEventListener("click", function(event) {
        changeRotation(document.getElementById('menuIconImage'));
    });

    // modal
    elem = document.getElementById('modal');
    elem.style.display = 'block';
    modalHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
    elem.style.display = 'none';
    elem.style.top = (getPageHeight() + 10) + 'px';
    elem.style.bottom = -(10 + modalHeight) + 'px';

    // filter
    elem = document.getElementById('filter');
    elem.style.display = 'block';
    filterHeight = elem.getBoundingClientRect().bottom - elem.getBoundingClientRect().top;
    elem.style.display = 'none';
    elem.style.top = -(filterHeight + 10) + 'px';
    elem.style.bottom = +(10 + 30 + getPageHeight()) + 'px';

    // add button
    elem = document.getElementById('addButton');
    elem.style.left = (document.getElementsByTagName('body')[0].getBoundingClientRect().right - 70) + 'px';
}

var intervalId = null;
var navVisible = false; // not visible

function moveNav(direction) {
    var elem    = document.getElementById('sidenav'),
        header  = document.getElementsByTagName('header')[0],
        underlay= document.getElementById('sidenavunderlay'),
        stop    = header.getBoundingClientRect().left, 
        step    = getPageWidth()/50,
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
              navVisible = true;
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
            navVisible = false;
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

function closeModal(){
    var modal       = document.getElementById('modal'),
        stop        = getPageHeight()-10,
        pos         = modal.getBoundingClientRect().top,
        pos2        = getPageHeight() - modal.getBoundingClientRect().bottom,
        step        = getPageHeight()/10,
        intervalId  = null;
    
    modal.style.top     = pos  + 'px';
    modal.style.bottom  = pos2 + 'px';

    intervalId = setInterval(move, 1);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    function move(){
        if (pos >= stop) {
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            modal.style.display = 'none';
            clearInterval(intervalId);
            intervalId = null;
            modalOpen = false;
        } else {
            if(pos + step >= stop){
                pos  = stop;
            }else{
                pos  += step;
                pos2 -= step;
            }
            modal.style.top    = pos  + 'px';
            modal.style.bottom = pos2  + 'px';
        }
    }
}

function openModal(){
    var modal       = document.getElementById('modal');
        modal.style.display = 'block';
    var stop        = 45,
        pos         = modal.getBoundingClientRect().top,
        pos2        = getPageHeight() - modal.getBoundingClientRect().bottom,
        step        = -getPageHeight()/10,
        intervalId  = null;

    modal.style.display = 'block';

    intervalId = setInterval(move, 1);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    function move(){
        if (pos <= stop) {
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            clearInterval(intervalId);
            intervalId = null;
            modal.style.bottom = '40px';
            modalOpen = true;
        } else {
            if(pos + step <= stop){
                pos  = stop;
            }else{
                pos  += step;
                pos2 -= step;
            }
            modal.style.top    = pos  + 'px';
            modal.style.bottom = pos2  + 'px';
        }
    }
}

function closeFilter(){
    var filter      = document.getElementById('filter'),
        stop        = -(filterHeight+10),
        pos         = filter.getBoundingClientRect().top,
        pos2        = getPageHeight() - filter.getBoundingClientRect().bottom,
        step        = -getPageHeight()/10,
        intervalId  = null;

    intervalId = setInterval(move, 1);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    function move(){
        if (pos <= stop) {
            filter.style.display = 'none';
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            clearInterval(intervalId);
            intervalId = null;
            filterOpen = false;
        } else {
            if(pos + step <= stop){
                pos  = stop;
            }else{
                pos  += step;
                pos2 -= step;
            }
            filter.style.top    = pos  + 'px';
            filter.style.bottom = pos2  + 'px';
        }
    }
}

function openFilter(){
    var filter      = document.getElementById('filter'),
        stop        = 90,
        pos         = parseInt(filter.style.top.slice(0, -2)),
        pos2        = parseInt(filter.style.bottom.slice(0, -2)),
        step        = getPageHeight()/10,
        intervalId  = null;
    
    filter.style.top     = pos  + 'px';
    filter.style.bottom  = pos2 + 'px';

    intervalId = setInterval(move, 1);
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    filter.style.display = 'block';

    function move(){
        if (pos >= stop) {
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
            clearInterval(intervalId);
            intervalId = null;
            filterOpen = true;
        } else {
            if(pos + step >= stop){
                pos  = stop;
            }else{
                pos  += step;
                pos2 -= step;
            }
            filter.style.top    = pos  + 'px';
            filter.style.bottom = pos2  + 'px';
        }
    }
}

window.addEventListener('resize', function(){
    if(navVisible){
        var elem    = document.getElementById('sidenav'),
            header  = document.getElementsByTagName('header')[0];

        elem.style.left = header.getBoundingClientRect().left+'px';
    }
    if(document.getElementById('addButton')){
        var btn = document.getElementById('addButton');
        btn.style.left = (document.getElementsByTagName('body')[0].getBoundingClientRect().right - 70) + 'px';
    }
});