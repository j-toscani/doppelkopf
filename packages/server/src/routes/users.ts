import Elysia from 'elysia';
import createUser from '../controllers/createUser';
import getUser from '../controllers/getUser';

const app = new Elysia({ prefix: '/users' });

app.put('/new', createUser.handler, createUser.context );
app.get('/:name', getUser.handler);

export default app;
