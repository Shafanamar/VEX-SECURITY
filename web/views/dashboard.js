document.getElementById('subscriptionButton').addEventListener('click', () => {
    fetch('/getSubscriptionPlans')
        .then(response => response.json())
        .then(data => {
            displayPlans(data); // You can write a function to display plans
        })
        .catch(err => {
            console.error('Error fetching subscription plans:', err);
        });
});

function displayPlans(plans) {
    // Display the plans dynamically in your HTML
    const planContainer = document.getElementById('planContainer');
    planContainer.innerHTML = '';

    plans.forEach(plan => {
        const planDiv = document.createElement('div');
        planDiv.classList.add('plan');
        planDiv.innerHTML = `
            <h3>${plan.name}</h3>
            <p>${plan.description}</p>
            <button onclick="subscribe(${plan.id})">Subscribe</button>
        `;
        planContainer.appendChild(planDiv);
    });
}

function subscribe(planId) {
    // Handle subscription process
    fetch(`/subscribe/${planId}`, { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'success.html';
            } else {
                alert('Subscription failed.');
            }
        })
        .catch(err => {
            console.error('Subscription error:', err);
        });
}

document.getElementById('themeToggle').addEventListener('change', (event) => {
    const isDarkMode = event.target.checked;
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    // Save user preference (optional)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// Set initial theme based on saved user preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.getElementById('themeToggle').checked = savedTheme === 'dark';
    }
});

document.getElementById('saveSettings').addEventListener('click', () => {
    const welcomeMessage = document.getElementById('welcomeMessage').value;
    const logChannel = document.getElementById('logChannel').value;

    const settings = {
        welcomeMessage,
        logChannel,
        antiRaidEnabled: document.getElementById('antiRaidToggle').checked,
        antiNukeEnabled: document.getElementById('antiNukeToggle').checked,
    };

    fetch('/setSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Settings saved successfully!');
            } else {
                alert('Error saving settings.');
            }
        })
        .catch(err => {
            console.error('Error saving settings:', err);
        });
});

fetch('/getStatus')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('statusGraph').getContext('2d');
        const statusChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.timestamps,
                datasets: [{
                    label: 'Bot Status',
                    data: data.statusValues,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1,
                }],
            },
            options: {
                scales: {
                    x: { title: { display: true, text: 'Time' } },
                    y: { title: { display: true, text: 'Status' } }
                }
            }
        });
    })
    .catch(err => {
        console.error('Error fetching bot status:', err);
    });

