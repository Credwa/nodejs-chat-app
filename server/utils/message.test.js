let expect = require('expect');

let { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('Should create a new message object', () => {
        let from = 'Jen',
            text = 'Some Message',
            message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, text });
    });
});