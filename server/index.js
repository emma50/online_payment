import express from 'express';
import bodyParser from 'body-parser';
// import ejs from 'ejs';
import _ from 'lodash';
import Donor from './models/models';
import paystack from './config/paystack';

const { initializePayment, verifyPayment } = paystack;
const port = process.env.PORT || 3000;
const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.render('index'));

app.get('/pay', (req, res) => res.render('pay'));

app.get('/error', (req, res) => res.render('error'));

app.get('/receipt/:donorId', (req, res) => {
  const requestedDonorId = req.params.donorId;

  Donor.findOne({ _id: requestedDonorId }, (err, result) => {
    if (!err) {
      if (!result) {
        console.log('This data is not available');
      } else {
        res.render('user', { fullName: result.fullName, amount: result.amount });
      }
    }
  });
});

app.post('/paystack/pay', async (req, res) => {
  const form = _.pick(req.body, ['amount', 'email', 'fullName']);
  form.metadata = {
    fullName: form.fullName,
  };
  // convert amount to kobo
  form.amount *= 100;

  await initializePayment(form, (error, body) => {
    if (error) res.redirect('/error');

    const response = JSON.parse(body);
    res.redirect(response.data.authorization_url);
  });
});

app.get('/paystack/callback', async (req, res) => {
  const ref = req.query.reference;

  await verifyPayment(ref, (error, body) => {
    if (error) res.redirect('/error');

    const response = JSON.parse(body);
    const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.fullName']);
    const newDonor = {
      reference: data[0],
      amount: data[1],
      email: data[2],
      fullName: data[3],
    };
    const donor = new Donor(newDonor);

    donor.save().then((result) => {
      const { _id } = result;
      res.redirect(`/receipt/${_id}`);
    }).catch((e) => {
      console.log(e);
      res.redirect('/error');
    });
  });
});

process.on('unhandledRejection', (e) => {
  console.log(e);
  console.log('An unhandled error occurred');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
