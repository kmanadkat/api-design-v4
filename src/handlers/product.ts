import prisma from '../db';

// Get All
export const getProducts = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { id: req.user.id },
		include: { products: true },
	});

	return res.json({ data: user.products });
};

// Get One
export const getOneProduct = async (req, res) => {
	const productId = req.params.id;
	const product = await prisma.product.findUnique({
		where: {
			id_belongsToId: {
				id: productId,
				belongsToId: req.user.id,
			},
		},
	});

	return res.json({ data: product });
};

// Create Product
export const createProduct = async (req, res) => {
	const product = await prisma.product.create({
		data: {
			name: req.body.name,
			belongsToId: req.user.id,
		},
	});

	return res.json({ data: product });
};

// Update Product
export const updateProduct = async (req, res) => {
	const productId = req.params.id;
	const updated = await prisma.product.update({
		where: {
			id_belongsToId: {
				id: productId,
				belongsToId: req.user.id,
			},
		},
		data: {
			name: req.body.name,
		},
	});

	return res.json({ data: updated });
};

// Delete Product
export const deleteProduct = async (req, res) => {
	const productId = req.params.id;
	const deleted = await prisma.product.delete({
		where: {
			id_belongsToId: {
				id: productId,
				belongsToId: req.user.id,
			},
		},
	});
	return res.json({ data: deleted });
};
