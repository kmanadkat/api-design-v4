import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ChangeLog App API' });
});

// Error Handling
app.use((err, req, res, next) => {
	if (err.type === 'auth') {
		return res.status(401).json({ message: 'unauthorized' });
	} else if (err.type === 'input') {
		return res.status(400).json({ message: 'Invalid input' });
	}
	return res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
