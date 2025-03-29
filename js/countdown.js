document.addEventListener('DOMContentLoaded', function() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;
    
    const endDate = new Date(countdownEl.dataset.end).getTime();
    
    const daysEl = countdownEl.querySelector('.days');
    const hoursEl = countdownEl.querySelector('.hours');
    const minutesEl = countdownEl.querySelector('.minutes');
    const secondsEl = countdownEl.querySelector('.seconds');
    
    function updateCountdown() {
        const now = new Date('March 29, 2025').getTime();
        
        const distance = endDate - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }
    
    updateCountdown();
    // setInterval(updateCountdown, 1000);
}); 