document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle__btn');
    const body = document.body;
    const icon = toggleBtn.querySelector('i');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        icon.classList.remove('uil-moon');
        icon.classList.add('uil-sun');
    }
    
    toggleBtn.addEventListener('click', function() {
        body.classList.toggle('dark');
        
        if (body.classList.contains('dark')) {
            icon.classList.remove('uil-moon');
            icon.classList.add('uil-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('uil-sun');
            icon.classList.add('uil-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Fixed button scroll to top functionality
    const fixedBtn = document.querySelector('.fixedbtn');
    
    // Show/hide fixed button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            fixedBtn.style.opacity = '1';
            fixedBtn.style.visibility = 'visible';
        } else {
            fixedBtn.style.opacity = '0';
            fixedBtn.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top when clicked
    fixedBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


