function changeRotation(element){
    if(element.classList.contains('fa-rotate-90')){ // rotate back -> close nav
        element.classList.remove('fa-rotate-90');
        moveNav('in');
    }else{ // rotate -> open nav
        element.classList.add('fa-rotate-90');
        moveNav('out');
    }
}

function moveNav(direction) {
    var elem    = document.getElementById('sidenav'),
        header  = document.getElementsByTagName('header')[0],
        underlay= document.getElementById('underlay'),
        stop    = header.getBoundingClientRect().left, 
        step    = 5,
        pos     = elem.getBoundingClientRect().left,
        id      = null;

    if(direction === 'in'){
        pos  = stop;
        stop = -elem.offsetWidth;
        step = -step;
        id   = setInterval(frameOut, 1);
        underlay.style.display = 'none';
    }else{
        id   = setInterval(frameIn, 1);
        underlay.style.display = 'block';
    }

    function frameIn() {
        if (pos >= stop) {
              clearInterval(id);
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
            clearInterval(id);
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
}