
export const pushNewUser = (email, password) => {
    return{
        type: "PUSHNEWUSER",
        payload: {email, password}
    };
}

