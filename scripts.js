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