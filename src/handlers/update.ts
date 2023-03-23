import prisma from '../db';

// Get All
export const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});
	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);
	return res.json({ data: updates });
};

// Get One
export const getOneUpdate = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: { id: req.params.id },
	});

	return res.json({ data: update });
};

// Create Product
export const createUpdate = async (req, res) => {};

// Update Product
export const patchUpdate = async (req, res) => {};

// Delete Product
export const deleteUpdate = async (req, res) => {};
