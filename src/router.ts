import { Router } from 'express';

const router = Router();

/**
 * Product
 */
router.get('/products', (req, res) => {
	res.json({ message: 'hello' });
});

router.get('/products/:id', (req, res) => {});

router.post('/products', (req, res) => {});

router.put('/products/:id', (req, res) => {});

router.delete('/products/:id', (req, res) => {});

/**
 * Update
 */
router.get('/updates', (req, res) => {});

router.get('/updates/:id', (req, res) => {});

router.post('/updates', (req, res) => {});

router.put('/updates/:id', (req, res) => {});

router.delete('/updates/:id', (req, res) => {});

/**
 * UpdatePoint
 */
router.get('/updatepoints', (req, res) => {});

router.get('/updatepoints/:id', (req, res) => {});

router.post('/updatepoints', (req, res) => {});

router.put('/updatepoints/:id', (req, res) => {});

router.delete('/updatepoints/:id', (req, res) => {});

export default router;
