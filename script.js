'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
});



/**
 * Smooth scrolling for anchor links
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') !== '#') {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navbar.classList.contains('active')) {
          elemToggleFunc(navbar);
          elemToggleFunc(overlay);
        }
      }
    }
  });
});



/**
 * Contact button functionality
 */

const contactButtons = document.querySelectorAll('.btn, .header-top-btn, .cta-btn, .header-bottom-actions-btn[aria-label="Contact"]');
contactButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    if (!this.getAttribute('href') || !this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navbar.classList.contains('active')) {
          elemToggleFunc(navbar);
          elemToggleFunc(overlay);
        }
      }
    }
  });
});



/**
 * Initialize page
 */

document.addEventListener('DOMContentLoaded', function() {
  // Add active class to current nav link
  const currentPath = window.location.hash;
  if (currentPath) {
    const currentLink = document.querySelector(`.navbar-link[href="${currentPath}"]`);
    if (currentLink) {
      currentLink.classList.add('active');
    }
  }
  
  // Add click event to all service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', function() {
      const link = this.querySelector('.card-link');
      if (link) {
        link.click();
      }
    });
  });
});


// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
  const chatbotBubble = document.getElementById('chatbotBubble');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotSend = document.getElementById('chatbotSend');
  const chatbotInput = document.getElementById('chatbotInput');
  const quickReplies = document.querySelectorAll('.quick-reply');

  // Ouvrir la fenêtre du chatbot
  chatbotBubble.addEventListener('click', function() {
    chatbotWindow.classList.add('active');
    chatbotBubble.style.opacity = '0.5';
  });

  // Fermer la fenêtre du chatbot
  chatbotClose.addEventListener('click', function() {
    chatbotWindow.classList.remove('active');
    chatbotBubble.style.opacity = '1';
  });

  // Envoyer un message (visuel seulement)
  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      // Créer un nouveau message utilisateur
      const messagesContainer = document.querySelector('.chatbot-messages');
      const newMessage = document.createElement('div');
      newMessage.className = 'message-user';
      newMessage.innerHTML = `
        <div class="message-content">${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      `;
      messagesContainer.appendChild(newMessage);
      
      // Réponse automatique du bot
      setTimeout(() => {
        const botResponse = document.createElement('div');
        botResponse.className = 'message-bot';
        botResponse.innerHTML = `
          <div class="message-content">Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais.</div>
          <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
        `;
        messagesContainer.appendChild(botResponse);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 1000);
      
      // Vider le champ de saisie
      chatbotInput.value = '';
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // Envoyer avec le bouton
  chatbotSend.addEventListener('click', sendMessage);

  // Envoyer avec la touche Enter
  chatbotInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Réponses rapides
  quickReplies.forEach(reply => {
    reply.addEventListener('click', function() {
      const text = this.textContent;
      chatbotInput.value = text;
      chatbotInput.focus();
    });
  });

  // Fermer en cliquant en dehors de la fenêtre
  document.addEventListener('click', function(e) {
    if (!chatbotWindow.contains(e.target) && 
        !chatbotBubble.contains(e.target) && 
        chatbotWindow.classList.contains('active')) {
      chatbotWindow.classList.remove('active');
      chatbotBubble.style.opacity = '1';
    }
  });
}); 

// Appointment Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const appointmentForm = document.getElementById('appointmentForm');
  const messageTextarea = document.getElementById('message');
  const charCount = document.getElementById('charCount');
  
  if (appointmentForm) {
    // Compteur de caractères pour le message
    if (messageTextarea && charCount) {
      messageTextarea.addEventListener('input', function() {
        charCount.textContent = this.value.length;
        
        if (this.value.length > 500) {
          this.value = this.value.substring(0, 500);
          charCount.textContent = 500;
          charCount.style.color = '#dc3545';
        } else {
          charCount.style.color = '';
        }
      });
    }
    
    // Validation personnalisée de la date
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
      // Définir la date minimum à aujourd'hui
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      
      // Définir la date maximum à 3 mois plus tard
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      dateInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Validation du formulaire
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simuler l'envoi du formulaire
      simulateFormSubmission();
    });
  }
  
  // Simulation de l'envoi du formulaire
  function simulateFormSubmission() {
    // Créer un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'form-message success';
    successMessage.innerHTML = `
      <ion-icon name="checkmark-circle-outline"></ion-icon>
      <div>
        <strong>Demande envoyée avec succès !</strong><br>
        Nous vous contacterons dans les plus brefs délais pour confirmer votre rendez-vous.
      </div>
    `;
    
    // Insérer le message au début du formulaire
    appointmentForm.insertBefore(successMessage, appointmentForm.firstChild);
    
    // Défiler vers le message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Désactiver le bouton de soumission
    const submitBtn = appointmentForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <ion-icon name="checkmark-outline"></ion-icon>
      Demande envoyée
    `;
    
    // Réinitialiser le formulaire après 5 secondes
    setTimeout(() => {
      appointmentForm.reset();
      successMessage.remove();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <ion-icon name="calendar-outline"></ion-icon>
        Réserver le rendez-vous
      `;
      if (charCount) charCount.textContent = '0';
    }, 5000);
  }
  
  // Ajouter des animations aux champs du formulaire
  const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
});

/**
 * BRANDS CAROUSEL - 2 LIGNES AVEC CADRES
 */

document.addEventListener('DOMContentLoaded', function() {
  const sliderTop = document.getElementById('brandsSliderTop');
  const sliderBottom = document.getElementById('brandsSliderBottom');
  const pauseBtn = document.getElementById('brandsPauseBtn');
  
  let isPaused = false;

  if (!sliderTop || !sliderBottom) return;

  // Fonction pour mettre en pause / reprendre les deux lignes
  function togglePause() {
    sliderTop.classList.toggle('paused');
    sliderBottom.classList.toggle('paused');
    isPaused = !isPaused;

    if (pauseBtn) {
      const icon = pauseBtn.querySelector('ion-icon');
      if (icon) {
        icon.setAttribute('name', isPaused ? 'play-outline' : 'pause-outline');
      }
      pauseBtn.setAttribute('aria-label', isPaused ? 'Reprendre le carrousel' : 'Mettre en pause le carrousel');
    }
  }

  // Pause au survol (sur n'importe quelle ligne)
  const allSliders = [sliderTop, sliderBottom];
  
  allSliders.forEach(slider => {
    slider.addEventListener('mouseenter', () => {
      sliderTop.classList.add('paused');
      sliderBottom.classList.add('paused');
    });

    slider.addEventListener('mouseleave', () => {
      if (!isPaused) {
        sliderTop.classList.remove('paused');
        sliderBottom.classList.remove('paused');
      }
    });
  });

  // Bouton pause / play
  if (pauseBtn) {
    pauseBtn.addEventListener('click', togglePause);
  }

  // Pause lorsque la page n'est pas visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      sliderTop.classList.add('paused');
      sliderBottom.classList.add('paused');
    } else if (!isPaused) {
      sliderTop.classList.remove('paused');
      sliderBottom.classList.remove('paused');
    }
  });

  // Clic sur un logo → redirection vers le formulaire de contact
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach(logo => {
    logo.addEventListener('click', function(e) {
      e.preventDefault();

      const img = this.querySelector('img');
      const brandName = img ? img.alt : 'un partenaire';

      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 100,
          behavior: 'smooth'
        });

        setTimeout(() => {
          const messageField = document.getElementById('message');
          if (messageField) {
            messageField.value = `Je suis intéressé(e) par vos services, recommandé(e) par ${brandName}.`;
            messageField.focus();
          }
        }, 800);
      }
    });
  });

  // Animation au scroll
  const brandsSection = document.querySelector('.brands');
  if (brandsSection) {
    const brandItems = document.querySelectorAll('.brand-item');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          brandItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.animationPlayState = 'running';
          });
        }
      });
    }, { threshold: 0.2 });

    observer.observe(brandsSection);
  }
});