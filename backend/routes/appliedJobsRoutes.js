import express from 'express';
import { getAppliedJobs } from '../controllers/appliedJobs.js'; // Import the controller function

const router = express.Router();

// Define the route
router.get('/applied-jobs', getAppliedJobs); // Route to handle the job fetching request

export default router;

