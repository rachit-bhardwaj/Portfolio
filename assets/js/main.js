/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
   navToggle = document.getElementById('nav-toggle'),
   navClose = document.getElementById('nav-close')

/* Show menu */
if (navToggle) {
   navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu')
   })
}

/* Hide menu */
if (navClose) {
   navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu')
   })
}

/*=============== REMOVE MOBILE MENU ===============*/
const navLink = document.querySelectorAll('.nav__link, .nav__contact')

const linkAction = () => {
   const navMenu = document.getElementById('nav-menu')
   // When we click on each nav__link, we remove the show-menu class
   navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME TEXT CIRCULAR ===============*/
const homeText = document.getElementById('home-text'),
   letters = homeText.textContent.trim().split(''), // Convert text into an array of character
   angleStep = 360 / letters.length // Angle for each character; length counts the number of characters

homeText.textContent = '' // Clears the original content

// Iterates through each character
letters.forEach((char, i) => {
   const span = document.createElement('span') // Creates a <span> for each letter
   span.textContent = char // Inserts each character into the span
   span.style.transform = `rotate(${i * angleStep}deg)` // Rotates each letter based on its index to form the circle
   homeText.appendChild(span) // Appends the span to the main container
})

/*=============== HOME TYPED JS ===============*/
const typedHome = new Typed('#home-typed', {
   strings: ['Web Developer', 'AI/ML Enthusiast', 'Java Programmer'],
   typeSpeed: 60,
   backSpeed: 30,
   backDelay: 2000,
   loop: true,
});

/*=============== CHANGE HEADER STYLES ===============*/
const scrollHeader = () => {
   const header = document.getElementById('header')
   this.scrollY >= 50 ? header.classList.add('scroll-header')
      : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER WORK ===============*/
const swiperWork = new Swiper('.work__swiper', {
   loop: true,
   // centeredSlides: true,
   // watchSlidesProgress: true,
   spaceBetween: 24,
   slidesPerView: 'auto',
   grabCursor: true,
   speed: 600,

   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
   autoplay: {
      delay: 3000,
      disableOnInteraction: false,
   }
});


/*=============== SERVICES ACCORDION ===============*/
const servicesCards = document.querySelectorAll('.services__card'),
   servicesButtons = document.querySelectorAll('.services__button')

// It iterates over each button found
servicesButtons.forEach(button => {
   button.addEventListener('click', () => {
      const currentCard = button.closest('.services__card') // Get the class of the clicked button (.services__card) and ⬇
      isOpen = currentCard.classList.contains('services-open') // Check already has the services-open class (Returns true or false)

      // Close all other services data
      servicesCards.forEach(card => {
         card.classList.replace('services-open', 'services-close')
      })

      // If the clicked card was closed, it opens it
      if (!isOpen) {
         currentCard.classList.replace('services-close', 'services-open')
      }
   })
})

/*=============== Education TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
   tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
   tab.addEventListener('click', () => {
      const targetSelector = tab.dataset.target,
         targetContent = document.querySelector(targetSelector);

      // Disable all content and active tabs
      tabContents.forEach((content) =>
         content.classList.remove('education-active')
      )
      tabs.forEach((t) =>
         t.classList.remove('education-active')
      )

      // Activate the clicked tab and corresponding content
      tab.classList.add('education-active');
      targetContent.classList.add('education-active');
   });
});


/*=============== CONTACT EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
   contactMessage = document.getElementById('contact-message')

/* Live validation */
const inputs = document.querySelectorAll('.contact__input')

inputs.forEach(input => {
   input.addEventListener('input', () => {

      if (!input.checkValidity()) {
         input.classList.remove('success')
         input.classList.add('error')
      } else {
         input.classList.remove('error')
         input.classList.add('success')
      }

   })
})

const sendEmail = async (e) => {
   e.preventDefault()

   let hasError = false

   inputs.forEach(input => {

      input.classList.remove('error', 'success')

      if (!input.checkValidity()) {
         input.classList.add('error')
         hasError = true
      } else {
         input.classList.add('success')
      }

   })

   if (hasError) {
      return
   }

   const submitBtn = contactForm.querySelector('.contact__button')
   const btnText = submitBtn.querySelector('span')

   submitBtn.disabled = true
   btnText.textContent = 'Sending...'

   try {

      await emailjs.sendForm(
         'service_u9mnjax',
         'template_gty37v2',
         contactForm,
         'dAKkpOM4ioffRKsZj'
      )

      contactMessage.textContent = 'Message sent successfully ✅'

      setTimeout(() => {
         contactMessage.textContent = 'I will get back to you shortly.'
      }, 2000)

      contactForm.reset()

      inputs.forEach(input => {
         input.classList.remove('error', 'success')
      })

   } catch (error) {
      console.error(error);
      contactMessage.textContent = 'Message not sent (service error) ❌'

   } finally {

      submitBtn.disabled = false
      btnText.textContent = 'Send Message'

      setTimeout(() => {
         contactMessage.textContent = ''
      }, 6000)
   }
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
   const scrollUp = document.getElementById('scroll-up')
   this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
      : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

// Link the ID of each section (section id="home") to each link (a href="#home") 
// and activate the link with the class .active-link
const scrollActive = () => {
   // We get the position by scrolling down
   const scrollY = window.scrollY

   sections.forEach(section => {
      const id = section.id, // id of each section
         top = section.offsetTop - 50, // Distance from the top edge
         height = section.offsetHeight, // Element height
         link = document.querySelector('.nav__menu a[href*=' + id + ']') // id nav link

      if (!link) return

      link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
   })
}
window.addEventListener('scroll', scrollActive)

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 // Store mouse position

const cursorMove = () => {
   cursor.style.left = `${mouseX}px` // Horizontal position (X-axis)
   cursor.style.top = `${mouseY}px` // Vertical position (Y-axis)
   cursor.style.transform = 'translate(-50%, -50%)' // Centers the element at the pointer

   // Repeats the function with each movement
   requestAnimationFrame(cursorMove)
}

// Detects mouse movement and updates positions
document.addEventListener('mousemove', (e) => {
   mouseX = e.clientX // Save position X
   mouseY = e.clientY // Save position Y
})

cursorMove()

/* Hide custom cursor on links */
const a = document.querySelectorAll('a')

a.forEach(item => {
   // Mouse enters the link and hides the cursor
   item.addEventListener('mouseover', () => {
      cursor.classList.add('hide-cursor')
   })
   // Mouse exits the link and shows the cursor
   item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hide-cursor')
   })
})

/*=============== SCROLLREVEAL ANIMATION ===============*/
const sr = ScrollReveal({
   origin: 'bottom',
   distance: '60px',
   duration: 1200,
   delay: 300,
   easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
   // reset: true, // Animations repeat
})

sr.reveal(`.home__subtitle`)
sr.reveal(`.home__title`, { delay: 600 })
sr.reveal(`.home__description`, { delay: 900 })
sr.reveal(`.home__box-1`, { delay: 1200, rotate: { z: -20 } })
sr.reveal(`.home__box-2`, { delay: 1300, rotate: { z: -30 } })
sr.reveal(`.home__box-3`, { delay: 1400, rotate: { z: -40 } })
sr.reveal(`.home__img`, { delay: 1700, distance: '60px' })
sr.reveal(`.home__circle`, { delay: 2000, distance: '-100px' })

sr.reveal(`.about__title`)
sr.reveal(`.about__description`, { delay: 600 })
sr.reveal(`.about__button`, { delay: 900 })

sr.reveal(`.work__swiper`)

sr.reveal(`.services__card:nth-child(odd)`, { interval: 200, origin: 'left', distance: '100px' })
sr.reveal(`.services__card:nth-child(even)`, { interval: 200, origin: 'right', distance: '100px' })

sr.reveal(`.skills__description`)
sr.reveal(`.skills__card`, { delay: 600, interval: 200 })
sr.reveal(`.skills__profession`, { delay: 900 })
sr.reveal(`.skills__list`, { delay: 1200, interval: 200 })

sr.reveal(`.education__tabs`)
sr.reveal(`.education__line`, { delay: 300, scale: 0 })
sr.reveal(`.education__content.education-active .education__card`, { delay: 500, interval: 200, origin: 'bottom', distance: '60px' })

sr.reveal(`.contact__form`)
sr.reveal(`.contact__link`, { delay: 600, interval: 200 })

sr.reveal(`.footer__container`)

/*=============== THEME PICKER ===============*/
const themeButton = document.getElementById('theme-button')
const themePopup = document.getElementById('theme-popup')
const hueSlider = document.getElementById('hue-slider')

const savedHue = localStorage.getItem('selected-hue')

if (savedHue) {
   document.documentElement.style.setProperty('--hue', savedHue)
   hueSlider.value = savedHue
}

/* Open / Close popup */
themeButton.addEventListener('click', (e) => {
   e.stopPropagation()
   themePopup.classList.toggle('show-popup')
})

/* Change theme */
hueSlider.addEventListener('input', () => {
   const hue = hueSlider.value

   document.documentElement.style.setProperty('--hue', hue)

   localStorage.setItem('selected-hue', hue)
})

/* Close when clicking outside */
document.addEventListener('click', (e) => {

   if (
      !themePopup.contains(e.target) &&
      !themeButton.contains(e.target)
   ) {
      themePopup.classList.remove('show-popup')
   }

})