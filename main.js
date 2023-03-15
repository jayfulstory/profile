'use strict';

// projectを動的に追加;
loadProjects()
  .then(projects => {
    displayProjects(projects);
  })
  .catch(console.log);

function loadProjects() {
  return fetch('/data/projects.json')
    .then(res => res.json())
    .then(json => json.projectsData);
}

function displayProjects(projects) {
  workProjects.innerHTML = projects
    .map(project => createHTML(project))
    .join('');
}

function createHTML(project) {
  return `
    <a
      href="${project.href}"
      class="${project.className}"
      data-type="${project.dataType}"
      target="${project.target}"
      ><img
        src="${project.imgSrc}"
        alt="${project.alt}"
        class="project__img"
      />
      <div class="project__description">
        <h3>${project.title}</h3>
        <span
          >${project.description}
        </span>
      </div>
    </a>
  `;
}
// projectsの切り替え
const workBtn = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');

workBtn.addEventListener('click', e => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  // remove active
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  // 👇はcssの pointer-events: none;　と同じ機能
  // const target =
  //   e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  // target.classList.add('selected');
  e.target.classList.add('selected');
  workProjects.classList.add('anime');

  // 切り替えた後にアニメーション
  const projects = document.querySelectorAll('.project');
  setTimeout(() => {
    projects.forEach(project => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('showItems');
      } else {
        project.classList.add('showItems');
      }
    });
    workProjects.classList.remove('anime');
  }, 300);
});

// トップにいる時はnavbarが透明
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// navbar__menuボタンで移動

const navbarMenu = document.querySelector('.navbar__menu ');

navbarMenu.addEventListener('click', event => {
  const target = event.target;
  const link = target.dataset.link;
  if (link === null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
});

// Contack Meボタンで移動
const homeContact = document.querySelector('.home__contact');
homeContact.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// navber　toggle
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// scrollIntoView
function scrollIntoView(selecter) {
  const scrollTo = document.querySelector(selecter);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}
//星を動かす
const star = document.querySelector('.star');
// ホームの透明化　/　左右移動
const home = document.querySelector('.home__container');
const paraImg = document.querySelector('.para__img');
const paraTop = document.querySelector('.para-top');
const paraLeft = document.querySelector('.para-left');
const paraRight = document.querySelector('.para-right');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  paraTop.style.opacity = 1.2 - window.scrollY / homeHeight;
  paraRight.style.opacity = 1.2 - window.scrollY / homeHeight;
  paraRight.style.transform = `translateX(${window.scrollY / 5}px)`;
  paraLeft.style.opacity = 1.2 - window.scrollY / homeHeight;
  paraLeft.style.transform = `translateX(-${window.scrollY / 5}px)`;
  // star.style.top = `${window.scrollY}px`;
  star.style.transform = `translateY(${window.scrollY}px)`;
  home.style.opacity = 1.4 - window.scrollY / homeHeight;
});

const upBtn = document.querySelector('.up-button');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 3) {
    upBtn.classList.add('up');
  } else {
    upBtn.classList.remove('up');
  }
});

upBtn.addEventListener('click', () => {
  scrollIntoView('#home');
  // window.scrollTo({ top: 0, behavior: 'smooth' });
});

//emailコピー
const copyEmail = document.querySelector('.contact__email');
const copyComplete = document.querySelector('.copyComplete');
copyEmail.addEventListener('click', () => {
  window.navigator.clipboard.writeText('jayfulkr@gmail.com').then(() => {
    copyComplete.classList.add('show');
    setTimeout(() => {
      copyComplete.classList.remove('show');
    }, 1500);
  });
});
