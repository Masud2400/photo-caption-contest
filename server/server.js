const express = require('express');
const app = express();
const path = require('path');
const {Pool} = require('pg');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const pool = new Pool({
    user: 'masud',
    host: 'localhost',
    database: 'postgres',
    password: 'new_password',
    port: 5432,
})

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/signup.html'));
});

app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/captionSubmit.html'));
});

app.post('/sign-up', async (req,res) => {
    const {email, password} = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPassword]);
        res.redirect('/login');
    } catch (err) {
        console.error('Error inserting data: ', err);
        res.status(500).send('Server error');
    }
})

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    
    try {
        const result = await pool.query('SELECT password FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).send('User not found');
        }

        const storedHashedPassword = result.rows[0].password;

        const isMatch = await bcrypt.compare(password, storedHashedPassword);

        if (isMatch) {
            req.session.email = email;
            res.redirect('/submit');
        } else {
            return res.status(401).send('Incorrect password');
        }

    } catch(err) {
        console.error('Error login in: ', err);
        res.status(500).send('Server error');
    }
})

app.post('/submit', async (req, res) => {
    const { photo, caption } = req.body;
    const email = req.session.email;

    if (!email) {
        return res.status(400).send('Missing session email');
    }

    try {
        const result = await pool.query(
            'UPDATE users SET photos = $1, caption = $2 WHERE email = $3',
            [photo, caption, email]
        );

        if (result.rowCount === 0) {
            return res.status(404).send('User not found');
        }

        res.status(200).send('Photo and caption updated');
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Server error');
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})