function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function loginWithDiscord() {
    // Redirect to Discord OAuth2 login page
    window.location.href = "https://discord.com/api/oauth2/authorize?..."; // Replace with your Discord OAuth URL
}

function toggleFeature(feature) {
    alert(`${feature} feature toggled!`);
}

function saveWelcomeMessage() {
    let message = document.getElementById("welcomeMessage").value;
    alert(`Welcome message saved: ${message}`);
}

document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('botStatusChart').getContext('2d');
    const botStatusChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
                label: 'Bot Uptime',
                data: [65, 59, 80, 81, 56],
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            }]
        }
    });
});
