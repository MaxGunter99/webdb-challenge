//IMPORTS
const express = require( 'express' );
const router = express.Router();
const actions = require( '../data/helpers/actionModel' );
const projects = require( '../data/helpers/projectModel' );

//GET ALL ACTIONS
router.get( '/' , ( req , res ) => {
    actions.get()
    .then( actions => {
        res.status( 200 ).json( actions );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting all Actions' , error })
    })
});

//GET INDIVIDUAL ACTIONS
router.get( '/:id' , ( req , res ) => {
    const { id } = req.params;
    actions.get( id )
    .then( action => {
        res.status( 200 ).json( action )
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting individual Action' , error })
    })
});

//ADD A ACTION
router.post( '/' , ( req , res ) => {
    const action = req.body;
    projects.get( action.projectId )
    .then( project => {
        if ( action.actionDescription.length < 128 ) {
            if ( action.actionDescription && action.notes ) {
                actions.insert( action )
                    .then( newAction => {
                        res.status( 201 ).json( newAction )
                    })
            } else {
                res.status( 406 ).json({ message: 'Description or Notes field is empty' });
            }
        } else {
            res.status( 405 ).json({ message: 'Description is longer than 128 characters ( unacceptable )' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error creating action', error });
    })
});

//UPDATE ACTION
router.put( '/:id' , ( req , res ) => {
    const { id } = req.params;
    const action = req.body;
    if ( action.actionDescription && action.notes ) {
        if ( action.actionDescription.length < 128 ) {
            actions.update( id, action )
                .then( updatedAction => {
                    res.status( 200 ).json({ message: 'Action sucessfully updated' , updatedAction });
                })
                .catch( error => {
                    res.status( 404 ).json({ message: 'Action not found' , error });
                })
        } else {
            res.status( 405 ).json({ message: 'Updated Desctiption is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 406 ).json({ message: 'Description or Notes field is empty' });
    }
});

//DELETE ACTION
router.delete( '/:id' , ( req , res ) => {
    const { id } = req.params;
    actions.remove( id )
    .then( action => {
        if ( action ) {
            res.status( 200 ).json({ message: 'Action sucessfully deleted:', action });
        } else {
            res.status( 404 ).json({ message: 'Can not find Action to delete' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error deleting Action' });
    })
});

module.exports = router;