import Elysia from 'elysia';
import createGameConfig from '../controllers/createNewGame';
import playCardConfig from '../controllers/playCard';
import getTableConfig from '../controllers/getTable';
import getHandConfig from '../controllers/getHand';

const app = new Elysia({ prefix: '/game' });

app.put('/new', createGameConfig.handler, createGameConfig.context);
app.put('/:id/card', playCardConfig.handler, playCardConfig.context);
app.get('/:id/hand', getHandConfig.handler);
app.get('/:id/table', getTableConfig.handler);

export default app;
