import { createNewUser } from '../user';

describe('user handler', () => {
	it('should create a new should', async () => {
		const req = { body: { username: 'hello', password: '12345465' } };
		const res = {
			json({ token }) {
				expect(token).toBeTruthy();
			},
		};
		await createNewUser(req, res, () => {});
	});
});
