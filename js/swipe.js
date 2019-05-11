document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                           

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
    
    document.getElementById('footer').innerHTML = "<p>Detected touch!</p>";
};

function handleTouchMove(evt) {
    if(!xDown || !yDown){
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    var direction;
    var func2call;

    if(Math.abs(xDiff) > Math.abs(yDiff)){/*most significant*/
        if(xDiff > 0){
            /* left swipe */ 
            direction = "left";
            
            // if navigation is open -> close it
            if(navOpen){
                func2call = changeSideNavIconRotation;
            }
        }else{
            /* right swipe */
            direction = "right";

            // if navigation is not open -> open it
            if(!navOpen){
                func2call = changeSideNavIconRotation;
            }
        }                       
    }else{
        if(yDiff > 0){
            /* up swipe */ 
            direction = "up";
            // if filter is open -> close it
            if(filterOpen){
                func2call = closeFilter;
            }
        }else{ 
            /* down swipe */
            direction = "down";
            
            // if modal is open -> close it
            if(modalOpen){
                func2call = closeModal;
            }/*else{
                if(!filterOpen){
                    func2call = openFilter;
                }
            }*/
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;   
    
    document.getElementById('footer').innerHTML = "<p>Detected move ("+direction+")</p>";

    if(func2call) func2call();
};  