const inititialState = [{ email: "c@gmail.com", password: "55" }];

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            inititialState.push(action.payload);
            return inititialState;
        }
        
    }
    return state;
}