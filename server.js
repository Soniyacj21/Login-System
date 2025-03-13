const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rheNa2<*t.,k',  
    database: 'user_auth',
    port: 3306
});
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Database connected successfully');
    connection.release();
});
const jwtSecret = 'aVeryLongRandomSecureSecretKey_ChangeThis!';
app.post('/signup', async (req, res) => {
    console.log("Signup request received:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const [existingUser] = await db.promise().query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});
app.post('/login', async (req, res) => {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }
    try {
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('❌ Database error:', err.message);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});
app.get('/', (req, res) => {
    res.send('🚀 Server is running!');
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
