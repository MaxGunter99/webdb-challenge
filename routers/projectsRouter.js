//IMPORTS
const express = require( 'express' );
const router = express.Router();
const projects = require( '../data/helpers/projectModel' );

//GET ALL PROJECTS
router.get( '/' , ( req , res ) => {
    projects.get()
    .then( project => {
        res.status( 200 ).json( project );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting all Projects' , error });
    })
});

//GET INDIVIDUAL PROJECTS
router.get( '/:id' , ( req , res ) => {
    const { id } = req.params;
    projects.get( id )
    .then( project => {
        res.status( 200 ).json( project );
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting individual Project' , error })
    })
});

//GET PROJECTS ACTIONS
router.get( '/:id/actions' , ( req , res ) => {
    const { id } = req.params;
    projects.getActions( id )
    .then( actions => {
        if ( actions ) {
            res.status( 200 ).json( actions );
        } else {
            res.status( 404 ).json({ message: 'There are no actions for this Project yet' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error getting Actions' , error });
    })
});

//ADD PROJECT
router.post( '/' , ( req , res ) => {
    const project = req.body;
    if ( project.projectName && project.projectDescription ) {
        if ( project.projectName.length < 128 ) {
            projects.insert( project )
            .then( newProject => {
                res.status( 201 ).json( newProject );
            })
            .catch( error => {
                res.status( 500 ).json({ message: 'Server error adding Project' , error });
            })
        } else {
            res.status( 405 ).json({ message: 'Project name is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 406 ).json({ message: 'Project name or Description field is empty' });
    }
});

//UPDATE PROJECT
router.put( '/:id' , ( req , res ) => {
    const { id } = req.params;
    const project = req.body;
    if ( project.projectName && project.projectDescription ) {
        if ( project.projectName.length < 128 ) {
            projects.update( id , project )
            .then( updatedProject => {
                res.status( 200 ).json( updatedProject );
            })
            .catch( error => {
                res.status( 404 ).json({ message: 'Project not found' , error });
            })
        } else {
            res.status( 405 ).json({ message: 'Project name is longer than 128 characters ( unacceptable )' });
        }
    } else {
        res.status( 400 ).json({ message: 'Project name & or Description is the same as current name or description' });
    }
});

//DELETE PROJECT
router.delete( '/:id' , ( req, res ) => {
    const { id } = req.params;
    projects.remove( id )
    .then( count => {
        if ( count ) {
            res.status( 200 ).json({ message: 'Project successfully Deleted' , count });
        } else {
            res.status( 404 ).json({ message: 'Can not find Project to Delete' });
        }
    })
    .catch( error => {
        res.status( 500 ).json({ message: 'Server error deleting Project' });
    })
});

module.exports = router;