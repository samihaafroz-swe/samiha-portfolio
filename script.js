// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close the menu after clicking a link (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Highlight the nav link of the section currently on screen
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

function setActive(id) {
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

function updateActiveLink() {
  let current = 'home';

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  // At the very bottom of the page, the last section (Contact) is too short
  // to reach the top of the screen, so highlight it manually.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
  if (atBottom) {
    current = sections[sections.length - 1].id;
  }

  setActive(current);
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Highlight the clicked link immediately
links.forEach(link => {
  link.addEventListener('click', () => {
    setActive(link.getAttribute('href').slice(1));
  });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: opens the visitor's email app with the message filled in
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const message = document.getElementById('cMessage').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in your name, email and message.';
    formStatus.classList.add('error');
    return;
  }

  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);

  formStatus.classList.remove('error');
  formStatus.textContent = 'Opening your email app to send the message...';
  window.location.href = 'mailto:samihaafroz120@gmail.com?subject=' + subject + '&body=' + body;
  contactForm.reset();
});
