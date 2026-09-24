import { Router, Request, Response } from 'express';
import { maintenanceCtrl } from '../controllers/maintenance';

const router = Router();

// GET /api/maintenance - List maintenance requests
router.get('/', async (req: Request, res: Response) => {
  try {
    const requests = await maintenanceCtrl.list();
    res.json({ success: true, data: requests });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/maintenance/:id - Get maintenance request by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const request = await maintenanceCtrl.getById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, error: 'Maintenance request not found' });
    }
    res.json({ success: true, data: request });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/maintenance - Create maintenance request
router.post('/', async (req: Request, res: Response) => {
  try {
    const request = await maintenanceCtrl.create(req.body);
    res.status(201).json({ success: true, data: request });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT /api/maintenance/:id - Update maintenance request status
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const request = await maintenanceCtrl.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: request });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export { router as maintenanceRouter };