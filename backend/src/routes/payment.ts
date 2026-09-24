import { Router, Request, Response } from 'express';
import { paymentCtrl } from '../controllers/payment';

const router = Router();

// GET /api/payments - List payments
router.get('/', async (req: Request, res: Response) => {
  try {
    const payments = await paymentCtrl.list();
    res.json({ success: true, data: payments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/payments/:id - Get payment by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const payment = await paymentCtrl.getById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, error: 'Payment not found' });
    }
    res.json({ success: true, data: payment });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/payments - Create payment
router.post('/', async (req: Request, res: Response) => {
  try {
    const payment = await paymentCtrl.create(req.body);
    res.status(201).json({ success: true, data: payment });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT /api/payments/:id - Update payment status
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const payment = await paymentCtrl.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: payment });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export { router as paymentRouter };