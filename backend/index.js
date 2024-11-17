// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import puppeteerRoutes from './routes/LinkedInRoutes.js';
// import IpuppeteerRoutes from './routes/InternshalaRoutes.js'

// const app = express();
// const port = 5000;
// app.use(cors());
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/puppeteer', puppeteerRoutes);
// app.use('/api/Ipuppeteer', IpuppeteerRoutes)

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


// import express from 'express';
// import session from 'express-session';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import puppeteerRoutes from './routes/LinkedInRoutes.js';
// import IpuppeteerRoutes from './routes/InternshalaRoutes.js';

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// // Set up session middleware
// app.use(session({
//   secret: 'your-secret-key', // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//     httpOnly: true, // Cookie can't be accessed via JavaScript
//   },
// }));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/puppeteer', puppeteerRoutes);
// app.use('/api/Ipuppeteer', IpuppeteerRoutes);

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });






import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import puppeteerRoutes from './routes/LinkedInRoutes.js';
import IpuppeteerRoutes from './routes/InternshalaRoutes.js';
import './services/passportGoogle.js'; // Google OAuth setup file
import appliedJobsRoutes from './routes/appliedJobsRoutes.js';

const app = express();
const port = 5000;


// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(cookieParser());

// Set up session middleware
// app.use(session({
//   secret: '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', // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24, // 1 day
//     httpOnly: true, // Cookie can't be accessed via JavaScript
//   },
// }));


app.use(session({
  secret: 'your-secret-key', // Use a strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set secure flag in production
  },
}));


// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/api/auth', authRoutes);
app.use('/api/puppeteer', puppeteerRoutes);
app.use('/api/Ipuppeteer', IpuppeteerRoutes);
app.use('/api', appliedJobsRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
