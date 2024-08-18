const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Serve static files
app.use(express.static('public'));

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Validate user (you should implement your own validation)
    if (email === 'user@example.com' && password === 'password') {
        req.session.loggedIn = true;
        res.redirect('/cart.html');
    } else {
        res.redirect('/login.html');
    }
});

// Middleware to check if user is logged in
function ensureAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login.html');
    }
}

// Protected routes
app.get('/cart.html', ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/cart.html');
});

app.get('/checkout.html', ensureAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/public/checkout.html');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
