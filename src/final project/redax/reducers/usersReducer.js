const inititialState = [{ email: "c@gmail.com", password: "0556721941" },{email: "h@gmail.com", password: "0504254269" }];

export const usersReducer = (state = inititialState, action) => {
    switch (action.type) {
        case "PUSHNEWUSER": {
            inititialState.push(action.payload);
            return inititialState;
        }
        case "UPDATEUSER": {
            debugger
            let user = {email: action.payload.email,password: action.payload.password};
            let updateUser = {email: action.payload.newEmail,password: action.payload.newPassword};
            let index = inititialState.findIndex(u => u.email == user.email && u.password == user.password);
            inititialState[index] = updateUser;
            return inititialState;
        }
        
    }
    return state;
}