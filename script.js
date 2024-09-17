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
loadingAnimation();
mouseControl();



