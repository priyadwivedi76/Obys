function loadingAnimation(){
    var tl=gsap.timeline();
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

    tl.to(".loader",{
        display:"none",
    });
}
loadingAnimation();

document.addEventListener("mousemove",function(dets){
    gsap.to(".cursor",{
        left:dets.x,
        top:dets.y,
    })
})