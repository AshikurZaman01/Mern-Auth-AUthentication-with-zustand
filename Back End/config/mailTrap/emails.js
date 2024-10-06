const { mailtrapClient, sender } = require('./mailTrap.config');
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require('./emailTemplates');

const sendVerificationEmail = async (email, varificationToken) => {

    const recipientEmail = process.env.TEST_EMAIL

    const recipient = [{ email: recipientEmail }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{varificationCode}', varificationToken),
            category: 'Email Verification'
        });

        console.log("Mail Sent Successfully ", response);
    } catch (error) {
        console.log("Error in sending mail ", error);
        throw new Error(`Error in sending mail : ${error.message}`);
    }
};

const sendWelcomeEmail = async (email, name) => {

    const recipientEmail = process.env.TEST_EMAIL
    const recipient = [{ email: recipientEmail }];

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "9b5ef932-ef84-4d61-9972-c6c271e51af5",
            template_variables: {
                "company_info_name": "User Auth App",
                "name": name,
                "company_info_address": "Fulbari-Gate , Khulna",
                "company_info_city": "Khulna",
                "company_info_zip_code": "9203",
                "company_info_country": "Bangladesh"
            }
        })

        console.log("Mail Sent Successfully ", response);

    } catch (error) {
        console.log("Error in sending mail ", error);
        throw new Error(`Error in sending mail : ${error.message}`);
    }

}

const sendResetPasswordEmail = async (email, resetURL) => {

    const recipientEmail = process.env.TEST_EMAIL
    const recipient = [{ email: recipientEmail }];

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "password-reset"
        })

        console.log("Mail Sent Successfully ", response);


    } catch (error) {
        console.log("Error in sending mail ", error);
        throw new Error(`Error in sending Password Reset mail : ${error.message}`);
    }

}

const sendResetPasswordSuccessEmail = async (email) => {

    const recipientEmail = process.env.TEST_EMAIL
    const recipient = [{ email: recipientEmail }];

    try {

        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "password-reset-success"
        })

        console.log("Mail Sent Successfully ", response);

    } catch (error) {
        console.log("Error in sending mail ", error.message);
        throw new Error(`Error in sending Password Reset mail : ${error.message}`);
    }

}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordSuccessEmail, sendResetPasswordEmail };
