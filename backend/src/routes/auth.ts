import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User';
import { generateToken, authenticateToken } from '../middleware/auth';

const router = express.Router();

// Initialize demo user if no users exist
async function initializeDemoUser(): Promise<void> {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('password', 10);
      const demoUser = new UserModel({
        email: 'admin@loopr.com',
        password: hashedPassword,
        name: 'Admin User'
      });
      await demoUser.save();
      console.log('✅ Demo user created');
    }
  } catch (error) {
    console.error('Error initializing demo user:', error);
  }
}

// Initialize demo user on startup
initializeDemoUser();

// Login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken({ id: user._id.toString(), email: user.email });

    res.json({
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      res.status(409).json({ error: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new UserModel({
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || 'New User'
    });

    await newUser.save();

    const token = generateToken({ id: newUser._id.toString(), email: newUser.email });

    res.status(201).json({
      token,
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token
router.get('/verify', authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user?.id) {
      res.status(401).json({ error: 'Invalid token payload' });
      return;
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout (client-side token removal)
router.post('/logout', authenticateToken, (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: 'Logged out successfully' });
});

export default router;