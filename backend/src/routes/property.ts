import { Router, Request, Response } from 'express';
import { propertyCtrl } from '../controllers/property';

const router = Router();

// GET /api/properties - List properties
router.get('/', async (req: Request, res: Response) => {
  try {
    const properties = await propertyCtrl.list();
    res.json({ success: true, data: properties });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/properties/:id - Get property by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const property = await propertyCtrl.getById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/properties - Create property
router.post('/', async (req: Request, res: Response) => {
  try {
    const property = await propertyCtrl.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export { router as propertyRouter };