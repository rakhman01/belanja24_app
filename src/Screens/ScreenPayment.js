import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Clipboard,
} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import React, {useEffect, useState} from 'react';
import {getPaymentChain, uploadProofOfPayment} from '../Assets/API/postAPI';
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
import * as ImagePicker from 'react-native-image-picker';
import {ImagePickerModal} from '../Component/ImagePickerModal';
import {colors, dimensions, font} from '../config/constant';
import ImageBase64 from 'react-native-image-base64';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScreenPayment = ({navigation, route}) => {
  const chain_id = route.params.data;
  const token = getFromRedux('token');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataPayment, setDataPayment] = useState({
    status: false,
    data: [],
  });
  const {width} = useWindowDimensions();
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const [source, setSource] = useState({
    html: `<p></p>`,
  });

  const manageImage = async response => {
    if (response.didCancel) {
      return;
    } else if (response.assets) {
      if (response.assets?.length > 0) {
        setImage(response.assets[0].base64 ? response.assets[0].base64 : '');
      }
    }
  };

  const onImageLibraryPress = React.useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      setPickerResponse(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const {uri} = response.assets[0];
        // Mengonversi gambar ke base64 menggunakan react-native-image-base64
        ImageBase64.getBase64String(uri)
          .then(base64Data => {
            // Set state atau lakukan operasi lain sesuai kebutuhan
            setImage(`data:image/jpeg;base64,${base64Data}`);
          })
          .catch(error => {
            console.error('Error converting image to base64:', error);
          });
      }
      setVisible(false);
    });
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const {uri} = response.assets[0];
        // Mengonversi gambar ke base64 menggunakan react-native-image-base64
        ImageBase64.getBase64String(uri)
          .then(base64Data => {
            // console.log('Base64 Data:', base64Data);
            // Set state atau lakukan operasi lain sesuai kebutuhan
            setImage(`data:image/jpeg;base64,${base64Data}`);
          })
          .catch(error => {
            console.error('Error converting image to base64:', error);
          });
      }
      setPickerResponse(response);
      setVisible(false);
    });
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  useEffect(() => {
    getPaymentChain(token, {chain_id}, res => {
      if (res.data.data.how_to_pay !== null) {
        setSource({
          html: `<div style="color:black;">${res.data.data.how_to_pay}</div>`,
        });
      } else {
        setSource({
          html: `<div style="color:black;">pembayaran Manual</div>`,
        });
      }
      if (res !== null) {
        setDataPayment({
          status: true,
          data: res.data.data,
        });
      }
    });
  }, []);

  const copyToClipboard = params => {
    Clipboard.setString(params);
    alert('copied to clipboard');
  };

  const createPDF = () => {
    InvoiceGenerate(token, chain_id, async res => {
      const data = res.data.data.results[0];

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

  return dataPayment.status ? (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: RFValue(10),
      }}>
      <ScrollView>
        <Text
          style={{color: blueB2C, fontSize: RFValue(12), fontWeight: 'bold'}}>
          Screen Pembayaran
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: RFValue(10),
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
              fontSize: RFValue(10),
              fontWeight: 'bold',
            }}>
            {dataPayment.data.title}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: adjust(6),
            }}>
            <Text
              style={{
                color: blueB2C,
                fontSize: RFValue(12),
                fontWeight: 'bold',
                marginTop: RFValue(5),
                marginRight: adjust(2),
              }}>
              {dataPayment.data.account_number}
            </Text>
            <TouchableOpacity
              onPress={() => copyToClipboard(dataPayment.data.account_number)}>
              <Icon
                name="content-copy"
                size={adjust(20)}
                color={colors.primaryBlue}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: GrayMedium,
            fontSize: RFValue(10),
            fontWeight: 'bold',
            marginTop: RFValue(5),
          }}>
          Bayar Sebelum
          {dataPayment.data.expired_date}
        </Text>

        {dataPayment.data.status === 'INIT' ? (
          <>
            <Text
              style={{
                color: GrayMedium,
                fontSize: RFValue(10),
                fontWeight: 'bold',
                marginTop: RFValue(5),
              }}>
              {dataPayment.data.title != 'Transfer Virtual Account'
                ? 'Upload Bukti Pembayaran'
                : 'Menunggu Konfirmasi'}
            </Text>
            {dataPayment.data.title != 'Transfer Virtual Account' ? (
              <>
                <Image style={styles.avatarImage} source={uri ? {uri} : ''} />
                <TouchableOpacity
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: Gray,
                    paddingVertical: RFValue(10),
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onPress={() => setVisible(true)}>
                  <Text
                    style={{
                      color: GrayMedium,
                      fontSize: RFValue(10),
                      fontWeight: 'bold',
                    }}>
                    Upload Images
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={image === null}
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderColor: Gray,
                    paddingVertical: RFValue(10),
                    display: 'flex',
                    alignItems: 'center',
                    marginVertical: RFValue(2),
                  }}
                  onPress={() => {
                    setLoading(true);
                    uploadProofOfPayment(
                      token,
                      {chain_id: chain_id, proof: image},
                      val => {
                        if (val.data.message === 'Approved') {
                          getPaymentChain(token, {chain_id}, res => {
                            if (res.data.data.how_to_pay !== null) {
                              setSource({
                                html: `<div style="color:black;">${res.data.data.how_to_pay}</div>`,
                              });
                            } else {
                              setSource({
                                html: `<div style="color:black;">pembayaran Manual</div>`,
                              });
                            }
                            setDataPayment({
                              status: true,
                              data: res.data.data,
                            });
                          });
                          setLoading(false);
                        }
                      },
                    );
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color={font.colors.blue} />
                  ) : (
                    <Text
                      style={{
                        color: font.colors.blue,
                        fontSize: RFValue(10),
                        fontWeight: 'bold',
                      }}>
                      Upload Bukti Pembayaran
                    </Text>
                  )}
                </TouchableOpacity>
                {/* </View> */}
                <ImagePickerModal
                  isVisible={visible}
                  onClose={() => setVisible(false)}
                  onImageLibraryPress={onImageLibraryPress}
                  onCameraPress={onCameraPress}
                />
              </>
            ) : null}
          </>
        ) : null}

        <RenderHtml contentWidth={width} source={source} />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: Gray,
            paddingVertical: RFValue(10),
            display: 'flex',
            alignItems: 'center',
          }}
          onPress={() => {
            createPDF();
          }}>
          <Text
            style={{
              color: GrayMedium,
              fontSize: RFValue(10),
              fontWeight: 'bold',
            }}>
            Cetak Invoice
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: blueB2C,
            paddingVertical: RFValue(10),
            display: 'flex',
            alignItems: 'center',
            marginTop: RFValue(10),
          }}
          onPress={() => {
            navigation.navigate('TransactionsStack');
          }}>
          <Text
            style={{color: blueB2C, fontSize: RFValue(10), fontWeight: 'bold'}}>
            Cek Transaction
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <LoadingPage />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: dimensions.width * 1,
    alignItems: 'center',
    // marginTop: '40%',
  },
  avatarImage: {
    width: dimensions.width * 1,
    height: dimensions.height * 0.2,
    backgroundColor: colors.background, // Warna lapisan transparan di atas gambar
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
    borderRadius: RFValue(8),
    marginVertical: RFValue(2),
  },
  addButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: Gray,
    paddingVertical: RFValue(10),
    display: 'flex',
    alignItems: 'center',
  },
  addButtonIcon: {
    height: 54,
    width: 54,
  },
});

export default ScreenPayment;
