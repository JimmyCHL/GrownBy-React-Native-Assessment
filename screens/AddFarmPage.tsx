import React, { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity, Image, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';

import FormField from '../components/FormField';
import type { RootStackParamList } from '../App';
import { auth, storage, firestoreDB } from '../firebase';

//type
type Props = NativeStackScreenProps<RootStackParamList, 'AddFarmPage'>;
type ValuesProps = { displayName: string; name: string; phone: string; openHours: string };

//formSchema
const AddFarmValidationSchema = Yup.object().shape({
  displayName: Yup.string().required('*Display name is required'),
  name: Yup.string().required('*Name is required'), // add test() later
  phone: Yup.string()
    .test('onlyNumber', '', function (value: any, context: any): any {
      //value would be undefined in the first time potentially, so make sure value is not undefined before check condition.
      if (value && value.includes('.')) {
        return context.createError({ message: '*Only number is allowed' });
      }
      if (value && value !== '' && value.length < 10) {
        return context.createError({ message: '*Phone number must be 10 digits' });
      }
      return true;
    })
    .optional(),
  openHours: Yup.string().optional(),
});

const AddFarmPage = ({ navigation }: Props) => {
  const [image, setImage] = useState<string>('');

  //pick Image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    Keyboard.dismiss();
  };

  //upLoadImageToFirebase
  const upLoadImageToFirebase = async (image: string, refId: string) => {
    if (!image) return '';

    console.log('prepare to upload image to firebase storage');

    // Implement a new Blob(binary data) promise with XMLHTTPRequest
    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    const imageRef = ref(storage, `images/farm/${refId}/farmImage.jpg`);

    return await uploadBytes(imageRef, blob, {
      contentType: 'image/jpeg',
    })
      .then(async (snapshot) => {
        console.log('image uploaded successfully');
        const imageUrl = await getDownloadURL(imageRef);
        return imageUrl;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //SubmitFormToFirebase
  const submitFormToFirebase = async (values: ValuesProps, image: string) => {
    console.log('prepare add farm metaData to firebase firestore farms collection');
    //add farmData to farms collection
    const docRef = await addDoc(collection(firestoreDB, 'farms'), { ...values, creator: auth.currentUser!.email });

    console.log('farm metaData was added to farms collection successfully');
    console.log('farm Document Id is: ', docRef.id);

    const farmImageUrl = await upLoadImageToFirebase(image, docRef.id);

    console.log('prepare to update image url to current farm document');

    //add imageUrl to curren farm document
    await updateDoc(doc(firestoreDB, 'farms', docRef.id), {
      image: farmImageUrl,
    })
      .then(() => {
        console.log('imageUrl was added to current farm document successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['transparent', 'green']} style={{ flex: 1, padding: 10 }} start={{ x: 0.25, y: 0.25 }}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Add Your Farm</Text>
        </View>

        {/* form */}
        <View style={image ? { ...styles.formContainer, flex: 1 } : styles.formContainer}>
          <Formik
            initialValues={{ displayName: '', name: '', phone: '', openHours: '' }}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              submitFormToFirebase(values, image);
              resetForm({});
              navigation.navigate('UserLoginAndRegisterPage');
            }}
            validationSchema={AddFarmValidationSchema}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <FormField name="displayName" title="Display Name" value={values.displayName} handleChange={handleChange} errorMessage={errors.displayName} />
                <FormField name="name" title="Name" value={values.name} handleChange={handleChange} errorMessage={errors.name} />
                <FormField name="phone" title="Phone" value={values.phone} handleChange={handleChange} errorMessage={errors.phone} />
                <FormField name="openHours" title="Open Hours" value={values.openHours} handleChange={handleChange} errorMessage={errors.openHours} />

                <View style={styles.imageButtonsContainer}>
                  <TouchableOpacity onPress={() => pickImage()} style={styles.imageButtonContainer}>
                    <Text style={styles.imageButtonText}>{image ? 'Change Image' : 'Add An Image'}</Text>
                  </TouchableOpacity>
                  {!!image && (
                    <TouchableOpacity onPress={() => setImage('')} style={styles.imageButtonContainer}>
                      <Text style={styles.imageButtonText}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {!!image && (
                  <View style={styles.showImageContainer}>
                    <Image source={{ uri: image }} style={styles.imageConfig} />
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!values.displayName || !values.name}
                  style={!values.displayName || !values.name ? { ...styles.submitButtonContainer, backgroundColor: '#79554880' } : styles.submitButtonContainer}
                >
                  <Text style={styles.submitButtonText}>Submit</Text>
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
  imageButtonsContainer: {
    flexDirection: 'row',
  },
  imageButtonContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: 'green',
    flex: 1,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  showImageContainer: {
    flex: 1,
  },
  imageConfig: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
