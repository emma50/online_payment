import request from "request"
import dotenv from 'dotenv';

dotenv.config();

//sk_test_xxxx to be replaced by your own secret key/
const MySecretKey = `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`;

const paystack = {
  // POST REQUEST
  async initializePayment(form, mycallback) {
    const options = {
      form,
      url : 'https://api.paystack.co/transaction/initialize',
      headers : {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      }
    }

    const callback = (error, response, body)=>{
      return mycallback(error, body);
    }

    return request.post(options, callback);
  },

  // GET REQUEST
  async verifyPayment(ref, mycallback) {
    const options = {
      url : 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
      headers : {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache'
      }
    }

    const callback = (error, response, body) => {
      return mycallback(error, body);
    }

    return request(options, callback);
  }
}

export default paystack