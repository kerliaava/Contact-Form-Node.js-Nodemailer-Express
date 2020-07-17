//1. we bring in the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //to handle file path- built in module
const nodemailer = require('nodemailer');


//2. we initialize our app variables

const app = express();


//6. use public folder - static folder

app.use('/public', express.static(path.join(__dirname, 'public'))); //dirname represents current directory

//5. adding body parser Middlewear
//body-parser extract the entire body portion of an incoming request stream and exposes it on req. body . The middleware was a part of Express. js earlier but now you have to install it separately.
// go to https://github.com/expressjs/body-parser

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())


//3. we create a route - A route is a section of Express code that associates an HTTP verb ( GET , POST , PUT , DELETE , etc.)


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); //kontrolli
});


//7. creating a post route for submission

app.post('/mail', (req, res) => {
    const output = `
    <p> you have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p> ${req.body.message}</p>`;

    //8.nodemailer - go to the nodemailer homepage and copy the code from thee
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.ee',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@kerliaava.com', // generated ethereal user
            pass: '' // generated ethereal password
        }
        // ,
        // tls: {
        //     rejectUnauthorized: false
        // } //for localhost
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <info@kerliaava.com>', // sender address
        to: 'kerliaava@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {
            msg: 'Email has been sent'
        });
    });
});


//4. to listen to a port

//a callback, also known as a "call-after" function, is any executable code that is passed as an argument to other code

app.listen(3000, () => console.log('server started'));
