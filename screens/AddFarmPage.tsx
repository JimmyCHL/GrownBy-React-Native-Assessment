import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FormField from '../components/FormField';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddFarmPage'>;

const AddFarmPage = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['transparent', 'green']} style={{ flex: 1, padding: 10 }} start={{ x: 0.25, y: 0.25 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Add Your Farm</Text>
        </View>

        {/* form */}
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ displayName: '', name: '', phone: '', openHours: '' }}
            onSubmit={(value, { resetForm }) => {
              console.log(value);
              navigation.navigate('UserLoginAndRegisterPage');
            }}
            // validationSchema={AuthValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
              <>
                <FormField name="displayName" title="Display Name" value={values.displayName} handleChange={handleChange} />
                <FormField name="name" title="Name" value={values.name} handleChange={handleChange} />
                <FormField name="phone" title="Phone" value={values.phone} handleChange={handleChange} />
                <FormField name="openHours" title="Open Hours" value={values.openHours} handleChange={handleChange} />
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!values.displayName || !values.name}
                  style={!values.displayName || !values.name ? { ...styles.submitButtonContainer, backgroundColor: '#79554880' } : styles.submitButtonContainer}
                >
                  <Text style={styles.submitButtonText}>Add Farm</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AddFarmPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    padding: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    marginTop: 10,
  },
  submitButtonContainer: {
    backgroundColor: 'brown',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
