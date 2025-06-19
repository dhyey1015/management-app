import express from 'express';
import registerRoute from './register.js'; 
import loginRoute from './login.js'; 


const router = express.Router();

router.use('/register', registerRoute);
router.use('/login', loginRoute)

export default router;
