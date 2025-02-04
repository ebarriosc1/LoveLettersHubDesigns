document.addEventListener("DOMContentLoaded", function() {
    // const loveLetters = [
    //     "You are my sunshine on a rainy day.",
    //     "Every moment with you is a treasure.",
    //     "I love you more than words can express.",
    //     "You make my heart skip a beat every day.",
    //     "Your smile is the reason for my happiness."
    // ];

    function getCurrentDate() {
        const date = new Date();
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = months[date.getMonth()]; // Get the month name
        const day = date.getDate();
        const year = date.getFullYear();
    
        return `${month}    ${day}, ${year}`; // Ensures a space before the day
    }
    // function getDailyLetter() {
    //     const date = new Date();
    //     const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    //     return loveLetters[dayOfYear % loveLetters.length];
    // }

    // document.getElementById("love-letter").textContent = getDailyLetter();
    document.getElementById("current-date").textContent= getCurrentDate();

    // function updateCountdown() {
    //     const now = new Date();
    //     const nextMidnight = new Date(now);
    //     nextMidnight.setHours(24, 0, 0, 0);
    //     const timeLeft = nextMidnight - now;
    //     const hours = Math.floor(timeLeft / 3600000);
    //     const minutes = Math.floor((timeLeft % 3600000) / 60000);
    //     const seconds = Math.floor((timeLeft % 60000) / 1000);
    //     document.getElementById("countdown").textContent = `${hours}h ${minutes}m ${seconds}s`;
    // }
    // updateCountdown();
    // setInterval(updateCountdown, 1000);
});