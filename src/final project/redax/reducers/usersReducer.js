const inititialState = null;

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            inititialState = action.payload;
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