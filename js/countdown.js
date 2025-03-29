// Countdown Timer Implementation
document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.querySelector('.countdown');
    
    if (!countdownElement) return;
    
    const endDate = countdownElement.getAttribute('data-end');
    
    if (!endDate) {
        console.error('No end date specified for countdown');
        return;
    }
    
    // Calculate the fixed time difference for days and hours
    const endDateTime = new Date(endDate).getTime();
    const demoDate = new Date('March 29, 2025').getTime();
    const fixedTimeRemaining = endDateTime - demoDate;
    
    // Fixed values for days and hours
    const days = Math.floor(fixedTimeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((fixedTimeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Display fixed values
    document.querySelector('.days').textContent = days < 10 ? '0' + days : days;
    document.querySelector('.hours').textContent = hours < 10 ? '0' + hours : hours;
    
    // For minutes and seconds, use a cycling counter for visual effect
    let minutes = 59;
    let seconds = 59;
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
            }
        }
        
        // Display the cycling values
        document.querySelector('.minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.querySelector('.seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
}); 