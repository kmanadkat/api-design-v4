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
export const createUpdate = async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: req.body.productId,
				belongsToId: req.user.id,
			},
		},
	});
	if (!product) {
		// Does not belong to user
		return res.status(400).json({ message: 'invalid product id' });
	}

	const update = await prisma.update.create({
		data: {
			productId: req.body.productId,
			title: req.body.title,
			body: req.body.body,
			updatedAt: new Date(),
		},
	});

	return res.json({ data: update });
};

// Update Product
export const patchUpdate = async (req, res) => {
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

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		return res.status(400).json({ message: 'Update not found' });
	}

	const updatedUpdate = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: req.body,
	});

	return res.json({ data: updatedUpdate });
};

// Delete Product
export const deleteUpdate = async (req, res) => {
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

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		return res.status(400).json({ message: 'Update not found' });
	}
	const deleted = await prisma.update.delete({
		where: { id: req.params.id },
	});

	return res.json({ data: deleted });
};
