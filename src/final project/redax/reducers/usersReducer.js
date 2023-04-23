var inititialState = null;

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            debugger
            inititialState = action.payload;
            console.log(inititialState);
            return inititialState;
        }
        case "UPDATEUSER": {
            debugger
            inititialState = action.payload;
            return inititialState;
        }
        
    }
    return state;
}