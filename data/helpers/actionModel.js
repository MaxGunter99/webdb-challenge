//IMPORTS
const db = require( '../dbConfig' );
const map = require( './map' );

//EXPORTS
module.exports = {
    get,
    insert,
    update,
    remove
};

//GET ALL ACTIONS ( FUNCTION )
function get( id ) {
    let query = db( 'actions' );
    if ( id ) {
        return query
            .where( 'actions.id' , id )
            .first()
            .then( action => map.toggleAction( action ))
    }
    return query.then( actions => {
        return actions.map( action => map.toggleAction( action ))
    })
};

//ADD AN ACTION ( FUNCTION )
function insert( action ) {
    return db( 'actions' )
        .insert( action )
        .then(([ id ]) => this.get( id ));
};

//UPDATE AN ACTION ( FUNCTION )
function update( id , changes ) {
    return db( 'actions' )
        .where( 'id' , id )
        .update( changes )
        .then( count => ( count > 0 ? this.get( id ) : null));
};

//DELETE AN ACTION ( FUNCTION )
function remove( id ) {
    return db( 'actions' )
        .where( 'id' , id )
        .del();
};