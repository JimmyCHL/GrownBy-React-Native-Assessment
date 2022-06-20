import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../firebase';
interface Props {
  loginMode: boolean;
}

const AuthValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email must be a valid email.').required('Email is required.'),
  password: Yup.string().min(8, 'Your password has to have at least 8 characters.').required('Password is required.'),
});

const UserAuthentication = ({ loginMode }: Props) => {
  //Authentication Function
  const authenticationFunction = (email: string, password: string) => {
    if (loginMode) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log('User signed in successfully');
        })
        .catch((error) => {
          Alert.alert('Message', 'Invalid email or password.');
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          console.log('account created successfully');
        })
        .catch((error) => {
          Alert.alert('Message', 'Email has already existed or has been used. Please try another email, thanks!', [{ text: 'OK', style: 'default' }]);
        });
    }
  };

  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(value, { resetForm }) => {
          console.log(value);
          authenticationFunction(value.email, value.password);
          resetForm({});
        }}
        validationSchema={AuthValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
          <>
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon tvParallaxProperties name="email" type="material" color="brown" iconStyle={{ marginRight: 5 }} />
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="xxx@email.com"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={handleChange('email')}
                  onBlur={() => Keyboard.dismiss()}
                  value={values.email}
                  style={styles.inputField}
                  testID="email"
                  accessibilityLabel="email"
                />
              </View>
              <View style={styles.inputContainer}>
                <Icon tvParallaxProperties name="lock" type="material" color="brown" iconStyle={{ marginRight: 5 }} />
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  autoCorrect={false}
                  textContentType="password"
                  onChangeText={handleChange('password')}
                  // onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.inputField}
                  testID="password"
                  accessibilityLabel="password"
                />
              </View>
            </View>
            {!isValid && (
              <View style={styles.errorsContainer}>
                {errors.email && <Text style={styles.errorsText}>*{errors.email}</Text>}
                {errors.password && <Text style={styles.errorsText}>*{errors.password}</Text>}
              </View>
            )}
            <TouchableOpacity
              style={!isValid || !values.email || !values.password ? { ...styles.buttonContainer, backgroundColor: '#79554880' } : styles.buttonContainer}
              onPress={() => handleSubmit()}
              disabled={!isValid || !values.email || !values.password}
              testID="submit"
              accessibilityLabel="submit"
            >
              <Text style={styles.buttonText}>{loginMode ? 'Login' : 'Register'}</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default UserAuthentication;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'brown',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingVertical: 0,
  },
  inputField: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'brown',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { fontSize: 20, color: 'white' },
  errorsContainer: {
    paddingLeft: 30,
    marginTop: -5,
    marginBottom: 10,
  },
  errorsText: {
    color: 'red',
    fontSize: 12,
  },
});
