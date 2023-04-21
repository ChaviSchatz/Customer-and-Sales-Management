
export const pushNewUser = (user) => {
    return{
        type: "PUSHNEWUSER",
        payload: {user}
    };
}

export const updateUser = (user) => {
    return{
        type: "UPDATEUSER",
        payload: {user}
    };
}

