const inititialState = [{email: "chavi@gmail.com",password:"0548450195"}]
export const usersReducer = (state = inititialState, action) =>{
    switch(action.type){
        case ("GETUSERSDETAILS"):{
            return inititialState[action.payload]
            }
            // return inititialState;
        }
        // case ("ADDQTY"):{
        //     inititialState.forEach(e => {
        //         const g = e.find(s => s.id == action.payload)
        //         if(g !== undefined){
        //             g.qty += 1
        //         }
        //         });
        //     return inititialState;
        // }
    }
    return state;
}