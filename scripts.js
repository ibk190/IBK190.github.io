// Global variable to store the sorted projects
let activeSection = null;
// Function to fetch and sort GitHub projects
async function fetchAndSortProjects() {
    const username = 'IBK';
    let allProjects = [];
    let page = 1;
    const perPage = 100; // Maximum number of items per page
 
}

// Function to display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear the container
    
    }
   

// Apply the stored color on page load
function applyStoredColor() {
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
        document.documentElement.className = storedColor;
    }
}

function logActiveSection() {
    activeSection = document.querySelector('section.active');
    if (activeSection) {
        activeSection.classList.add('logged-active');
    }
}

function restoreActiveSection() {
    const loggedActiveSection = document.querySelector('section.logged-active');
    if (loggedActiveSection) {
        loggedActiveSection.classList.add('active');
        loggedActiveSection.classList.remove('logged-active');
    }
}

document.addEventListener('visibilitychange',
    function () {
       
        if (document.visibilityState === "visible") {
            document.title = "Ibrahim Khalid| Computer System Engineer";
            //$("#favicon").attr("href", "C:/Users/IBRAH/Downloads/IBK/resources/logo.png");
        }
        else {
            document.title = "Come Back To Portfolio";
           // $("#favicon").attr("href", "C:/Users/IBRAH/Downloads/IBK/resources/logo.png");
        }
    });
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and sort projects when the page loads
    fetchAndSortProjects();

    applyStoredColor();

    // Navigation link click handling
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('active');
                    section.classList.remove('fadeIn');
                });

                // Show the target section with animation
                targetSection.classList.add('active');
                targetSection.classList.add('fadeIn');

                // Add or remove fullscreen class to header based on the target section
                const header = document.querySelector('header');
                if (targetId === 'home') {
                    header.classList.add('fullscreen');
                    header.classList.remove('top');
                    document.querySelector('.social-links').style.display = 'flex';
                    document.getElementById('home-description').style.display = 'block';
                } else {
                    document.getElementById('home-description').style.display = 'none';
                    document.querySelector('.social-links').style.display = 'none';
                    header.classList.remove('fullscreen');
                    header.classList.add('top');
                }

                // If the overview section is clicked, display the projects
                if (targetId === 'overview') {
                    displayProjects();
                }

                // Scroll to the top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show the home section by default
    document.getElementById('home').classList.add('active');

    // Intersection Observer for animations with delay
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }, 100);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Modal logic
    const modal = document.getElementById('color-switcher-modal');
    const settingsButton = document.getElementById('settings-button');
    const closeButton = document.querySelector('.close-button');

    settingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        logActiveSection();
        modal.style.display = 'block';
        document.querySelectorAll('body > *:not(#color-switcher-modal)').forEach(element => {
            element.classList.add('blur');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        restoreActiveSection();
        document.querySelectorAll('.blur').forEach(element => {
            element.classList.remove('blur');
        });
        modal.style.pointerEvents = 'auto';
    });

    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedColor = event.currentTarget.getAttribute('data-color');
            document.documentElement.className = selectedColor;
            localStorage.setItem('selectedColor', selectedColor);
            // Apply the selected color immediately
            document.documentElement.className = selectedColor;
        });
    });

    const birthDate = new Date('2002-10-24');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;
});
