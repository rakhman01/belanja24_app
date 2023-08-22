import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPaymentChain} from '../Assets/API/postAPI';
import {getFromRedux} from '../Assets/API/GetRedux';
import LoadingPage from '../Component/LoadingPage';
import {
  adjust,
  blueB2C,
  formatter,
  Gray,
  GrayMedium,
  WidthScreen,
} from '../Assets/utils';
import RenderHtml from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {InvoiceGenerate} from '../Assets/API/getAPI';

const ScreenPayment = ({navigation, route}) => {
  //   console.log(props);
  const chain_id = route.params.data;
  const token = getFromRedux('token');

  const [dataPayment, setDataPayment] = useState({
    status: false,
    data: [],
  });
  const {width} = useWindowDimensions();

  const [source, setSource] = useState({
    html: `<p>hahah</p>`,
  });

  useEffect(() => {
    getPaymentChain(token, {chain_id}, res => {
      //   console.log(res.data.data.how_to_pay);
      setSource({
        html: `<div style="color:black;">${res.data.data.how_to_pay}</div>`,
      });
      setDataPayment({
        status: true,
        data: res.data.data,
      });
    });
  }, []);

  const createPDF = () => {
    InvoiceGenerate(token, chain_id, async res => {
      // console.log(res.data.data);
      const data = res.data.data.results[0];
      // console.log(data);

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
      // console.log(file.filePath);
      alert(file.filePath);
    });
  };

  return dataPayment.status ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: adjust(10),
      }}>
      <ScrollView>
        <Text
          style={{color: blueB2C, fontSize: adjust(12), fontWeight: 'bold'}}>
          Screen Pembayaran
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: adjust(10),
          }}>
          <Image
            source={{uri: dataPayment.data.payment_method_ava}}
            style={{
              width: WidthScreen * 0.4,
              height: WidthScreen * 0.4,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: GrayMedium,
              fontSize: adjust(10),
              fontWeight: 'bold',
            }}>
            {dataPayment.data.title}
          </Text>
          <Text
            style={{
              color: blueB2C,
              fontSize: adjust(12),
              fontWeight: 'bold',
              marginTop: adjust(5),
            }}>
            {dataPayment.data.account_number}
          </Text>
        </View>
        <Text
          style={{
            color: GrayMedium,
            fontSize: adjust(10),
            fontWeight: 'bold',
            marginTop: adjust(5),
          }}>
          Bayar Sebelum
          {dataPayment.data.expired_date}
        </Text>
        <RenderHtml contentWidth={width} source={source} />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Gray,
            paddingVertical: adjust(10),
            display: 'flex',
            alignItems: 'center',
          }}
          onPress={() => {
            createPDF();
          }}>
          <Text
            style={{
              color: GrayMedium,
              fontSize: adjust(10),
              fontWeight: 'bold',
            }}>
            Cetak Invoice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: blueB2C,
            paddingVertical: adjust(10),
            display: 'flex',
            alignItems: 'center',
            marginTop: adjust(10),
          }}
          onPress={() => {
            navigation.navigate('TransactionsStack');
          }}>
          <Text
            style={{color: blueB2C, fontSize: adjust(10), fontWeight: 'bold'}}>
            Cek Transaction
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <LoadingPage />
  );
};

export default ScreenPayment;
