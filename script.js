function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

var tl=gsap.timeline();
function loadingAnimation(){
    tl.from(".line h1",{
        y:150,
        stagger:0.26,
        duration:0.6,
        delay:0.4,
    })

    tl.from(".line-part1",{
        opacity:0,
        onStart:function(){
            var h5timer=document.querySelector(".line-part1 h5");
            var grow=0;
            setInterval(function(){
                if(grow<100){
                    h5timer.innerHTML=grow++;
                }else{
                    h5timer.innerHTML=grow;
                }
            },33);
        },
    });
    tl.to(".line h2",{
        animationName:"anime",
        opacity:1,
    })
    tl.to(".loader",{
        opacity:0,
        duration:0.7,
        delay:4,
    });

    tl.from(".page1",{
        y:1600,
        opacity:0,
        ease:Power4,
        delay:0.7,
        duration:0.45,
    });
    tl.from(".nav",{
        opacity:0,
    })

    tl.to(".loader",{
        display:"none",
    });

    tl.from("#page1-text1 h1,#page1-text2 h1,#page1-text3 h3,#page1-text4 h1",{
        y:140,
        stagger:0.2,
    })

    tl.from("#page1-text1, .page2",{
        opacity:0,
    },"-=1.2");

    tl.from(".number h2",{
        y:80,
        stagger:0.1,
    })
}
function mouseControl(){
    document.addEventListener("mousemove",function(dets){
        gsap.to(".cursor",{
            left:dets.x,
            top:dets.y,
        })})
    Shery.makeMagnet(".nav-part2 h4");
}

locomotive();
loadingAnimation();
//mouseControl();



