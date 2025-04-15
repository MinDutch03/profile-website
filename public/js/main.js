// This file contains client-side JavaScript functionality

// Format dates to local format when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Format dates in a user-friendly way
    const formatDates = () => {
      const datesToFormat = document.querySelectorAll('.date');

      datesToFormat.forEach(dateElement => {
        const dateText = dateElement.textContent;
        // Only process if it contains a date
        if (dateText && dateText.includes('-')) {
          // Keep the original format but format the dates nicer if possible
          try {
            const formattedText = dateText.replace(/\d{4}-\d{2}-\d{2}/g, match => {
              const date = new Date(match);
              return date.toLocaleDateString();
            });
            dateElement.textContent = formattedText;
          } catch (e) {
            console.log('Date formatting error:', e);
          }
        }
      });
    };

    formatDates();
  });

  // Active navigation highlighting
  document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
      // Check if the link href matches the current path
      if (link.getAttribute('href') === currentPath ||
          (link.getAttribute('href') !== '/' && currentPath.includes(link.getAttribute('href')))) {
        link.style.color = 'var(--primary-color)';
        link.style.fontWeight = 'bold';
      }
    });
  });

  // Form validation helper
  function validateForm(form) {
    let isValid = true;

    // Check all required fields
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('invalid');
        isValid = false;
      } else {
        field.classList.remove('invalid');
      }
    });

    return isValid;
  }

  // Add form validation to all forms
  document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
          e.preventDefault();
          alert('Please fill in all required fields');
        }
      });
    });
  });
