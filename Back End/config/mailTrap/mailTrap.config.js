const { MailtrapClient } = require("mailtrap");

const TOKEN = process.env.MAILTRAP_TOKEN;

const mailtrapClient = new MailtrapClient({
    token: TOKEN,
});

const sender = {
    email: "hello@demomailtrap.com",
    name: "Mailtrap Test",
};

module.exports = { mailtrapClient, sender };
