// Close button functionality
document.querySelector('.close-button').addEventListener('click', () => {
    const modal = document.querySelector('.credits-modal');
    modal.style.display = 'none';
});

// Example: Show modal again on click
document.querySelector('.logo').addEventListener('click', () => {
    const modal = document.querySelector('.credits-modal');
    modal.style.display = 'block';
});
