import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req, res, next) => {
	try {
		const hash = await hashPassword(req.body.password);
		const user = await prisma.user.create({
			data: {
				username: req.body.username,
				password: hash,
			},
		});

		const token = createJWT(user);
		return res.json({ token });
	} catch (error) {
		error.type = 'input';
		next(error);
	}
};

export const signin = async (req, res) => {
	const { username, password } = req.body;
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (!user) {
		return res.status(404).json({ message: 'Username not found' });
	}

	const isValid = await comparePasswords(password, user.password);
	if (!isValid) {
		return res.status(401).json({ message: 'Username/password incorrect' });
	}

	const token = createJWT(user);
	return res.json({ token });
};
