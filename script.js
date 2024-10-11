document.addEventListener("DOMContentLoaded", () => {
    const synth = window.speechSynthesis;
    const sections = document.querySelectorAll('section');
    const exploreButton = document.getElementById('exploreButton');
    const navLinks = document.querySelectorAll('nav a');

    // Function to make text colorful
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Function to slide in text with color change
    function slideText(element, text) {
        const words = text.split(' ');
        element.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.color = getRandomColor();
            span.style.opacity = '0';
            span.style.transition = `opacity 0.5s ease ${index * 0.2}s`;
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
            }, 100);
        });
    }

    // Speech synthesis function
    function speakText(text) {
        if (synth.speaking) {
            synth.cancel();
        }
        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = synth.getVoices().find(voice => voice.name === 'Google UK English Male');
        synth.speak(utterThis);
    }

    // Explore Button click event to show About Us section
    exploreButton.addEventListener('click', () => {
        sections.forEach(section => section.classList.add('hidden'));
        document.getElementById('aboutUs').classList.remove('hidden');
        slideText(document.querySelector('#aboutUs p'), "This website is made by your lover Saurabh...");
    });

    // Navigation to different sections with smooth animations and speech synthesis
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));
            sections.forEach(section => section.classList.add('hidden'));
            targetSection.classList.remove('hidden');

            if (link.getAttribute('href') === '#herStory') {
                slideText(document.querySelector('#herStory p'), "Diya's journey is nothing short of extraordinary...");
                speakText("Diya's journey is nothing short of extraordinary. From the early days...");
            } else if (link.getAttribute('href') === '#lovestory') {
                slideText(document.querySelector('#lovestory p'), "The love story of Diya and Saurabh is one that defies time...");
                speakText("The love story of Diya and Saurabh is one that defies time and circumstance.");
            } else if (link.getAttribute('href') === '#goals') {
                slideText(document.querySelector('#goals p'), "🎯 Keep reaching for the stars, Diya! You are destined for greatness...");
            }
        });
    });

    // Timetable interactions with sliding effect and voice
    document.getElementById('timetable').addEventListener('click', () => {
        const timetableText = "6:00 AM - Wake up and greet the day with positivity. 7:00 AM - Start work at the computer...";

        slideText(document.querySelector('#timetable'), timetableText);
        speakText(timetableText);
    });

    // Function to add animations for each section as it becomes visible
    sections.forEach(section => {
        section.addEventListener('animationend', () => {
            section.classList.remove('animate');
        });
    });

    // Apply animation to each section when revealed
    function animateSection(section) {
        section.classList.add('animate');
    }

    // Sound effect on button hover (optional)
    const buttonHoverSound = new Audio('hover-sound.mp3');
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            buttonHoverSound.play();
        });
    });
});
