document.addEventListener("DOMContentLoaded", function() {
    const prizeBoxesElement = document.getElementById('prize-boxes');
    const timerElement = document.getElementById('timer');

    function fetchCurrentPrizes() {
        fetch('/api/current-prizes')
            .then(response => response.json())
            .then(data => {
                displayPrizes(data.prizes);
                updateTimer(data.nextUpdate);
            })
            .catch(error => {
                console.error('Error fetching prizes:', error);
                prizeBoxesElement.textContent = 'Error loading prizes.';
            });
    }

    function displayPrizes(prizes) {
        prizeBoxesElement.innerHTML = '';
        prizes.forEach((prize, index) => {
            const boxElement = document.createElement('div');
            boxElement.className = 'prize-box';
            boxElement.textContent = `Box ${index + 1}: ${prize} stars`;
            prizeBoxesElement.appendChild(boxElement);
        });
    }

    function updateTimer(nextUpdate) {
        const nextUpdateTime = new Date(nextUpdate).getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = nextUpdateTime - now;

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            timerElement.textContent = `Next prize update in: ${hours}:${minutes}:${seconds}`;

            if (distance < 0) {
                clearInterval(countdownInterval);
                fetchCurrentPrizes();
            }
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);
    }

    fetchCurrentPrizes();
});
