const inititialState = [{ email: "chavi@gmail.com", password: "0548450195" }];

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            inititialState.push(action.payload);
            return inititialState;
        }
        
    }
    return state;
}