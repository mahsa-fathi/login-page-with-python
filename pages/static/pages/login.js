const tokenUrl = 'http://localhost:8000/api/api-token-auth/';

function getCSRFToken() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return value;
        }
    }
    return null;
}

function showError(message, id='errorMessage') {
    const errorMessageDiv = document.getElementById(id);
    errorMessageDiv.innerHTML = message;
}

function logIn() {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);

    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error('CSRF token not found.');
        return;
    }

    let requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    fetch(tokenUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                showError('Unable to log in with provided credentials.');
                throw new Error('Error in response');
            }
            return response.json();
        })
        .then(data => {
            const authToken = data.token;
            if (authToken) {
                localStorage.setItem('authToken', authToken);
                window.location.href = `http://localhost:8000/account/`;
            }
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
        });
}