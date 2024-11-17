import express from 'express';
import  {IrunPuppeteer, IgetJobProgress}  from '../controllers/Internshalaautomation.js';

const router = express.Router();

router.post('/Internshala_apply', IrunPuppeteer);
router.get('/job-progress', IgetJobProgress);

export default router;