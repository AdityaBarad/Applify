// import express from 'express';
// import { registerUser, loginUser } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);


// export default router;


// import express from 'express';
// import { registerUser, loginUser, checkAuth, logoutUser } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/check-auth', checkAuth);
// router.post('/logout', logoutUser);

// export default router;



import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, checkAuth, logoutUser } from '../controllers/authController.js';

const router = express.Router();

// Regular email/password routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/check-auth', checkAuth);
router.post('/logout', logoutUser);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: 'http:/localhost:5173/login'}),
//   (req, res) => {
//     // Successful authentication
//     res.redirect('http://localhost:5173/autoapply'); // Redirect to your home page or dashboard after login
//   }
// );
// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
//   (req, res) => {
//     const userEmail = req.user.email;
//     res.redirect(`http://localhost:5173/login?email=${userEmail}`);
//   }
// );




router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }),
  (req, res) => {
    
    const userEmail = req.user.email;
    const userName = req.user.username; // Assuming the user's name is available in `req.user`
    console.log(req.user.email);
    
    // Redirect to the frontend with both email and userName in the URL
    res.redirect(`http://localhost:5173/login?email=${userEmail}&name=${userName}`);
    console.log('Session after login:', req.session); // Log session info
  }
);



export default router;


