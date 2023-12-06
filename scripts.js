// defining banner button var
let prevButton = null;

// get the menu wrapper element
const wrapper = document.getElementById("menuButtons");

// add click event listener to the menu wrapper
wrapper.addEventListener('click', (e) => {
    // check if the clicked element is a button
    const isButton = e.target.nodeName === 'BUTTON'; 

    if (!isButton) {
        return;
    }
  
    // add .active to CSS class of the clicked button
    e.target.classList.add('active');

    // if it exists, remove .active CSS class from the previous button
    if (prevButton !== null && prevButton !== e.target) {
        prevButton.classList.remove('active');
    }

    // set the current button as the previous button
    prevButton = e.target;
});

// function to scroll to a section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const menuHeight = window.innerHeight * 0.12; // 12% of the window height for the menu (banner height)
      const offsetPosition = section.getBoundingClientRect().top - menuHeight;
      window.scrollBy({ top: offsetPosition, behavior: "smooth" });
    }
}
// used to directly link to sections of the page
if (window.location.hash) {
    const sectionId = window.location.hash.substring(1);

    scrollToSection(sectionId);
}

// function to update the active button
function updateActiveButton() {
    const sections = document.querySelectorAll('section');
    const menuButtons = document.querySelectorAll('.menu-button');
    const menuHeight = window.innerHeight * 0.12; // 12% of the window height for the menu (banner height)

    sections.forEach((section, index) => {
        const button = menuButtons[index];
        const rect = section.getBoundingClientRect();

        // calculate the offset by subtracting the menu height
        const offset = rect.top - menuHeight;

        // check if the section is at least 50% visible on the screen
        if (offset <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            menuButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        }
    });
}

// add am event listener to the window to update the active button when scrolling
window.addEventListener('scroll', updateActiveButton);

// initial call to set the active button when the page loads
updateActiveButton();

// function to add or remove the border class when the page is scrolled
function handleScroll() {
    const buttonContainer = document.getElementById('menuButtons');
    const scrollPosition = window.scrollY;

    // add or remove the border class based on the scroll position
    if (scrollPosition > 0) {
        buttonContainer.classList.add('button-container-scrolled');
    } else {
        buttonContainer.classList.remove('button-container-scrolled');
    }
}

// function to handle click on a GIF element
function handleClickOnGif(event) {
    const gifElement = event.target;
    
    // hide the clicked GIF when clicked
    gifElement.style.visibility = 'hidden';
    
    // shows the GIF again after 2 seconds
    setTimeout(() => {
        gifElement.style.visibility = 'visible';
    }, 1300);
}

// adds event listeners to all GIF elements with the class 'gif-image'
const gifElements = document.querySelectorAll('.gif-image');
gifElements.forEach(gif => {
    gif.addEventListener('click', handleClickOnGif);
});

// function to check if the element is in view
function isInView(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// function to handle the image animation
function handleImageAnimation(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}

// copies my email when clicking button
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Email address copied to clipboard: ' + text);
}


// create an Intersection Observer to handle the image animation
const observer = new IntersectionObserver(handleImageAnimation, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
});

// the image element with the scroll-animation class
const imageElement = document.querySelector('.scroll-animation');
observer.observe(imageElement);
