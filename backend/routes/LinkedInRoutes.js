import express from 'express';
import  {run, getJobProgress}  from '../controllers/LinkedInautomation.js';

const router = express.Router();

router.post('/LinkedIn_apply', run);
router.get('/job-progress', getJobProgress);

export default router;




