let prevButton = null;

const wrapper = document.getElementById("menuButtons");

wrapper.addEventListener('click', (e) => {

    const isButton = e.target.nodeName === 'BUTTON'; 
  
    if (!isButton) {
        return;
    }
  
    e.target.classList.add('active'); // Add .active CSS Class

    if(prevButton !== null && prevButton !== e.target) {
    prevButton.classList.remove('active');  // Remove .active CSS Class
    }

    prevButton = e.target;

});


function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

// Function to update the active button based on the section in view
function updateActiveButton() {
    const sections = document.querySelectorAll('section');
    const menuButtons = document.querySelectorAll('.menu-button');

    sections.forEach((section, index) => {
        const button = menuButtons[index];
        const rect = section.getBoundingClientRect();

        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }
    });
}

// Add event listener to the window to update the active button when scrolling
window.addEventListener('scroll', updateActiveButton);

// Initial call to set the active button when the page loads
updateActiveButton();


// Function to add or remove the border class when the page is scrolled
function handleScroll() {
    const buttonContainer = document.getElementById('menuButtons');
    const scrollPosition = window.scrollY;

    // Add or remove the border class based on the scroll position
    if (scrollPosition > 0) {
        buttonContainer.classList.add('button-container-scrolled');
    } else {
        buttonContainer.classList.remove('button-container-scrolled');
    }
}

function handleClickOnGif(event) {
    const gifElement = event.target;
    
    // Hide the clicked GIF when clicked
    gifElement.style.visibility = 'hidden';
    
    // Show the GIF again after 2 seconds
    setTimeout(() => {
        gifElement.style.visibility = 'visible';
    }, 1300);
}

// Add event listeners to all GIF elements with the class 'gif-image'
const gifElements = document.querySelectorAll('.gif-image');
gifElements.forEach(gif => {
    gif.addEventListener('click', handleClickOnGif);
});