
export const pushNewUser = (email, password) => {
    return{
        type: "PUSHNEWUSER",
        payload: {email, password}
    };
}

export const updateUser = (email, password, newEmail, newPassword) => {
    return{
        type: "UPDATEUSER",
        payload: {email, password, newEmail, newPassword}
    };
}

