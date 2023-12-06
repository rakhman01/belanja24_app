import {API, API2} from './API';

export const getBannerHero = async callback => {
  await API2.get('/se-engine/feed/banner?attr=HERO')
    .then(store => callback(store))
    .catch(err => console.log(err));
};

export const getPopularProduct = async (slug, callback) => {
  await API2.get('se-engine/feed/product/popular?', {
    params: {provider_type: 'ECOMMERCE', preference_city: slug},
  })
    .then(product => {
      callback(product);
    })
    .catch(err => console.log(err));
};
export const getPopularStore = async (slug, callback) => {
  await API.get('/guest-sys/fade/featured-provider', {
    params: {
      provider_type: 'ECOMMERCE,ECOMMERCE_RESELLER',
      preference_city: slug,
    },
  })
    .then(store => callback(store))
    .catch(err => console.log(err));
};

export const getDetailStore = async (token = '', slug, callback) => {
  await API.get(`guest-sys/fade/provider-detail?provider_id=${slug}`, {
    headers: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then(store => callback(store))
    .catch(err => console.log(err));
};

export const getCategories = async (token = '', callback) => {
  await API.get('/accessible/data-master/categories?tail=no', {
    params: {provider_type: 'ECOMMERCE'},
    headers: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
    .then(store => callback(store))
    .catch(err => console.log(err));
};

export const getMostLikeProduct = async (
  token = '',
  load = '',
  slug,
  callback,
) => {
  await API2.get('/se-engine/feed/product/browse?', {
    params: {
      pointer: load,
      provider_type: 'ECOMMERCE,ECOMMERCE_RESELLER',
      preference_city: slug,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(store => {
      callback(store);
    })
    .catch(err => console.log(err));
};

export const getProvinces = async callback => {
  await API.get(`/accessible/data-master/provinces`)
    .then(detail => callback(detail))
    .catch(err => console.log(err));
};

export const getCity = async (token = '', load = '', callback) => {
  await API.get(`/accessible/data-master/cities?province=${load}`, {
    params: {pointer: load, provider_type: 'ECOMMERCE'},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(store => {
      callback(store);
    })
    .catch(err => console.log(err));
};

export const getDataPopular = async callback => {
  try {
    const response = await API2.get(`/se-engine/feed/categories/popular`);
    callback(response.data.data); // Call the callback with the data
  } catch (error) {
    callback([]);
  }
};

export const getDetailProduct = async (token = '', slug, callback) => {
  await API.get(`/guest-sys/fade/detail-product/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(detail => callback(detail))
    .catch(err => console.log(err));
};

export const getDetailProductStore = async (
  token = '',
  slug,
  page,
  callback,
) => {
  await API2.get(
    `/se-engine/proxy-search-product?attr=provider.id,tags&search=${slug}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
    .then(detail => callback(detail))
    .catch(err => console.log(err));
};

export const getRelatedProduct = async (token = '', product_id, callback) => {
  await API.get(`/guest-sys/fade/related-product`, {
    params: {product_id},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(related => callback(related))
    .catch(err => console.log(err));
};

export const validate = async callback => {
  await API.get(`/token/validate`)
    .then(validate => callback(validate))
    .catch(err => console.log(err));
};
export const getProfile = async (token = '', callback) => {
  await API.get(`/customer-sys/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(profile => callback(profile.data.data))
    .catch(err => console.log(err));
};
export const getDataCart = async (token = '', callback) => {
  await API.get(`/customer-sys/buy-process/cart/index`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(profile => callback(profile.data.data))
    .catch(err => console.log(err));
};
export const getEstablished = async (token = '', callback) => {
  await API2.get(`/chat-engine/cs/connection/established`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(profile => callback(profile.data.data))
    .catch(err => console.log(err));
};

export const getConection = async (token = '', id, callback) => {
  await API2.get(`chat-engine/cs/connection?seller_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getMessage = async (token = '', data, callback) => {
  await API2.get(
    `chat-engine/cs/messages?connection_id=${data.id}&pointer_type=next&pointer=${data.pointer_id}`,
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

export const getPaymentMethod = async (token = '', callback) => {
  await API.get(`/customer-sys/data-master/payment-methods`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(data => callback(data))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getAddress = async (token = '', callback) => {
  await API.get(`/customer-sys/profile/address`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: true, data: res.data.data}))
    .catch(err => console.log(err));
};
export const getAddresShipping = async (token = '', callback) => {
  await API.get(`/customer-sys/profile/address`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback(res.data.data))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};
export const InvoiceGenerate = async (token = '', chain_id, callback) => {
  await API.get(`/customer-sys/transaction/invoice/${chain_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => {
      callback(val.data.data);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const InvoiceTranGenerate = async (token = '', id, callback) => {
  await API.get(`/customer-sys/transaction/invoice-tran/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(val => {
      callback(val.data.data);
    })
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getWaitingPayment = async (token = '', callback) => {
  await API.get(`customer-sys/transaction/wait-payment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: false, data: res.data.data}))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};
export const getHistoryTransaction = async (token = '', callback) => {
  await API.get(`customer-sys/transaction/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: false, data: res.data.data}))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getDetailTransaction = async (token = '', id, callback) => {
  await API.get(`customer-sys/transaction/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: false, data: res.data.data}))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getHistoryShipping = async (token = '', id, callback) => {
  await API.get(`customer-sys/order/shipping-history/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback({status: false, data: res.data.data}))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const searchQueryProduct = async (token = '', query, callback) => {
  try {
    const results = await API2.get(
      `/se-engine/proxy-search-product?attr=title,categories,tags&search=${query}&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    // console.log(results, query);
    callback({status: true, data: results.data.hits});
  } catch (error) {
    callback({status: false, data: []});
  }
};
export const getSummaryReview = async (token = '', slug, callback) => {
  await API.get(`guest-sys/fade/summary-review/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback(res))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getReview = async (token = '', id, callback) => {
  await API.get(`guest-sys/fade/review/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback(res))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};

export const getPlaza = async (token = '', callback) => {
  await API.get(`guest-sys/fade/featured-plaza`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => callback(res))
    .catch(err => {
      console.log(err);
      callback(false);
    });
};
