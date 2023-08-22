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
import StarImage from 'react-native-vector-icons/FontAwesome';
import {adjust, blueB2C, Gray, GrayMedium, WidthScreen} from '../Assets/utils';
import {postReview} from '../Assets/API/postAPI';
import {useSelector} from 'react-redux';

const ReviewFrom = ({props}) => {
  const isToken = useSelector(state => state.Authentication.isLogin.token);
  const [ratting, setRatting] = useState(0);

  return (
    <Formik
      initialValues={{
        body: '',
      }}
      onSubmit={values => {
        postReview(
          isToken,
          {
            body: values.body,
            product_id: props.data.data.products[0].id,
            rate: ratting,
            transaction_id: props.data.data.transaction.id,
          },
          res => {
            if (res.message === 'Approved') {
              props.close.close();
            }
          },
        );
      }}>
      {({errors, touched, values, handleBlur, handleChange, handleSubmit}) => (
        <View>
          <Text style={styles.label}>Bagaimana Pelayananya?</Text>
          <View
            style={{
              width: WidthScreen * 0.5,
              paddingVertical: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {[...Array(5).keys()].map(val => (
              <StarImage
                onPress={() => setRatting(val + 1)}
                name="star"
                size={20}
                color={val + 1 <= ratting ? '#FACC15' : Gray}
                key={val}
              />
            ))}
          </View>
          <Text style={styles.label}>Tulis Ulasan Kamu</Text>
          <TextInput
            placeholder="Tulis ulasan kamu disini, seperti apa barang yang di terima, proses dan pelayananya!"
            textContentType="none"
            keyboardType="default"
            autoCapitalize="none"
            returnKeyType="next"
            placeholderTextColor={GrayMedium}
            blurOnSubmit={false}
            multiline={true}
            value={values.body}
            onChangeText={handleChange('body')}
            onBlur={handleBlur('body')}
            style={styles.input}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: adjust(10),
            }}>
            <TouchableOpacity
              onPress={props.close.close}
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
});

export default ReviewFrom;
