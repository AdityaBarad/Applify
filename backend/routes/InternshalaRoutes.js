import express from 'express';
import  {Irun, IgetJobProgress}  from '../controllers/Internshalaautomation.js';

const router = express.Router();

router.post('/Internshala_apply', Irun);
router.get('/job-progress', IgetJobProgress);

export default router;