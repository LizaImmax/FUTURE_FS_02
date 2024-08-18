// script.js

// User Authentication Handling
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in when page loads
    if (isUserLoggedIn()) {
        showLoggedInState();
    } else {
        showLoggedOutState();
    }

    // Event listener for login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            loginUser(email, password);
        });
    }

    // Event listener for registration form submission
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            registerUser(email, password);
        });
    }
});

function isUserLoggedIn() {
    // Check login status from localStorage or session
    return localStorage.getItem('userLoggedIn') === 'true';
}

function showLoggedInState() {
    // Update UI for logged-in users
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-link').style.display = 'block';
}

function showLoggedOutState() {
    // Update UI for logged-out users
    document.getElementById('login-link').style.display = 'block';
    document.getElementById('logout-link').style.display = 'none';
}

function loginUser(email, password) {
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('userLoggedIn', 'true');
            window.location.href = 'cart.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

function registerUser(email, password) {
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful');
            window.location.href = 'login.html';
        } else {
            alert('Registration failed');
        }
    });
}

// Search Functionality
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product-card');
        products.forEach(product => {
            const title = product.querySelector('h3').textContent.toLowerCase();
            if (title.includes(query)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

// Checkout Functionality
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(checkoutForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        processCheckout(data);
    });
}

function processCheckout(data) {
    fetch('/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Checkout successful');
            window.location.href = 'index.html';
        } else {
            alert('Checkout failed');
        }
    });
}
