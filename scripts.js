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
      const menuHeight = window.innerHeight * 0.12; // Get 12% of the window height for the menu
      const offsetPosition = section.getBoundingClientRect().top - menuHeight;
      window.scrollBy({ top: offsetPosition, behavior: "smooth" });
    }
}

function updateActiveButton() {
    const sections = document.querySelectorAll('section');
    const menuButtons = document.querySelectorAll('.menu-button');
    const menuHeight = window.innerHeight * 0.12; // Get 12% of the window height for the menu

    sections.forEach((section, index) => {
        const button = menuButtons[index];
        const rect = section.getBoundingClientRect();

        // Calculate the offset by subtracting the menu height
        const offset = rect.top - menuHeight;

        // Check if the section is at least 50% visible on the screen
        if (offset <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
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



// Function to check if the element is in view
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }
  
  // Function to handle the image animation
  function handleImageAnimation(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }
  
  // Create an Intersection Observer to handle the image animation
  const observer = new IntersectionObserver(handleImageAnimation, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Adjust the threshold as needed based on your design
  });
  
  // Observe the image element with the scroll-animation class
  const imageElement = document.querySelector('.scroll-animation');
  observer.observe(imageElement);