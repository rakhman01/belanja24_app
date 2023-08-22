import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  getDetailTransaction,
  getHistoryShipping,
  getHistoryTransaction,
  getWaitingPayment,
  InvoiceGenerate,
  InvoiceTranGenerate,
} from '../Assets/API/getAPI';
import {
  adjust,
  blueB2C,
  formatter,
  Gray,
  GrayMedium,
  HeightScreen,
  WidthScreen,
} from '../Assets/utils';
import ModalComponent from '../Component/ModalComponent';
import EmptyFolder from 'react-native-vector-icons/FontAwesome';
import PrintIcon from 'react-native-vector-icons/Ionicons';
import ShippingIcon from 'react-native-vector-icons/MaterialIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ReviewFrom from '../Component/ReviewFrom';

const ScreenTransaction = ({navigation}) => {
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const isFocus = useIsFocused();
  const [page, setPage] = useState('waitingPayment');
  const [modalVisible, setModalVisible] = useState(false);
  const [dataPayment, setdataPayment] = useState({status: true, data: []});
  const [dataHistory, setDataHistory] = useState({status: true, data: []});
  const [invoice, setInvoice] = useState({status: true, data: []});
  const [detailTransaction, setDetailTransaction] = useState({
    status: true,
    data: {},
  });
  const [historyShipping, setHistoryShipping] = useState({
    status: true,
    data: [],
  });

  useEffect(() => {
    getWaitingPayment(isToken, setdataPayment);

    getHistoryTransaction(isToken, setDataHistory);
  }, [isFocus]);

  const createPDF = async ({token, chain_id}) => {
    await InvoiceGenerate(token, chain_id, async res => {
      const data = res.results[0];

      let options = {
        html: `
        <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Coconmpatible" content="ie=edge" />
      <title>Static Template</title>
    </head>
    <body>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 11pt
        "
      >
        <div>
          <div>
            <img
            style="width: 15%; background-size: contain;"
            src="https://shellrean.sgp1.cdn.digitaloceanspaces.com/belanja24.com/public/manual/logo%20belanja24%20b2c%20(1)%20(1).png"
            />
            <p>Belanja 24.com</p>
            <p>Nomor Invoice : ${data.transaction.invoice_number}</p>
          </div>
          <div style="margin-top: 30px">
            <p style="font-weight: 900;">Diterbitkan atas nama</p>
            <p>Penjual : ${data.transaction.provider_name}</p>
            <p>Tanggal : ${data.transaction.date}</p>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; align-items: flex-end;"
        >
          <p>Tujuan Pengiriman</p>
          <p style="font-weight: 900;">${data.shipping.recipient_name}</p>
          <p style="text-align: right">
          ${data.shipping.shipping_address}
          </p>
          <p style="text-align: right">${
            data.shipping.shipping_district
          } </br> ${data.shipping.shipping_city}</br>${
          data.shipping.shipping_province
        } </br>55552</p>
        </div>
      </div>
      <table style="width: 100%">
          <tr >
            <th style="border: 1px solid black;" >Nama Product</th>
            <th style="border: 1px solid black;">Jumlah</th>
            <th style="border: 1px solid black;">Harga Barang</th>
            <th style="border: 1px solid black;">Sub Total</th>
          </tr>
  ${data.items.map(val => {
    return `
  <tr  >
  <td style="border: 1px solid black;">${val.title}
    </td>
  <td style="border: 1px solid black;">${val.qty}</td>
  <td style="border: 1px solid black;">${formatter(val.price)}</td>
  <td style="border: 1px solid black;">${formatter(val.total_price)}</td>
  </tr>
  `;
  })}
          <tr  >
            <td colspan="3" style="border: 1px solid black;">
              SubTotal Harga Product
              </td>
            <td style="border: 1px solid black;">${formatter(
              data.transaction.base_price,
            )}</td>
          </tr>
  
        </table>
            <div style="margin-top: 30px;display: flex;justify-content: end">
                <table style="width: 50%">
                    <tr >
                      <th style="border: 1px solid black;" >Pajak</th>
                      <th style="border: 1px solid black;">Harga Sudah Termasuk Pajak</th>
                    </tr>
                    ${data.items.map(val => {
                      return `
                      <tr  >
                        <td style="border: 1px solid black;">${val.title}</td>
                        <td style="border: 1px solid black;">${formatter(
                          val.total_price,
                        )}</td>
                      </tr>
                        `;
                    })}
                    <tr  >
                      <td style="border: 1px solid black;">Total Pembayaran</td>
                      <td style="border: 1px solid black;">${formatter(
                        data.transaction.final_price,
                      )}</td>
                    </tr>
                  </table>
            </div>
    </body>
  </html>
        `,
        fileName: `Invoice_Belanja24_${new Date().getTime()}`,
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      alert(file.filePath);
    });
  };

  const createTranPDF = async ({token, id}) => {
    await InvoiceTranGenerate(token, id, async res => {
      const data = res;
      console.log(res, 'response');
      let options = {
        html: `
        <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Coconmpatible" content="ie=edge" />
      <title>Static Template</title>
    </head>
    <body>
      <div
        style="
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 11pt
        "
      >
        <div>
          <div>
            <img
            style="width: 15%; background-size: contain;"
            src="https://shellrean.sgp1.cdn.digitaloceanspaces.com/belanja24.com/public/manual/logo%20belanja24%20b2c%20(1)%20(1).png"
            />
            <p>Belanja 24.com</p>
            <p>Nomor Invoice : ${data.transaction.invoice_number}</p>
          </div>
          <div style="margin-top: 30px">
            <p style="font-weight: 900;">Diterbitkan atas nama</p>
            <p>Penjual : ${data.transaction.provider_name}</p>
            <p>Tanggal : ${data.transaction.date}</p>
          </div>
        </div>
        <div
          style="display: flex; flex-direction: column; align-items: flex-end;"
        >
          <p>Tujuan Pengiriman</p>
          <p style="font-weight: 900;">${data.shipping.recipient_name}</p>
          <p style="text-align: right">
          ${data.shipping.shipping_address}
          </p>
          <p style="text-align: right">${
            data.shipping.shipping_district
          } </br> ${data.shipping.shipping_city}</br>${
          data.shipping.shipping_province
        } </br>55552</p>
        </div>
      </div>
      <table style="width: 100%">
          <tr >
            <th style="border: 1px solid black;" >Nama Product</th>
            <th style="border: 1px solid black;">Jumlah</th>
            <th style="border: 1px solid black;">Harga Barang</th>
            <th style="border: 1px solid black;">Sub Total</th>
          </tr>
  ${data.items.map(val => {
    return `
  <tr  >
  <td style="border: 1px solid black;">${val.title}
    </td>
  <td style="border: 1px solid black;">${val.qty}</td>
  <td style="border: 1px solid black;">${formatter(val.price)}</td>
  <td style="border: 1px solid black;">${formatter(val.total_price)}</td>
  </tr>
  `;
  })}
          <tr  >
            <td colspan="3" style="border: 1px solid black;">
              SubTotal Harga Product
              </td>
            <td style="border: 1px solid black;">${formatter(
              data.transaction.base_price,
            )}</td>
          </tr>
  
        </table>
            <div style="margin-top: 30px;display: flex;justify-content: end">
                <table style="width: 50%">
                    <tr >
                      <th style="border: 1px solid black;" >Pajak</th>
                      <th style="border: 1px solid black;">Harga Sudah Termasuk Pajak</th>
                    </tr>
                    ${data.items.map(val => {
                      return `
                      <tr  >
                        <td style="border: 1px solid black;">${val.title}</td>
                        <td style="border: 1px solid black;">${formatter(
                          val.total_price,
                        )}</td>
                      </tr>
                        `;
                    })}
                    <tr  >
                      <td style="border: 1px solid black;">Total Pembayaran</td>
                      <td style="border: 1px solid black;">${formatter(
                        data.transaction.final_price,
                      )}</td>
                    </tr>
                  </table>
            </div>
    </body>
  </html>
        `,
        fileName: `Invoice_Belanja24_${new Date().getTime()}`,
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      alert(file.filePath);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: adjust(16),
          fontWeight: 'bold',
          color: blueB2C,
          marginTop: adjust(8),
        }}>
        Detail Pesanan
      </Text>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: adjust(8),
            marginVertical: adjust(12),
          }}>
          <Text
            onPress={() => setPage('waitingPayment')}
            style={
              page === 'waitingPayment'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Menunggu Pembayaran
          </Text>
          <Text
            onPress={() => setPage('transactionHistory')}
            style={
              page === 'transactionHistory'
                ? [
                    styles.page,
                    {borderBottomColor: blueB2C, borderBottomWidth: 1},
                  ]
                : styles.page
            }>
            Histori Transaksi
          </Text>
        </View>
        {page === 'waitingPayment' ? (
          <View style={{height: HeightScreen * 0.8}}>
            <Text
              style={{fontSize: adjust(16), fontWeight: '400', color: 'black'}}>
              Menunggu Pembayaran
            </Text>
            {/* card items */}
            {dataPayment.data.length !== 0 ? (
              <FlatList
                data={dataPayment.data}
                renderItem={({item}) => (
                  <View style={styles.cardWaitingPayment}>
                    <View
                      style={{
                        flex: 2,
                        marginRight: adjust(8),
                      }}>
                      <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                        {item.invoice_number}
                      </Text>
                      <Text style={{color: 'black', fontSize: adjust(10)}}>
                        Tanggal Pemesanan {item.order_date_f}
                      </Text>
                      {/*  */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{flex: 2, marginRight: adjust(2)}}>
                          <Text style={styles.miniText}>Metode Pembayaran</Text>
                          <Text style={styles.miniText}>
                            BNI Virtual Account
                          </Text>
                          <Image
                            source={{uri: item.payment.payment_ava}}
                            style={{
                              width: adjust(40),
                              height: adjust(40),
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <View style={{flex: 2}}>
                          <Text style={[styles.miniText, {fontWeight: '700'}]}>
                            Transfer Bank
                          </Text>
                          <Text style={[styles.miniText, {fontWeight: '700'}]}>
                            {item.payment.account_number}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/*  */}
                    <View
                      style={{
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: adjust(11),
                          marginVertical: adjust(8),
                        }}>
                        Bayar sebelum {item.expired_date_f}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          color: 'black',
                        }}>
                        Total Bayar
                      </Text>
                      <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(item.amount)}
                      </Text>
                      {/* button */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            createPDF({
                              token: isToken,
                              chain_id: item.payment.transaction_chain_id,
                            });
                          }}>
                          <Text
                            style={{
                              fontSize: adjust(10),
                              color: 'white',
                              padding: 4,
                              borderRadius: 2,
                              marginTop: adjust(8),
                              borderWidth: 1,
                              color: blueB2C,
                              borderColor: blueB2C,
                            }}>
                            Cetak Invoice
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Payment', {
                              data: item.payment.transaction_chain_id,
                            })
                          }>
                          <Text
                            style={{
                              fontSize: adjust(10),
                              color: 'white',
                              padding: 4,
                              borderRadius: 2,
                              marginTop: adjust(8),
                              backgroundColor: blueB2C,
                            }}>
                            Bayar Tagihan
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EmptyFolder name="folder-open" size={60} color={GrayMedium} />
                <Text style={[{marginTop: adjust(8)}, styles.mediumText]}>
                  Tidak Ada Transaksi yang belum di Bayar
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <Text
                    style={{
                      fontSize: adjust(13),
                      color: 'white',
                      padding: 8,
                      borderRadius: 2,
                      marginTop: adjust(8),
                      backgroundColor: blueB2C,
                    }}>
                    Mulai Belanja
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : (
          <View style={{height: HeightScreen * 0.8}}>
            <Text
              style={{fontSize: adjust(14), fontWeight: '400', color: 'black'}}>
              Histori Transaksi
            </Text>
            {dataHistory.data.length !== 0 ? (
              <FlatList
                data={dataHistory.data}
                renderItem={({item}) => (
                  <View style={styles.cardWaitingPayment}>
                    <View style={{flex: 3, marginRight: adjust(2)}}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          marginBottom: adjust(2),
                        }}>
                        <Text
                          style={[
                            styles.miniText,
                            {fontWeight: '500', marginRight: adjust(2)},
                          ]}>
                          {item.status === 'FINISH'
                            ? 'Selesai'
                            : 'Menunggu Konfirmasi'}
                        </Text>
                        <Text style={styles.miniText}>{item.created_at}</Text>
                        <Text style={styles.miniText}>
                          {item.invoice_number}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.items[0].medias[0].url}}
                          style={{
                            width: adjust(60),
                            height: adjust(60),
                            resizeMode: 'contain',
                          }}
                        />
                        <View
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            flexWrap: 'wrap',
                            marginLeft: 4,
                            padding: 2,
                          }}>
                          <View style={{marginBottom: adjust(2)}}>
                            <Text
                              style={[styles.miniText, {fontWeight: '500'}]}>
                              {item.items[0].title}
                            </Text>
                          </View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                            }}>
                            <Image
                              source={{uri: item.provider_ava}}
                              style={{
                                width: adjust(30),
                                height: adjust(30),
                                resizeMode: 'contain',
                              }}
                            />
                            <View>
                              <Text style={styles.miniText}>
                                {item.provider}
                              </Text>
                              <Text style={styles.miniText}>
                                {item.provider_city}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    {/*  */}
                    <View
                      style={{
                        flex: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          color: 'black',
                        }}>
                        Harga Total
                      </Text>
                      <Text style={[styles.mediumText, {fontWeight: '600'}]}>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        }).format(item.price)}{' '}
                      </Text>
                      {/* button */}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}>
                        <ModalComponent
                          ButtonCustoms={open => {
                            return (
                              <TouchableOpacity
                                onPress={async () => {
                                  await getDetailTransaction(
                                    isToken,
                                    item.id,
                                    setDetailTransaction,
                                  );
                                  open.open();
                                }}>
                                <Text
                                  style={{
                                    fontSize: adjust(10),
                                    color: 'white',
                                    padding: 4,
                                    borderRadius: 2,
                                    marginTop: adjust(8),
                                    borderWidth: 1,
                                    color: blueB2C,
                                    borderColor: blueB2C,
                                  }}>
                                  Detail Transaksi
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                          isTransparent={true}
                          ContainerStyleContent={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          ContentCustoms={close => {
                            return (
                              <View
                                style={{
                                  padding: adjust(10),
                                  backgroundColor: 'white',
                                  width: WidthScreen * 0.9,
                                  borderRadius: adjust(5),
                                }}>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                  }}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: adjust(16),
                                        marginRight: adjust(4),
                                        fontWeight: '400',
                                        color: 'black',
                                      }}>
                                      Detail Transaksi
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: adjust(8),
                                        fontWeight: '300',
                                        padding: adjust(2),
                                        borderRadius: adjust(2),
                                        color: GrayMedium,
                                        backgroundColor: Gray,
                                      }}>
                                      {detailTransaction.data.length !== 0 &&
                                      detailTransaction.data.transaction
                                        .status === 'FINISH'
                                        ? 'Selesai'
                                        : 'Menunggu Konfirmasi'}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => close.close()}>
                                    <Text
                                      style={{
                                        fontSize: adjust(10),
                                        color: 'white',
                                        paddingVertical: 4,
                                        paddingHorizontal: 8,
                                        borderRadius: 2,
                                        marginTop: adjust(8),
                                        backgroundColor: 'red',
                                      }}>
                                      Close
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                {/* content */}
                                {detailTransaction.status !== true && (
                                  <>
                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: adjust(4),
                                        marginVertical: adjust(8),
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                        }}>
                                        <Text style={styles.mediumText}>
                                          Nomor Invoice
                                        </Text>
                                        <Text style={styles.mediumText}>
                                          Nama Toko
                                        </Text>
                                        <Text style={styles.mediumText}>
                                          Tanggal
                                        </Text>
                                      </View>
                                      {/*  */}
                                      <View
                                        style={{
                                          flex: 2,
                                        }}>
                                        <Text style={styles.valueText}>
                                          {
                                            detailTransaction.data.transaction
                                              .invoice_number
                                          }
                                        </Text>
                                        <Text style={styles.valueText}>
                                          {detailTransaction.data.provider.name}
                                        </Text>
                                        <Text style={styles.valueText}>
                                          {
                                            detailTransaction.data.transaction
                                              .created_at
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                    {/* image */}
                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                      }}>
                                      <Image
                                        source={{
                                          uri: item.items[0].medias[0].url,
                                        }}
                                        style={{
                                          width: adjust(60),
                                          height: adjust(60),
                                          resizeMode: 'contain',
                                        }}
                                      />
                                      <View
                                        style={{
                                          flex: 1,
                                          display: 'flex',
                                          flexDirection: 'column',
                                          flexWrap: 'wrap',
                                          marginLeft: 4,
                                          padding: 2,
                                        }}>
                                        <View style={{marginBottom: adjust(2)}}>
                                          <Text
                                            style={[
                                              styles.miniText,
                                              {fontWeight: '500'},
                                            ]}>
                                            {item.items[0].title}
                                          </Text>
                                          <Text style={styles.miniText}>
                                            {
                                              detailTransaction.data.products[0]
                                                .qty
                                            }{' '}
                                            Buah
                                          </Text>
                                          {item.status === 'FINISH' ? (
                                            <ModalComponent
                                              ButtonCustoms={open => {
                                                return (
                                                  <TouchableOpacity
                                                    onPress={() => open.open()}>
                                                    <Text
                                                      style={{
                                                        fontSize: adjust(10),
                                                        color: 'white',
                                                        padding: 4,
                                                        borderRadius: 2,
                                                        marginTop: adjust(8),
                                                        backgroundColor:
                                                          blueB2C,
                                                      }}>
                                                      Tulis Ulasan
                                                    </Text>
                                                  </TouchableOpacity>
                                                );
                                              }}
                                              isTransparent={true}
                                              ContainerStyleContent={{
                                                backgroundColor:
                                                  'rgba(0,0,0,0.5)',
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                              }}
                                              ContentCustoms={close => {
                                                return (
                                                  <View
                                                    style={{
                                                      padding: adjust(10),
                                                      backgroundColor: 'white',
                                                      width: WidthScreen * 0.8,
                                                      borderRadius: adjust(5),
                                                    }}>
                                                    <Text
                                                      style={{
                                                        fontSize: adjust(13),
                                                        fontWeight: 'bold',
                                                        color: blueB2C,
                                                      }}>
                                                      Tulis Ulasan
                                                    </Text>
                                                    {/*  */}
                                                    <ReviewFrom
                                                      props={{
                                                        data: detailTransaction,
                                                        close: close,
                                                      }}
                                                    />
                                                  </View>
                                                );
                                              }}
                                            />
                                          ) : null}
                                        </View>
                                      </View>
                                    </View>
                                    {/* conten2 */}
                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: adjust(4),
                                        marginVertical: adjust(8),
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                        }}>
                                        <Text style={styles.mediumText}>
                                          Alamat Pengiriman
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 2,
                                        }}>
                                        <Text style={styles.valueText}>
                                          {
                                            detailTransaction.data.shipping
                                              .pickup_address
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingHorizontal: adjust(4),
                                        marginVertical: adjust(8),
                                      }}>
                                      <View
                                        style={{
                                          flex: 1,
                                        }}>
                                        <Text style={styles.mediumText}>
                                          Alamat Penerima
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flex: 2,
                                        }}>
                                        <Text style={styles.valueText}>
                                          {
                                            detailTransaction.data.shipping
                                              .shipping_address
                                          }
                                        </Text>
                                      </View>
                                    </View>
                                    <View>
                                      <TouchableOpacity
                                        onPress={() =>
                                          createTranPDF({
                                            token: isToken,
                                            id: detailTransaction.data
                                              .transaction.id,
                                          })
                                        }
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          paddingVertical: 8,
                                          borderRadius: 2,
                                          marginTop: adjust(8),
                                          backgroundColor: 'white',
                                          borderWidth: 1,
                                          borderColor: blueB2C,
                                        }}>
                                        <PrintIcon
                                          name="print"
                                          size={20}
                                          color={blueB2C}
                                        />
                                        <Text
                                          style={{
                                            fontSize: adjust(10),
                                            marginLeft: 4,
                                            color: blueB2C,
                                          }}>
                                          Cetak Invoice
                                        </Text>
                                      </TouchableOpacity>
                                      <Modal
                                        animationType="fade"
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                          setModalVisible(!modalVisible);
                                        }}>
                                        <View
                                          style={{
                                            backgroundColor: 'rgba(0,0,0,0.5)',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                          }}>
                                          <View
                                            style={{
                                              padding: adjust(10),
                                              backgroundColor: 'white',
                                              width: WidthScreen * 0.8,
                                              borderRadius: adjust(5),
                                            }}>
                                            <Text
                                              style={{
                                                fontSize: adjust(13),
                                                fontWeight: 'bold',
                                                color: blueB2C,
                                              }}>
                                              Riwayat Pengiriman
                                            </Text>
                                            <FlatList
                                              data={historyShipping.data}
                                              renderItem={({item}) => (
                                                <View
                                                  style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent:
                                                      'space-between',
                                                    padding: 4,
                                                    borderRadius: 4,
                                                    marginVertical: adjust(8),
                                                    backgroundColor: 'white',
                                                    shadowColor: 'black',
                                                    shadowOffset: {
                                                      width: 1,
                                                      height: 1,
                                                    },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 10,
                                                    elevation: 5,
                                                  }}>
                                                  {console.log(item, 'item')}
                                                  <View
                                                    style={{
                                                      flex: 1,
                                                      paddingHorizontal: 4,
                                                      marginRight: 4,
                                                    }}>
                                                    <Text
                                                      style={[
                                                        styles.miniText,
                                                        {
                                                          fontWeight: '500',
                                                          marginRight:
                                                            adjust(2),
                                                          padding: adjust(2),
                                                          borderRadius:
                                                            adjust(2),
                                                          backgroundColor: Gray,
                                                        },
                                                      ]}>
                                                      {item.status ===
                                                      'shipping_arrived'
                                                        ? 'Tiba diTujuan'
                                                        : 'Dalam Pengiriman'}
                                                    </Text>
                                                    <Text
                                                      style={styles.miniText}>
                                                      {item.human_date}
                                                    </Text>
                                                  </View>
                                                  <View style={{flex: 2}}>
                                                    <Text
                                                      style={styles.miniText}>
                                                      {item.literal}
                                                    </Text>
                                                  </View>
                                                </View>
                                              )}
                                              keyExtractor={item => item.id}
                                            />
                                            {/*  */}
                                            <View
                                              style={{
                                                marginTop: adjust(10),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                              }}>
                                              <TouchableOpacity
                                                onPress={() =>
                                                  setModalVisible(!modalVisible)
                                                }
                                                style={{
                                                  flex: 1,
                                                  borderWidth: 1,
                                                  borderColor: 'red',
                                                  padding: adjust(10),
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  marginRight: adjust(2),
                                                }}>
                                                <Text
                                                  style={{
                                                    fontSize: adjust(10),
                                                    color: 'red',
                                                  }}>
                                                  Cencel
                                                </Text>
                                              </TouchableOpacity>
                                            </View>
                                          </View>
                                        </View>
                                      </Modal>
                                      <TouchableOpacity
                                        onPress={async () => {
                                          setModalVisible(!modalVisible),
                                            await getHistoryShipping(
                                              isToken,
                                              item.id,
                                              setHistoryShipping,
                                            );
                                        }}
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                          paddingVertical: 8,
                                          borderRadius: 2,
                                          marginTop: adjust(8),
                                          backgroundColor: 'white',
                                          borderWidth: 1,
                                          borderColor: blueB2C,
                                        }}>
                                        <ShippingIcon
                                          name="local-shipping"
                                          size={20}
                                          color={blueB2C}
                                        />
                                        <Text
                                          style={{
                                            fontSize: adjust(10),
                                            color: blueB2C,
                                            marginLeft: 4,
                                          }}>
                                          History Pengiriman
                                        </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </>
                                )}
                              </View>
                            );
                          }}
                        />
                        {item.status === 'FINISH' ? (
                          <TouchableOpacity
                            onPress={() => navigation.navigate('Beranda')}>
                            <Text
                              style={{
                                fontSize: adjust(10),
                                color: 'white',
                                padding: 4,
                                borderRadius: 2,
                                marginTop: adjust(8),
                                backgroundColor: blueB2C,
                              }}>
                              Beli Lagi
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <EmptyFolder name="folder-open" size={60} color={GrayMedium} />
                <Text style={[{marginTop: adjust(8)}, styles.mediumText]}>
                  Tidak Ada Transaksi yang belum di Bayar
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Beranda')}>
                  <Text
                    style={{
                      fontSize: adjust(13),
                      color: 'white',
                      padding: 8,
                      borderRadius: 2,
                      marginTop: adjust(8),
                      backgroundColor: blueB2C,
                    }}>
                    Mulai Belanja
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: adjust(10),
  },
  content: {
    marginTop: adjust(10),
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#fffafa',
    shadowRadius: 10,
    shadowColor: 'black',
  },
  page: {
    fontSize: adjust(14),
    fontWeight: '500',
    color: 'black',
  },
  cardWaitingPayment: {
    width: WidthScreen * 0.9,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 6,
    borderRadius: 4,
    marginVertical: adjust(8),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  mediumText: {
    fontSize: adjust(13),
    color: 'black',
    marginVertical: adjust(3),
  },
  miniText: {
    fontSize: adjust(7),
    fontWeight: '400',
    color: 'black',
    marginVertical: adjust(2),
  },
  valueText: {
    fontSize: adjust(13),
    color: GrayMedium,
    marginVertical: adjust(3),
  },
});
export default ScreenTransaction;
