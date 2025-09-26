
// Create floating particles
function createParticles() {
	const particleContainer = document.getElementById('particles');
	const particleCount = 50;

	for (let i = 0; i < particleCount; i++) {
		const particle = document.createElement('div');
		particle.className = 'particle';

		// Random size and position
		const size = Math.random() * 4 + 1;
		particle.style.width = size + 'px';
		particle.style.height = size + 'px';
		particle.style.left = Math.random() * 100 + '%';
		particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
		particle.style.animationDelay = Math.random() * 20 + 's';

		particleContainer.appendChild(particle);
	}
}

// Intersection Observer for scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');

			// Trigger skill cards animation with stagger
			if (entry.target.id === 'skills') {
				const skillCards = entry.target.querySelectorAll('.skill-card');
				skillCards.forEach((card, index) => {
					setTimeout(() => {
						card.classList.add('visible');
					}, index * 100);
				});
			}

			// Trigger timeline items animation with stagger
			if (entry.target.classList.contains('section')) {
				const timelineItems = entry.target.querySelectorAll('.timeline-item');
				timelineItems.forEach((item, index) => {
					setTimeout(() => {
						item.classList.add('visible');
					}, index * 200);
				});
			}
		}
	});
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
	observer.observe(section);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Update scroll indicator
function updateScrollIndicator() {
	const sections = document.querySelectorAll('.section');
	const scrollDots = document.querySelectorAll('.scroll-dot');

	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		const sectionHeight = section.clientHeight;
		if (window.scrollY >= sectionTop - 200) {
			current = section.getAttribute('id');
		}
	});

	scrollDots.forEach(dot => {
		dot.classList.remove('active');
		if (dot.getAttribute('data-target') === '#' + current) {
			dot.classList.add('active');
		}
	});
}

// Scroll indicator click handlers
document.querySelectorAll('.scroll-dot').forEach(dot => {
	dot.addEventListener('click', function () {
		const target = document.querySelector(this.getAttribute('data-target'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Navbar background on scroll
function handleNavbar() {
	const navbar = document.querySelector('.navbar-custom');
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(0, 0, 0, 0.95)';
	} else {
		navbar.style.background = 'rgba(0, 0, 0, 0.9)';
	}
}

// Event listeners
window.addEventListener('scroll', () => {
	updateScrollIndicator();
	handleNavbar();
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
	createParticles();
	// Make first section visible immediately
	document.querySelector('#home').classList.add('visible');
	updateScrollIndicator();
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
	let i = 0;
	element.innerHTML = '';
	function type() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i);
			i++;
			setTimeout(type, speed);
		}
	}
	type();
}

// Initialize typing effect
window.addEventListener('load', () => {
	const heroTitle = document.querySelector('.hero-title');
	const originalText = heroTitle.textContent;
	typeWriter(heroTitle, originalText, 100);
});

// Add parallax effect to background
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const bgAnimation = document.querySelector('.bg-animation');
	bgAnimation.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add mouse follow effect
document.addEventListener('mousemove', (e) => {
	const cursor = document.createElement('div');
	cursor.style.position = 'fixed';
	cursor.style.left = e.clientX + 'px';
	cursor.style.top = e.clientY + 'px';
	cursor.style.width = '10px';
	cursor.style.height = '10px';
	cursor.style.background = 'rgba(255, 0, 110, 0.3)';
	cursor.style.borderRadius = '50%';
	cursor.style.pointerEvents = 'none';
	cursor.style.zIndex = '9999';
	cursor.style.animation = 'fadeOut 1s forwards';

	document.body.appendChild(cursor);

	setTimeout(() => {
		cursor.remove();
	}, 1000);
});

// Add fadeOut animation for cursor effect
const style = document.createElement('style');
style.textContent = `
            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
document.head.appendChild(style);