let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

let generateLocationMessage = (from, data) => {
    data.isLocation = true;
    return {
        from,
        data,
        createdAt: new Date().getTime()
    }
}

module.exports = { generateMessage, generateLocationMessage };