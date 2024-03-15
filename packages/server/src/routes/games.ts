import Elysia from 'elysia';
import createGameConfig from '../controllers/createGame';
import playCardConfig from '../controllers/playCard';
import getTableConfig from '../controllers/getTable';
import getGames from '../controllers/getGames';
import getHandConfig from '../controllers/getHand';
import getGame from '../controllers/getGame';

const app = new Elysia({ prefix: '/games' });

app.get('/', getGames.handler);
app.put('/new', createGameConfig.handler, createGameConfig.context);
app.get('/:id', getGame.handler);
app.put('/:id/card', playCardConfig.handler, playCardConfig.context);
app.get('/:id/hand', getHandConfig.handler);
app.get('/:id/table', getTableConfig.handler);

export default app;
