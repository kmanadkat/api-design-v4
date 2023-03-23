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

	res.json({ data: product });
};
