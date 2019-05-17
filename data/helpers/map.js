//EXPORTS
module.exports = {
    integerToBoolean,
    booleanToInteger,
    toggleProject,
    toggleAction
}

//INITIATE NUMBER TO TRUE OR FALSE ( FUNCTION )
function integerToBoolean ( integer ) {
    return integer === 1 ? true : false;
};

//INITIATE TRUE OR FALSE TO NUMBER ( FUNCTION )
function booleanToInteger ( boolean ) {
    return boolean === true ? 1 : 0;
};

//TOGGLE PROJECT COMPLETED ( FUNCTION )
function toggleProject ( project ) {
    const result = {
        ...project,
        projectCompleted: integerToBoolean( project.projectCompleted )
    };

    if ( project.actions ) {
        result.actions = project.actions.map( action => ({
            ...action,
            actionCompleted: integerToBoolean( action.actionCompleted )
        }));
    }

    return result;

};

//TOGGLE ACTION COMPLETED ( FUNCTION )
function toggleAction ( action ) {
    return {
        ...action,
        actionCompleted: integerToBoolean( action.actionCompleted )
    };
};