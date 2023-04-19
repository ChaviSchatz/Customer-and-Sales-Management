const inititialState = [{ email: "c@gmail.com", password: "0556721941" },{email: "h@gmail.com", password: "0504254269" }];

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            inititialState.push(action.payload);
            return inititialState;
        }
        
    }
    return state;
}