// ─── CURSOR ───
const ring=document.getElementById('cRing'),dot=document.getElementById('cDot');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  dot.style.opacity='1'; ring.style.opacity='1';
});
(function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();

// ─── THEME ───
const html=document.documentElement;
const themeBtn=document.getElementById('themeBtn');
const themeIcon=document.getElementById('themeIcon');
let dark=localStorage.getItem('theme')!=='light';
function applyTheme(){
  html.setAttribute('data-theme',dark?'dark':'light');
  themeIcon.className=dark?'fas fa-moon':'fas fa-sun';
  localStorage.setItem('theme',dark?'dark':'light');
}
applyTheme();
themeBtn.addEventListener('click',()=>{ dark=!dark; applyTheme(); });

// ---- HAMBURGER ----
const ham=document.getElementById('hamburger');
const navLinks=document.querySelector('.nav-links');
ham.addEventListener('click',()=>{
  if(navLinks.classList.contains('open')){
    navLinks.classList.remove('open');
    ham.classList.remove('active');
  } else {
    navLinks.classList.add('open');
    ham.classList.add('active');
  }
});

// ---- CLOSE NAV ON LINK CLICK (MOBILE) ----
const navItems=document.querySelectorAll('.nav-links a');
navItems.forEach(item=>{
  item.addEventListener('click',()=>{
    navLinks.classList.remove('open');
    ham.classList.remove('active');
  });
});

// ---- CLOSE NAV ON RESIZE TO DESKTOP ----
window.addEventListener('resize',()=>{
  if(window.innerWidth > 960){ 
    navLinks.classList.remove('open');
    ham.classList.remove('active');
  }
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const el=document.querySelector(a.getAttribute('href'));
    if(el) el.scrollIntoView({behavior:'smooth'});
  });
});

// ─── REVEAL ON SCROLL ───
const reveals=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
},{threshold:0.12});
reveals.forEach(r=>obs.observe(r));

// ─── CONTACT FORM ───
const contactForm=document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    
    const name=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const subject=document.getElementById('subject').value;
    const message=document.getElementById('message').value;
    
    // Create Gmail URL with pre-filled data
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=zeldrickjoaquin@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
  });
}