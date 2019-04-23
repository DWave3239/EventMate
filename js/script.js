function changeRotation(element){
    if(element.classList.contains('rotate-90')){ // rotate back -> close nav
        element.classList.remove('rotate-90');
        element.classList.add('rotate-0');
        moveNav('in');
    }else{ // rotate -> open nav
        element.classList.add('rotate-90');
        element.classList.remove('rotate-0');
        moveNav('out');
    }
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

var modalHeight;

function initPageLayout(){
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

    registerEvents();

    getLocation();
}

function registerEvents(){
    // modal-links
    registerModals();

    // page-links
    registerPages();
}

function registerModals(){
    var linkElements = document.getElementsByClassName('modallink');
    
    for(let el of linkElements){
        /*var func = function(event){
            event.preventDefault();
            //document.getElementById('map').innerHTML = 'modal link ' + el.dataset.eventid; 
            loadModal(el.dataset.eventid);
            openModal(el);
            return false;
        };
        el.removeEventListener("click", func);*/
        el.addEventListener("click", function(event){
            event.preventDefault();
            //document.getElementById('map').innerHTML = 'modal link ' + el.dataset.eventid; 
            loadModal(el.dataset.eventid);
            openModal(el);
            return false;
        }, true);
    }
}

function registerPages(){
    var linkElements = document.getElementsByClassName('pagelink');

    for(let el of linkElements){
        /*var func = function(event){
            event.preventDefault();
            //document.getElementById('map').innerHTML = 'page link '+el.dataset.pageid;
            loadPage(el.dataset.pageid);
            return false;
        };
        el.removeEventListener("click", func);*/
        el.addEventListener("click", function(event){
            event.preventDefault();
            //document.getElementById('map').innerHTML = 'page link '+el.dataset.pageid;
            loadPage(el.dataset.pageid);
            return false;
        }, true);
    }
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
            newIconFilename = 'menu_dark.png';
            iconFilename = 'menu_bright.png';
            break;
        case 'bg_dark.css':
            newFilename = 'bg_bright.css';
            newIconFilename = 'menu_bright.png';
            iconFilename = 'menu_dark.png';
            break;
        default:
            newFilename = filename;
            newIconFilename = 'menu_bright.png';
            iconFilename = 'menu_dark.png';
            break;
    }

    elem.href = elem.href.replace(filename, newFilename);
    menuIconImage.src = menuIconImage.src.replace(iconFilename, newIconFilename);
}

window.addEventListener('resize', function(){
    if(navVisible){
        var elem    = document.getElementById('sidenav'),
            header  = document.getElementsByTagName('header')[0];

        elem.style.left = header.getBoundingClientRect().left+'px';
    }
});

var modalOpen = false;
function closeModal(elem){
    var modal       = elem.parentElement.parentElement,
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

function loadModal(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.type === 'modal'){
                document.getElementById('modalcontentpane').innerHTML = json.contents;
            }
        }
    };
    xhttp.open("GET", "jsons/"+id+".json", true);
    xhttp.send();
}

function loadPage(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.type === 'page'){
                document.getElementById('centerHeaderDiv').innerHTML = json.contents.header;
                document.getElementById('maincontent').innerHTML = json.contents.page;

                if(modalOpen){
                    closeModal(document.getElementsByClassName('close')[0]);
                }
                if(navVisible){
                    changeRotation(document.getElementById('menuIconImage'));
                }
                registerModals();
            }
        }
    };
    xhttp.open("GET", "jsons/"+id+".json", true);
    xhttp.send();
}

$(function(){
    $('*[data-href]').click(function(){
        window.open($(this).data('href'));
        return false;
    });
});