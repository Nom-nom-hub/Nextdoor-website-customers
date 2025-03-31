// Countdown Timer Implementation
document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.querySelector('.countdown');
    
    if (!countdownElement) return;
    
    const endDate = countdownElement.getAttribute('data-end');
    
    if (!endDate) {
        console.error('No end date specified for countdown');
        return;
    }
    
    const endDateTime = new Date(endDate).getTime();
    
    // Update the countdown every second
    const countdownTimer = setInterval(function() {
        // Get current date and time
        const now = new Date().getTime();
        
        // Find the time remaining
        const timeRemaining = endDateTime - now;
        
        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Display the countdown
        document.querySelector('.days').textContent = days < 10 ? '0' + days : days;
        document.querySelector('.hours').textContent = hours < 10 ? '0' + hours : hours;
        document.querySelector('.minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.querySelector('.seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        
        // If countdown is finished
        if (timeRemaining < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.days').textContent = '00';
            document.querySelector('.hours').textContent = '00';
            document.querySelector('.minutes').textContent = '00';
            document.querySelector('.seconds').textContent = '00';
        }
    }, 1000);
}); 
