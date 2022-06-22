export const login = (userName,password, token, expirationDate) => {

    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);

    localStorage.setItem(
        'userData',
        JSON.stringify({
            userName,
            password,
            token,
            expiration: tokenExpirationDate.toISOString(),
        })
    );

    return tokenExpirationDate;
};