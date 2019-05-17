//IMPORTS
const db = require( '../dbConfig' );
const map = require( './map' );

//EXPORTS
module.exports = {
    get,
    getActions,
    insert,
    update,
    remove
};

//GETTING ALL PROJECTS ( FUNCTION )
function get( id ) {
    let query = db( 'projects AS p' );
    if ( id ) {
        query.where( 'p.id' , id ).first();
        const promise = [ query, this.getActions( id ) ];
        return Promise.all( promise ).then( function( results ) {
            let [ project , actions ] = results;
            project.actions = actions;
            return map.toggleProject( project );
        })
    }
    return query.then( projects => {
        return projects.map( project => map.toggleProject( project ));
    });
};

//GETTING PROJECTS ACTIONS ( FUNCTION )
function getActions( projectId ) {
    return db( 'actions' )
        .where( 'projectId' , projectId )
        .then( actions => actions.map( action => map.toggleAction( action )));
};

//ADDING PROJECTS ( FUNCTION )
function insert( project ) {
    return db( 'projects' )
        .insert( project )
        .then(([ id ]) => this.get( id ));
};

//UPDATING PROJECT ( FUNCTION )
function update( id , changes ) {
    return db( 'projects' )
        .where( 'id' , id )
        .update( changes )
        .then( count => ( count > 0 ? this.get( id ) : null ));
};

//DELETE A PROJECT ( FUNCTION )
function remove( id ) {
    return db( 'projects' )
        .where( 'id' , id )
        .del();
};