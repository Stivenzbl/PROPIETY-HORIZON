import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/auth';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await register({ name, email, password });
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({ success: false, error: error.message });
  }
});

export { router as authRouter };