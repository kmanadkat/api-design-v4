import { Router } from 'express';
import { body } from 'express-validator';
import {
	createProduct,
	deleteProduct,
	getOneProduct,
	getProducts,
	updateProduct,
} from './handlers/product';
import { handleInputErrors } from './modules/middleware';

const router = Router();

/**
 * Product
 */
router.get('/products', getProducts);

router.get('/products/:id', getOneProduct);

router.post(
	'/products',
	body('name').isString(),
	handleInputErrors,
	createProduct
);

router.put(
	'/products/:id',
	body('name').isString(),
	handleInputErrors,
	updateProduct
);

router.delete('/products/:id', deleteProduct);

/**
 * Update
 */
router.get('/updates', (req, res) => {});

router.get('/updates/:id', (req, res) => {});

router.post(
	'/updates',
	body('title').isString(),
	body('body').isString(),
	handleInputErrors,
	(req, res) => {}
);

router.put(
	'/updates/:id',
	body('title').isString().optional(),
	body('body').isString().optional(),
	body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
	body('version').isString().optional(),
	handleInputErrors,
	(req, res) => {}
);

router.delete('/updates/:id', (req, res) => {});

/**
 * UpdatePoint
 */
router.get('/updatepoints', (req, res) => {});

router.get('/updatepoints/:id', (req, res) => {});

router.post(
	'/updatepoints',
	body('name').isString(),
	body('description').isString(),
	body('updateId').isString(),
	handleInputErrors,
	(req, res) => {}
);

router.put(
	'/updatepoints/:id',
	body('name').isString().optional(),
	body('description').isString().optional(),
	handleInputErrors,
	(req, res) => {}
);

router.delete('/updatepoints/:id', (req, res) => {});

export default router;
