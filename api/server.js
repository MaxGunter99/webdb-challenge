//IMPORTS
const express = require( 'express' );
const server = express();
const morgan = require( 'morgan' );
const cors = require( 'cors' );

//ROUTERS
const projectRouter = require( '../routers/projectsRouter' );
const actionRouter = require( '../routers/actionsRouter' );

server.use( express.json() );
server.use( morgan( 'common' ));
server.use(cors());

//URL EXTENTIONS
server.use( '/api/projects' , projectRouter );
server.use( '/api/actions' , actionRouter );

//SANITY CHECK
server.get( '/' , ( req, res ) => {
    res.status( 200 ).json({ message: 'Its Alive!' });
});

module.exports = server;