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

//gooey effect
function sheryAnimation(){
    Shery.imageEffect(".img-div",{
        style:5,
        gooey:true,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7272749932567818},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.15,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.04,"range":[0,10]},"metaball":{"value":0.55,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.37,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
    });
}

function cursorAnimation(){
    //mouse cursor all over the screen
    Shery.mouseFollower({
        skew:true,
        ease:"cubic-bezier(0.23,1,0.328,1)",
        duration:1,
    });
    Shery.makeMagnet(".nav-part2 h4");

    //mouse animation in page2
    var videoContainer=document.querySelector(".video-container");
    var video=document.querySelector(".video-container video");
    //mouse-enter
    videoContainer.addEventListener("mouseenter",function(){
        videoContainer.addEventListener("mousemove",function(dets){
            gsap.to(".mousefollower",{
                opacity:0,
            })
            gsap.to(".video-cursor",{
                left:dets.x-570,
                y:dets.y-300,
            })
        })
    })
    //mouse-leave
    videoContainer.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
           opacity:1,
        })
        gsap.to(".video-cursor",{
            left:"70%",
            top:"-15%",
        })
    })

    //pause-play the video
    var flag=0;
    videoContainer.addEventListener("click",function(){
    if(flag==0){
        //when flag is 0 play video after the click
        video.play();
        video.style.opacity = 1;
        document.querySelector(".video-cursor").innerHTML=`<i class="ri-pause-large-line"></i>`
        gsap.to(".video-cursor",{
            scale:0.5,
        })
        flag=1;
    }else{
        //when flag is 1 pause video after the click
        video.pause();
        video.style.opacity = 0;
        document.querySelector(".video-cursor").innerHTML=`<i class="ri-play-mini-fill"></i>`
        gsap.to(".video-cursor",{
            scale:1,
        })
        flag=0;
        }
    });      
}

document.addEventListener("mousemove",function(dets){
    gsap.to(".flag",{
        x:dets.x,
        y:dets.y,
    })
})

document.querySelector("#page1-text3").addEventListener("mouseenter",function(){
    gsap.to(".flag",{
        opacity:1,
    })
})
document.querySelector("#page1-text3").addEventListener("mouseleave",function(){
    gsap.to(".flag",{
        opacity:0,
    })
})
cursorAnimation();
locomotive();
loadingAnimation();
sheryAnimation();



