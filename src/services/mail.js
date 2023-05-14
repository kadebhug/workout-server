var nodemailer = require('nodemailer');
const Handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

exports.sendMail = async ({fileName, emailTo, subject, data}) => {
    console.log("DATA: ", data);
    
    // get email template
    let finalTemplate = Handlebars.compile(getHTMLFile("layout"));
    let source = getHTMLFile(fileName);
    const template = Handlebars.compile(source);
    let html = template(data);
    let finalHtml = finalTemplate({ data: data, body: html, title: subject });

    // send email
    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });

    var mailOptions = {
        headers: {
            "x-origin-system": "workout-app"
        },
        from: process.env.MAIL_FROM,
        to: emailTo,
        subject: subject,
        html: finalHtml
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

function getHTMLFile(filename){
    const filePath = path.join(__dirname, '../views/mails/' + filename + '.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    return source;
}

