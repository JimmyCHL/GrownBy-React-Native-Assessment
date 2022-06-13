import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Formik } from 'formik';

interface Props {
  loginMode: boolean;
}

const UserAuthentication = ({ loginMode }: Props) => {
  return (
    <View>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(value) => {
          console.log(value);
        }}
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
                  onBlur={handleBlur('email')}
                  value={values.email}
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
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleSubmit()}
              //   disabled={!isValid}
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
    paddingRight: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'brown',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: { fontSize: 20, color: 'white' },
});
