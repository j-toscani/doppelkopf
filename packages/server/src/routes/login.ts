import Elysia from 'elysia';
import loginUser from '../controllers/loginUser';

const app = new Elysia({ prefix: '/login' });

app.post('/', loginUser.handler, loginUser.context );

export default app;
