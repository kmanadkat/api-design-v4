import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const createJWT = (user) => {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		return res.status(401).json({ message: 'Not authorized' });
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		return res.status(401).json({ message: 'Not authorized' });
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload;
		next();
		return;
	} catch (error) {
		console.error(error.message);
		return res.status(401).json({ message: 'Not valid token' });
	}
};

export const comparePasswords = (password, hash) => {
	return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10).then((salt) => {
			resolve(bcrypt.hash(password, salt));
		});
	});
};
