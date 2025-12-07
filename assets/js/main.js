/*=============== SHOW SIDEBAR ===============*/
const navMenu = document.getElementById('sidebar'),
        navToggle = document.getElementById('nav-toggle'),
        navClose = document.getElementById('nav-close')
/*===== SIDEBAR SHOW =====*/
/* Validate If Constant Exists */
if(navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar')
    })
}

/*===== SIDEBAR HIDDEN =====*/
/* Validate If Constant Exists */
if(navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar')
    })
}

/*=============== SKILLS TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContent = document.querySelectorAll('[data-content]')

      tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target)

            tabContent.forEach(tabContents => {
                tabContents.classList.remove('skills__active')
            })

            target.classList.add('skills__active')

            tabs.forEach(tab => {
                tab.classList.remove('skills__active')
            })

            tab.classList.add('skills__active')
        })
      })

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/*===== Link Active Work =====*/
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l=> l.addEventListener("click", activeWork))

/*===== Work Popup =====*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("work__button")) {
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup() {
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click", togglePortfolioPopup)

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp__thumbnail img").src = portfolioItem.querySelector(".work__img").src;
    document.querySelector(".portfolio__popup-subtitle span").innerHTML = portfolioItem.querySelector(".work__title").innerHTML;
    document.querySelector(".portfolio__popup-body").innerHTML = portfolioItem.querySelector(".portfolio__item-details").innerHTML;
}
/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
      modelBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn, i) => {
    modelBtn.addEventListener("click", () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener("click", () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*=============== SWIPER TESTIMONIAL ===============*/
let swiper = new Swiper(".testimonials__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 48,
        },
    },
});

/*=============== INPUT ANIMATION ===============*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc() {
    let parent = this.parentNode;
    if(this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach((input) => {
    input.addEventListener("focus", focusFunc);
    input.addEventListener("blur", blurFunc);
})
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// get all sections that have an id defined
const sections = document.querySelectorAll("section");

// add an event listener listening for scroll

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    // get current scroll position
    let scrollY = window.pageYOffset;
    // loop through sections to get height, top & ID values for each
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");
        /*- If out current scroll position enters the space where current section is, add .active class to
        corresponding navigation links, else remove it
        - To knowwhich link needs an active class, we use sectionId variable we are getting while loop through
        sections as an selector */
        const navLink = document.querySelector('.nav__link[href*="' + sectionId + '"]');
        if (navLink) {  // ADD THIS CHECK
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add("active-link");
            } else {
                navLink.classList.remove("active-link");
            }
        }
    });
}

/*=============== CONTACT FORM WITH EMAIL ===============*/
const contactForm = document.querySelector('.contact__form');
const sendBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('username')?.trim();
    const email = formData.get('email')?.trim();
    const phone = formData.get('phone')?.trim();
    const message = formData.get('message')?.trim();
    
    // Validation
    if (!name || !email || !phone || !message) {
        showAlert('Please fill all fields!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address!', 'error');
        return;
    }
    
    // Show loading
    sendBtn.innerHTML = '<i class="uil uil-spinner-alt rotate"></i> Sending...';
    sendBtn.disabled = true;
    
    try {
        // EmailJS Configuration (Replace with your credentials)
        const templateParams = {
            from_name: name,
            from_email: email,
            phone: phone,
            message: message,
            to_email: 'tejuteja.ap123@gmail.com' // YOUR EMAIL
        };
        
        // Send email via EmailJS (Free service)
        const response = await emailjs.send(
            'YOUR_SERVICE_ID',    // Replace: EmailJS Service ID
            'YOUR_TEMPLATE_ID',   // Replace: EmailJS Template ID
            templateParams,
            'YOUR_PUBLIC_KEY'     // Replace: EmailJS Public Key
        );
        
        showAlert('Message sent successfully! I\'ll reply within 24 hours.', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Email error:', error);
        showAlert('Failed to send message. Please try again or email me directly!', 'error');
    } finally {
        // Reset button
        sendBtn.innerHTML = '<i class="uil uil-navigator button__icon"></i> Send Message';
        sendBtn.disabled = false;
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Alert function
function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = `custom-alert alert-${type}`;
    alert.innerHTML = `
        <i class="uil ${type === 'success' ? 'uil-check-circle' : 'uil-exclamation-triangle'}"></i>
        ${message}
        <button class="alert-close">&times;</button>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove after 5s
    setTimeout(() => alert.remove(), 5000);
    
    // Close on click
    alert.querySelector('.alert-close').addEventListener('click', () => alert.remove());
}


/*=============== THEME TOGGLE ===============*/
// const themeToggle = document.getElementById('theme-toggle');
// const body = document.body;

// // Check for saved theme preference
// const currentTheme = localStorage.getItem('theme') || 'dark';
// if (currentTheme === 'light') {
//     body.classList.add('light-theme');
// }

// // Toggle theme
// themeToggle.addEventListener('click', () => {
//     body.classList.toggle('light-theme');
    
//     const isLight = body.classList.contains('light-theme');
//     localStorage.setItem('theme', isLight ? 'light' : 'dark');
// });
