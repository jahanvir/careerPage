document.addEventListener('DOMContentLoaded', () => {
    const urlForm = document.getElementById('urlForm');
    const saveButton = document.getElementById('saveButton');
    const message = document.getElementById('message');
    const viewButton = document.getElementById('viewButton');
    const urlList = document.getElementById('urlList');


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

    viewButton.addEventListener('click', async () => {
        try {
            const response = await fetch('https://career-pages.onrender.com/getSavedUrls');
            if (response.ok) {
                const data = await response.json();
                const urls = data.urls;

                urlList.innerHTML = urls.map(url => `<p>${url}</p>`).join('');
                urlList.classList.remove('hidden');
            } else {
                console.log('Error fetching URLs:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});
