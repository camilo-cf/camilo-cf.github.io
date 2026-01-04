/**
 * Spam-safe email reveal for contact page
 * Email is obfuscated in HTML and only revealed after user action
 */
(function() {
  'use strict';

  var revealBtn = document.getElementById('reveal-email');
  var emailContainer = document.getElementById('contact-email');

  if (!revealBtn || !emailContainer) return;

  revealBtn.addEventListener('click', function() {
    var user = emailContainer.getAttribute('data-user');
    var domain = emailContainer.getAttribute('data-domain');

    if (!user || !domain) {
      emailContainer.textContent = 'Email configuration error. Please use LinkedIn instead.';
      return;
    }

    // Reverse the domain back (it was reversed for obfuscation)
    var reversedDomain = domain.split('').reverse().join('');
    var email = user + '@' + reversedDomain;

    // Create mailto link
    var link = document.createElement('a');
    link.href = 'mailto:' + email;
    link.textContent = email;
    link.setAttribute('rel', 'noopener');

    // Clear and add the link
    emailContainer.innerHTML = '';
    emailContainer.appendChild(link);

    // Hide the reveal button
    revealBtn.style.display = 'none';

    // Update button state for accessibility
    revealBtn.setAttribute('aria-expanded', 'true');
  });

  // Keyboard accessibility
  revealBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      revealBtn.click();
    }
  });
})();
