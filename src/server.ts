import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { protect } from './modules/auth';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/api', protect, router);

app.get('/', (req, res) => {
	return res.status(200).json({ message: 'ChangeLog App API' });
});

export default app;
