import db from '../db.js';
import bcrypt from 'bcrypt';

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Store user info in session
    req.session.user = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    };

    console.log('Session after login:', req.session); // Log session info

    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Check if user is authenticated
// export const checkAuth = (req, res) => {
//   if (req.session.user) {
//     res.status(200).json({ message: 'User is authenticated', user: req.session.user });
//   } else {
//     res.status(401).json({ message: 'Not authenticated' });
//   }
// };
export const checkAuth = (req, res) => {
  console.log('Session in checkAuth:', req.session); // Log session info
  if (req.session.passport && req.session.passport.user) {
    res.status(200).json({ message: 'User is authenticated', user: req.session.passport.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};


// Logout User
// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // This clears the session cookie
    return res.status(200).json({ message: 'Logged out successfully' });
  });
};



