## Online Payment
is a demo or example project on how to integrate a payment gateway in a web application. <br>
This uses [Paystack](https://paystack.com/) as it's payment gateway.<br>
No real transaction is made. It is just an example project.

___


## Technologies
Online Payment was developed with JavaScript (ES6), Node.js using [Express 4](http://expressjs.com/). <br/>
with [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [EJS](https://ejs.co/)  

___


## API Information
API endpoints URL - http://localhost:3000/

|METHOD  |DESCRIPTION                     |ENDPOINT           |
|------- |------------------------------- |-------------------|
|GET     |Get home page                   |                   |
|GET     |GET Donation form               |pay                |
|POST    |POST Donation form              |paystack/pay       |
|GET     |Only loads when error occurs    |error              |
|GET     |Get a Donor specific data       |receipt/:donorId   |
|GET     |Get Paystack callback url       |paystack/callback  |


___


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) 12.14.1 installed and [POSTMAN](https://www.getpostman.com/downloads/).

```sh
git clone https://github.com/emma50/online_payment.git
cd online_payment
npm install
npm start
```

Online Payment should now be running on [localhost:3000](http://localhost:3000/).

___

## Author
### Okwuidegbe Emmanuel Ikechukwu