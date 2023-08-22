import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Picker} from '@react-native-picker/picker';
import {adjust, blueB2C, Gray, GrayMedium} from '../Assets/utils';
import {postAddress, postPostalCode} from '../Assets/API/postAPI';
import {getFromRedux} from '../Assets/API/GetRedux';

const AddressForm = ({props}) => {
  const token = getFromRedux('token');
  const {close, address} = props;
  const [postalAddress, setPosstalAddress] = useState([]);
  const [addres, setAddress] = useState({
    city: '',
    district: '',
    postal_code: '',
    province: '',
  });
  const [selectedValue, setSelectedValue] = React.useState('Rumah');

  return (
    <Formik
      initialValues={{
        address: '',
        recipient_name: '',
        recipient_telp: '',
      }}
      onSubmit={values =>
        postAddress(
          token,
          {
            address: values.address,
            city: addres.city,
            district: addres.district,
            name: selectedValue,
            postal_code: addres.postal_code,
            province: addres.province,
            recipient_name: values.recipient_name,
            phone_number: values.recipient_telp,
          },
          address,
        )
      }>
      {({errors, touched, values, handleBlur, handleChange, handleSubmit}) => (
        <View
          style={{
            marginTop: adjust(10),
          }}>
          <Text style={styles.label}>Jenis Alamat</Text>
          <View
            style={{
              borderRadius: 4,
              borderWidth: 1,
              marginBottom: 10,
              backgroundColor: 'white',
            }}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
              style={{
                color: 'black',
                backgroundColor: 'white',
              }}>
              <Picker.Item
                style={styles.itemPicker}
                label="Rumah"
                value="Rumah"
              />
              <Picker.Item
                style={styles.itemPicker}
                label="Kantor"
                value="Kantor"
              />
            </Picker>
          </View>
          {/* bataas aman */}
          <Text style={styles.label}>Nama Penerima</Text>
          <TextInput
            placeholder="Bambang Irawan"
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor={GrayMedium}
            blurOnSubmit={false}
            value={values.recipient_name}
            onChangeText={handleChange('recipient_name')}
            onBlur={handleBlur('recipient_name')}
            style={styles.input}
          />
          <Text style={styles.label}>Telp Penerima</Text>
          <TextInput
            placeholder="089889987667"
            textContentType="none"
            keyboardType="ascii-capable"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor={GrayMedium}
            blurOnSubmit={false}
            value={values.recipient_telp}
            onChangeText={handleChange('recipient_telp')}
            onBlur={handleBlur('recipient_telp')}
            style={styles.input}
          />
          <Text style={styles.label}>Alamat Lengkap</Text>
          <TextInput
            placeholder="Jl. Student Castle, Kledokan, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281"
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor={GrayMedium}
            blurOnSubmit={false}
            multiline={true}
            value={values.address}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            style={styles.input}
          />
          <Text style={styles.label}>Kode Pos</Text>
          <Formik
            initialValues={{postal_code: ''}}
            validationSchema={Yup.object().shape({
              postal_code: Yup.string()
                .required('required')
                .min(5, 'to short')
                .max(5, 'to long'),
            })}
            onSubmit={value =>
              postPostalCode(value, setPosstalAddress) &&
              setAddress({...addres, postal_code: value.postal_code})
            }>
            {({
              errors,
              touched,
              values,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderRadius: 4,
                    paddingHorizontal: 4,
                    borderColor: blueB2C,
                    marginBottom: adjust(8),
                  }}>
                  <TextInput
                    placeholder="Bambang Irawan"
                    textContentType="none"
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="next"
                    placeholderTextColor={GrayMedium}
                    blurOnSubmit={false}
                    value={values.postal_code}
                    onChangeText={handleChange('postal_code')}
                    onBlur={handleBlur('postal_code')}
                    style={{
                      fontSize: adjust(12),
                      paddingHorizontal: adjust(8),
                      color: 'black',
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      width: adjust(40),
                      height: adjust(40),
                      display: 'flex',
                      borderRadius: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: blueB2C,
                    }}
                    onPress={handleSubmit}>
                    <Text
                      style={{
                        display: 'flex',
                        textAlign: 'center',
                        fontSize: adjust(13),
                        color: 'white',
                      }}>
                      Cari...
                    </Text>
                  </TouchableOpacity>
                </View>
                {/*  */}
                {touched.postal_code && errors.postal_code && (
                  <Text style={{color: 'red', fontSize: adjust(14)}}>
                    {errors.postal_code}
                  </Text>
                )}
                {/* {postalAddress.length === 0 && addres === '' ? null : (
                  <Text style={{color: 'red', fontSize: adjust(14)}}>
                    Kode Post Anda Tidak Terdaftar
                  </Text>
                )} */}
              </View>
            )}
          </Formik>
          {addres.city === '' ? null : (
            <View
              style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={styles.postalValue}>{addres.district}</Text>
              <Text style={styles.postalValue}>{addres.city}</Text>
              <Text style={styles.postalValue}>{addres.province}</Text>
            </View>
          )}
          <FlatList
            data={postalAddress}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  setAddress({
                    ...addres,
                    city: item.city_name,
                    district: item.district_name,
                    province: item.province_name,
                  }) || setPosstalAddress([]);
                }}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  padding: 4,
                  marginVertical: 4,
                  backgroundColor: '#F3F4F6',
                }}>
                <Text style={styles.addres}>{item.village_name}</Text>
                <Text style={[styles.addres, {marginHorizontal: 2}]}>
                  {item.district_name}
                </Text>
                <Text style={[styles.addres, {marginHorizontal: 2}]}>
                  {item.city_name}
                </Text>
                <Text style={[styles.addres, {marginHorizontal: 2}]}>
                  {item.province_name}
                </Text>
              </TouchableOpacity>
            )}></FlatList>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: adjust(10),
            }}>
            <TouchableOpacity
              onPress={close.close}
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'red',
                padding: adjust(10),
                display: 'flex',
                alignItems: 'center',
                marginRight: adjust(2),
              }}>
              <Text style={{fontSize: adjust(10), color: 'red'}}>Cencel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                flex: 1,
                backgroundColor: blueB2C,
                padding: adjust(10),
                display: 'flex',
                alignItems: 'center',
                marginLeft: adjust(2),
              }}>
              <Text style={{fontSize: adjust(10), color: 'white'}}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: adjust(14),
    fontWeight: '400',
    marginVertical: 6,
    color: 'black',
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    padding: adjust(8),
    fontSize: adjust(12),
    marginBottom: adjust(8),
    backgroundColor: 'white',
    borderColor: blueB2C,
    color: 'black',
  },
  addres: {
    fontSize: adjust(12),
    fontWeight: '300',
    color: 'black',
  },
  postalValue: {
    margin: 2,
    padding: adjust(4),
    borderRadius: 4,
    backgroundColor: Gray,
    fontSize: adjust(12),
    color: 'black',
  },
  itemPicker: {
    fontSize: adjust(10),
    fontWeight: '400',
  },
});

export default AddressForm;
