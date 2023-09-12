const apiUrl = 'http://localhost:8000/api/register/';
const successMessage = 'Registration successful! You can now login.';

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

function postData() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);

    const csrfToken = getCSRFToken();

    if (!csrfToken) {
        console.error('CSRF token not found.');
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify(Object.fromEntries(formData))
    };

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                const contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json().then(errorData => {
                        if (response.status === 400) {
                            let passError = "";
                            if (errorData.hasOwnProperty('password')) {
                                passError += errorData.password.join(`<br>`);
                            }
                            showError(passError, 'passwordError')

                            let pass2Error = "";
                            if (errorData.hasOwnProperty('password2')) {
                                pass2Error += errorData.password2.join(`<br>`);
                            }
                            showError(pass2Error, 'password2Error')

                            let emailError = "";
                            if (errorData.hasOwnProperty('email')) {
                                emailError += errorData.email.join(`<br>`);
                            }
                            showError(emailError, 'emailError');
                        } else if (response.status === 401) {
                            showError('Unauthorized');
                        } else {
                            showError('An error occurred with status code: ' + response.status);
                        }
                        // Do not proceed to the success block
                        throw new Error('Error in response');
                    });
                }
                showError('Non-JSON response with status code: ' + response.status);
                throw new Error('Error in response');
            }
            return response.json();
        })
        .then(data => {
            // Handle the response data here
            console.log(data);
            // redirect to home page with a query parameter
            window.location.href = `http://localhost:8000/?success=${encodeURIComponent(successMessage)}`;
        })
        .catch(error => {
            // Handle errors here
            console.error('There was a problem with the fetch operation:', error);
        });
}