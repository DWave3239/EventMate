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
        stop    = header.getBoundingClientRect().left, 
        step    = 10, 
        pos     = 0,
        id      = setInterval(frame, 0.01);
    
    if(direction === 'in'){
        pos = stop;
        stop = -elem.offsetWidth;
        step = -step;
    }

    function frame() {
        if(direction === 'in'){
            if (pos <= stop) {
                clearInterval(id);
            }else{
                if(pos+step <= stop){
                    elem.style.left = stop + 'px';
                }else{
                    pos += step;
                    elem.style.left = pos + 'px';
                }
            }
        }else{ // direction === 'out'
            if (pos >= stop) {
                clearInterval(id);
            }else{
                if(pos+step >= stop){
                    elem.style.left = stop + 'px';
                }else{
                    pos += step;
                    elem.style.left = pos + 'px';
                }
            }
        }
    }
}