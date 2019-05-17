/*  

<-|---===({[  SERVER GUIDE  ]})===---|->


-=({[ HOMEPAGE ]})=-

----=( http://localhost:4444/ )=-
        - Home Page Sanity Check, returns { message: Its Alive! } -
_______|


-=({[ PROJECTS ]})=-

----=( http://localhost:4444/api/projects )=->
        - List of all Projects -
            -> Functions:
                - ADD PROJECT -
                    `-> Format: { "projectName": "Name", "projectDescription": "Description" }
        ____|
_______|

----=( http://localhost:4444/api/projects/1 )=->
        - Lists individual projects -
        - also Shows included actions attatched to the selected Project ID -
            -> Functions:
                - UPDATE PROJECT -
                    `-> Format:  { "projectName": "Name", "projectDescription": "Description" }
                - DELETE PROJECT -
        ____|
_______|

-=({[ ACTIONS ]})=-

----=( http://localhost:4444/api/actions )=->
        - List of add Actions -
            -> Functions:
                - ADD ACTION -
                    `-> Format: { "actionDescription": "Description", "notes": "note", "projectId": ex: 1 }
        ____|
_______|

----=( http://localhost:4444/api/actions/3 )=->
        - List of individual Actions -
            -> Functions:
                - UPDATE ACTION -
                    `-> Format: { "actionDescription": "Description", "notes": "note", "projectId": ex: 1 }
                - DELETE ACTION - 
        ____|
_______|

*/




//IMPORTS
const server = require( './api/server.js' );

//SERVER SETUP
const port = process.env.PORT || 4444;
server.listen( port , () => console.log( `\nAPI UP ON PORT ${port}\n` ));