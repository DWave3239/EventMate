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
        step    = 5,
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
}