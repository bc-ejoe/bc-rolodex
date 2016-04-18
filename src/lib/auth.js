module.exports = (user, token) => {
    return new Buffer(`${user}:${token}`).toString('base64');
};
