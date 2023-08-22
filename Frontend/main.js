document.addEventListener('DOMContentLoaded', () => {
    const urlForm = document.getElementById('urlForm');
    const saveButton = document.getElementById('saveButton');
    const message = document.getElementById('message');

    saveButton.addEventListener('click', async () => {
        const urlInput = document.getElementById('urlInput').value;
        if (!urlInput) {
            message.textContent = 'Please enter a URL.';
            return;
        }

        try {
            const response = await fetch('https://career-pages.onrender.com/saveUrl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: urlInput })
            });

            if (response.ok) {
                message.textContent = 'URL saved successfully.';
            } else {
                message.textContent = 'Error saving URL.';
            }
        } catch (error) {
            console.error('An error occurred:', error);
            message.textContent = 'An error occurred. Please try again later.';
        }
    });
});
