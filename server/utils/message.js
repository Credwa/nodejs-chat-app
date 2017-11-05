const Moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: Moment().valueOf()
    };
};
module.exports = { generateMessage };