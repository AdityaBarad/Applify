import express from 'express';
import  {runPuppeteer, getJobProgress}  from '../controllers/LinkedInautomation.js';

const router = express.Router();

router.post('/LinkedIn_apply', runPuppeteer);
router.get('/job-progress', getJobProgress);

export default router;




