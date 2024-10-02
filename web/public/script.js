document.addEventListener('DOMContentLoaded', () => {
    const subscriptionButtons = document.querySelectorAll('.subscribe-button');

    subscriptionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const tier = event.target.dataset.tier; // Get tier from button data attribute
            fetch(`/subscribe?tier=${tier}`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Redirect to the success page
                    window.location.href = '/success';
                } else {
                    // Handle error (e.g., show an error message)
                    alert('Error subscribing. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });

    // Add more event listeners as needed for other functionalities
});

