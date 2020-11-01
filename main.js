// 엄격모드
'use strict';

// navbar의 엘리멘트 요소를 받아옴
const navbar = document.querySelector('#navbar');
// 브라우저에서 실제로 보여지는 navbar의 높이를 받아옴
const navbarHeight = navbar.getBoundingClientRect().height;


// Make navbar transport when it is on the top
document.addEventListener('scroll', () => {
    // scrollY 작동 확인
    // console.log(window.scrollY);
    // navbarHeight 작동 확인
    // console.log(`navbarHight: ${navbarHeight}`);


    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});





// Handle scrolling when tapping onn the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', () => {
    // 동작확인
    // console.log('hello');
    // console.log(event.target.dataset.link);

    const target = event.target;
    const link = target.dataset.link;

    // 링크가 있는 경우에만 수행
    if(link == null){
        return;
    }

    navbarMenu.classList.remove('open');
    scrollIntoView(link);

});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})




// Handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});




// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    // 동작확인
    // console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
});



// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
});


// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    // scrollIntoView('#home');
    window.scrollTo(0,0);
})


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    // Remove selection from the previous item and select the new one
    const active =document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    e.target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            //동작확인
            // console.log(project.dataset.type);
    
            if( filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);


    // 위의 forEach 와 동일
    // 1.
    // for(let project of projects) {

    // }

    // 2.
    // let project;
    // for(let i=0 ; i < projects.length ; i++){
    //     project = projects[i];
    // }

    console.log(filter);
})



// util Function
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth'});
}
