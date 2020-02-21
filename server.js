const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);//on .env

const app = express();//express: API to build a server easily
const port = process.env.PORT || 5000;//client on 3000

app.use(compression());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(cors());//Cross Origin resource sharing. So we can use resources on different domains or ports

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res){
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if(error) throw error;
    console.log('Server running on port ' + port);
});

app.get('/service-worker.js', (req,res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

//Route. Request comes from stripe-button.component on client
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: req.body.currency //EUR
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).send({ error: stripeErr });
        }else{
            res.status(200).send({ success: stripeRes });
        }
    });
});