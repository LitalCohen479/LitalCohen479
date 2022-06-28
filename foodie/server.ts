import express from 'express';
const app = express();
const port = 3002; // default port to listen;

app.use(express.json());
import uid,{randomNumber} from './control/helpers'

// define a route handler for the default home page
app.use(express.static('public'))

console.log(uid());

import itemsRouter from './routes/itemsRouter';
app.use('/items',itemsRouter);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );