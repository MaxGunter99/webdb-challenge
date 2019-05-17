//PROJECT TABLE SETUP
exports.up = function( knex, Promise ) {
    return knex.schema.createTable( 'projects' , tbl => {
        tbl.increments();
        tbl.string( 'projectName' ).notNullable();
        tbl.string( 'projectDescription' ).notNullable();
        tbl.boolean( 'projectCompleted' ).defaultTo( false );
    });
};

//ELSE
exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( 'projects' );
};
