//ACTIONS TABLE SETUP
exports.up = function(knex, Promise) {
    return knex.schema.createTable( 'actions' , tbl => {
        tbl.increments();
        tbl.string( 'actionDescription' ).notNullable();
        tbl.string( 'notes' );
        tbl.boolean( 'actionCompleted' ).defaultTo( false );
        tbl.integer( 'projectId' ).unsigned();
        tbl.foreign( 'projectId' ).references( 'id' ).on( 'projects' );
    });
};

//ELSE
exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( 'actions' );
};