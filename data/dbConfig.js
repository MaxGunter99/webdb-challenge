//IMPORTS
const Knex = require( 'knex' );
const KnexConfig = require( '../knexfile' );

//EXPORTS
module.exports = Knex( KnexConfig.development );