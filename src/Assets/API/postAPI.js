import {API, API2} from './API';

export const inquiryBasic = async callback => {
  await API.post('/login/inquiry-basic', {role: 'USER'})
    .then(response => {
      callback(response);
    })
    .catch(err => console.log(err));
};

export const ForgotPassword = async (data, callback) => {
  try {
    await API.post('/forgot/email-check', data)
      .then(res => {
        callback({
          status: true,
          data: res.data,
        });
      })
      .catch(error => {
        callback({
          status: false,
          data: error.message,
        });
      });
  } catch (error) {
    callback({
      status: false,
      data: error.message,
    });
  }
};

export const VerificationOtp = async (data, callback) => {
  try {
    const response = await API.post(`/forgot/otp-verify`, data);
    callback(response.data);
  } catch (error) {
    callback(error);
  }
};
export const RessetPassword = async (data, callback) => {
  try {
    const response = await API.post(`/forgot/password-submit`, data);
    callback(response.data);
  } catch (error) {
    callback(error);
  }
};

export const UpdateProfile = async (token = '', data, callback) => {
  await API.post('/customer-sys/profile', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(update => {
      callback({status: true, response: update});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.message});
    });
};

export const addToCart = async (data, callback) => {
  await API.post('/customer-sys/buy-process/cart/add', data)
    .then(response => {
      callback(response);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const removeToCart = async (token = '', data, callback) => {
  await API.post('/customer-sys/buy-process/cart/delete', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      callback(response);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};
export const beliSekarang = async (data, callback) => {
  await API.post(
    '/customer-sys/buy-process/shipping-confirm-inquiry',
    data,
    callback,
  )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      callback(err);
    });
};
export const getCheckout = async (token = '', callback) => {
  await API.post(
    '/customer-sys/buy-process/shipping-confirm-products',
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(response => {
      callback(response);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const postMessage = async (token, data, callback) => {
  await API2.post('/chat-engine/cs/messages/sent', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      callback(response);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

/////AUTHENTICATION///////////

export const loginBasic = async (data, callback) => {
  await API.post('/login/basic', data)
    .then(response => {
      callback({status: true, response: response.data.data});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.message});
    });
};

export const RegisterBasic = async (data, callback) => {
  await API.post('/register/basic', data)
    .then(regist => {
      callback({status: true, response: regist.data});
    })
    .catch(err => {
      callback({status: false, response: err.response.data.data});
    });
};

export const postPostalCode = async (params, data) => {
  await API.post('accessible/data-master/address-by-postal', params)
    .then(res => {
      if (res.data.message === 'Approved') {
        data(res.data.data);
      }
    })
    .catch(err => console.log(err, 'error'));
};

export const postAddress = async (token = '', params, address) => {
  await API.post('customer-sys/profile/address', params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (res.data.message === 'Approved') {
        address({status: false, data: []});
      }
    })
    .catch(err => console.log(err, 'error'));
};
export const CheckShipping = async (token = '', data, callback) => {
  await API.post(
    '/customer-sys/buy-process/shipping-confirm-check-price',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(res => callback(res))
    .catch(err => {
      console.log(err);
      callback(err);
    });
};

export const deleteAddress = async (token = '', params, data) => {
  await API.delete(`customer-sys/profile/address/${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      data({data: [], status: false});
    })
    .catch(err => console.log(err, 'error'));
};

export const setPrimaryAddress = async (token = '', params, data) => {
  await API.post(
    `/customer-sys/profile/address/${params}/set-primary`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(val => data({data: [], status: false}))
    .catch(err => console.log(err));
};

export const gotoPayment = async (token = '', data, callback) => {
  await API.post(`/customer-sys/buy-process/submit`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const uploadProofOfPayment = async (token = '', data, callback) => {
  await API.post(`/customer-sys/payments`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err, 'val'));
};

export const getPaymentChain = async (token = '', data, callback) => {
  await API.post(`/customer-sys/transaction/bill-detail`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val))
    .catch(err => console.log(err));
};

export const postReview = async (token = '', data, callback) => {
  await API.post(`/customer-sys/order/review`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val.data))
    .catch(err => console.log(err));
};

export const postCityPreferenc = async (token = '', data, callback) => {
  await API.post(`/customer-sys/profile/city-preference`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => callback(val.data.data))
    .catch(err => console.log(err));
};
