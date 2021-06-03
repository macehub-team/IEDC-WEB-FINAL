gsap.registerPlugin(ScrollTrigger);
let lastScrollTop = 0;


window.addEventListener("scroll", function(){ 
   let st = window.pageYOffset || document.documentElement.scrollTop;
   if (st > lastScrollTop){
      gsap.to("#navbar",{
          y: "-10vh",
          duration: 0.2
      });
   } else {
      gsap.to("#navbar",{
        y: "0vh",
        duration: 0.2
    });
   }
   lastScrollTop = st <= 0 ? 0 : st;
}, false);


let navbar = document.getElementById('navbar');
let navlink = document.getElementById('navlinks');

const toggleNav = ()=>{

    if (navbar.className === 'nav-closed') {
        
        navbar.className = 'nav-opened';
        navlink.className = 'navlink-opened';
        
    } else {

        navbar.className = 'nav-closed';
        navlink.className = 'navlink-closed';

    }
};

const skyAnimation = gsap.timeline();

skyAnimation.from(".d",{
    rotate: 360,
    duration: 0.6,
    scale: 0,
    ease: "circ",
    stagger: 0.2,
    repeat: -1,
    yoyo: true
},0)
.from(".b,.c",{
    y: "70vh",
    opacity:0,
    duration: 1,
    ease: "sine"
},"<")
.from(".a",{
    x: "50vw",
    y: "-50vh",
    opacity:0,
    duration: 1,
    ease: "sine"
});

const parallax = gsap.timeline({
    scrollTrigger:{
        trigger: ".hero",
        start: "top top",
        scrub: 0.5,
        pinSpacing: false,
    }
});

gsap.utils.toArray(".parallax").forEach(layer => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth)
    parallax.to(layer, {y: movement, ease: "none"}, 0)
});


let eNum = document.getElementById("eNumber");
let eId = Number(eNum.textContent);
let eP = document.getElementsByClassName("eP");
let eN = document.getElementsByClassName("eventText");
let pBar = document.getElementById("progress");
let EGal = document.getElementsByClassName("eventGallery");

if (window.matchMedia("(max-width: 769px)").matches) {
    for (let i = 0; i < EGal.length; i++) {
        EGal[i].style.display = 'none';
    }    
    document.querySelector(".hero").addEventListener('mousemove',(e)=>{
        let xAxis = (window.innerWidth / 2 - e.pageX)/75;
        let yAxis = (window.innerHeight / 2 - e.pageY)/75;
        gsap.to(".heroText",{
            rotateY: xAxis,
            rotateX: yAxis,
            duration: 0.5
        });
        gsap.to("#animText",{
            rotateY: -xAxis,
            rotateX: -yAxis,
            textShadow: (xAxis*4) +"px "+ (yAxis*6) +"px 0px rgba(255, 255, 255, 0.1)",
            duration: 0.4,
        });
    });
};
pBar.style.width = 40*eId/3 + 'vw';

const showImg = ()=>{

    let eGal = document.getElementById("eG"+eId);
    if (eGal.style.display === 'none') {

        eP[eId-1].style.display = 'none';
        eGal.style.display = 'flex';
    }
    else{

        eGal.style.display = 'none';
        eP[eId-1].style.display = 'block';
    }
};

const nextEvent = ()=> {
    if (eId === 3) {
        return;
    }
    let eGal = document.getElementById("eG"+eId);
    eGal.style.display = 'none';
    eId++;
    for (let i = 0; i < eP.length; i++) {
        eP[i].style.display = 'none';
        eN[i].style.display = 'none';
    }
    eP[eId-1].style.display = 'block';
    eN[eId-1].style.display = 'block';
    eGal = document.getElementById("eG"+eId);
    if (window.matchMedia("(min-width: 769px)").matches) {
        eGal.style.display = 'flex';    
    };
    pBar.style.width = 40*eId/3 + 'vw';
    eNum.textContent = "0" + eId;
    gsap.from(".event img",{
        y: "15%",
        opacity: 0,
        duration: 1,
        ease: "power4",
    })
    gsap.from(".event p",{
        x: "15%",
        opacity: 0,
        duration: 1,
        ease: "power4",
    },"<+0.2");
    
};

const preEvent = ()=> {
    if (eId === 1) {
        return;
    }
    let eGal = document.getElementById("eG"+eId);
    eGal.style.display = 'none';
    eId--;
    for (let i = 0; i < eP.length; i++) {
        eP[i].style.display = 'none';
        eN[i].style.display = 'none';
    }
    eP[eId-1].style.display = 'block';
    eN[eId-1].style.display = 'block';
    eGal = document.getElementById("eG"+eId);
    if (window.matchMedia("(min-width: 769px)").matches) {
        eGal.style.display = 'flex';    
    };
    pBar.style.width = 40*eId/3 + 'vw';
    eNum.textContent = "0" + eId;
    gsap.from(".event img",{
        y: "15%",
        opacity: 0,
        duration: 1,
        ease: "power4",
    })
    gsap.from(".event p",{
        x: "-15%",
        opacity: 0,
        duration: 1,
        ease: "power4",
    },"<+0.2");
    
};

let mId = document.getElementById("mNum");
let m1 = document.getElementsByClassName("m1");
let m2 = document.getElementsByClassName("m2");

const nextMember = ()=>{
    if (Number(mId.textContent) === 2) {
        return;
    }
    m1[0].style.display = 'none';
    m1[1].style.display = 'none';
    m2[0].style.display = 'flex';
    m2[1].style.display = 'flex';
    mId.textContent = '02';
    gsap.from(".memberList",{
        duration: 1,
        opacity: 0,
        x: -100,
        ease: "power4",
        stagger: 0.1
    });
};

const preMember = ()=>{
    if (Number(mId.textContent) === 1) {
        return;
    }
    m2[0].style.display = 'none';
    m2[1].style.display = 'none';
    m1[0].style.display = 'flex';
    m1[1].style.display = 'flex';
    mId.textContent = '01';
    gsap.from(".memberList",{
        duration: 1,
        opacity: 0,
        x: 100,
        ease: "power4",
        stagger: 0.1
    });
};

const scrl = (tgt)=>{
    gsap.to(window,{
        scrollTo: tgt,
        duration : 0.5
    });
    navbar.className = 'nav-closed';
    navlink.className = 'navlink-closed';
};

const eventAnim = gsap.timeline({
    scrollTrigger:{
        trigger: ".events",
        start: "-55% top",
        toggleActions: "play pause resume pause"
    }
});

eventAnim
.from(".event img",{
    y: "40%",
    opacity: 0,
    duration: 1,
    ease: "power4",
})
.from(".event p",{
    x: "20%",
    opacity: 0,
    duration: 1,
    ease: "power4",
},"<+0.2");

const memberAnim = gsap.timeline({
    scrollTrigger:{
        trigger: ".members",
        start: "-50% top",
        toggleActions: "play pause resume pause",
    }
});

memberAnim.from(".memberList",{
    duration: 1,
    opacity: 0,
    x: -100,
    ease: "power4",
    stagger: 0.1
});

const fabAnim = gsap.timeline({
    scrollTrigger:{
        trigger: ".fablab",
        start: "-55% top",
        toggleActions: "play pause resume pause",
    }
});
fabAnim
.from(".gElemt",{
    duration: 1,
    
    
    skewY: "10deg",
    ease: "circ",
})
.from(".gElemb",{
    duration: 1,
    
    
    skewY: "10deg",
    ease: "circ",
},"<");


