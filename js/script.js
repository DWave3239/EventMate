function changeSideNavIconRotation(){
    var element = document.getElementById('menuIconImage');
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

var modalHeight, filterHeight, modalOpen = false, filterOpen = false;

function initPageLayout(){
    initialMoves();

    registerEvents();

    //Locations
    getLocation();

    //Filtertests
    testFilter();

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
        let clone = el.cloneNode(true);
        clone.addEventListener("click", function(event){
            event.preventDefault();
            loadModal(clone.dataset.eventid);
            openModal(clone);
            return false;
        }, true);
        el.parentNode.replaceChild(clone, el);
    }
}

function registerPages(){
    var linkElements = document.getElementsByClassName('pagelink');

    for(let el of linkElements){
        let clone = el.cloneNode(true);
        clone.addEventListener("click", function(event){
            event.preventDefault();
            loadPage(clone.dataset.pageid);
            return false;
        }, true);
        el.parentNode.replaceChild(clone, el);
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

function loadModal(id){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText);
            if(json.type === 'modal'){
                document.getElementById('modalcontentpane').innerHTML = json.contents;
                registerEvents();
            }
        }
    };
    xhttp.open("GET", "jsons/"+id+".json", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
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
                    closeModal();
                }
                if(navVisible){
                    changeSideNavIconRotation();
                }
                registerEvents();
            }
        }
    };
    xhttp.open("GET", "jsons/"+id+".json", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send();
}

function changeFilterIcon(elem){
    var icon = document.getElementById('filterIcon');
    if(elem.checked){
        icon.src = 'images/filterOn.png';
    }else{
        icon.src = 'images/filterOff.png';
    }
}

function toggleFilter(){
    if(filterOpen){
        closeFilter();
    }else{
        openFilter();
    }
}

function keyDown (e) {
    if(e.key === "Escape") {
        if(modalOpen){
            closeModal(document.getElementsByClassName('close')[0]);
        }
    }
}

$(function(){
    $('*[data-href]').click(function(){
        window.open($(this).data('href'));
        return false;
    });
});