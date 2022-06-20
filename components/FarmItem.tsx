import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

type Props = {
  id?: string;
  displayName?: string;
  image?: string;
  name?: string;
  phone?: string;
  createdDate?: string;
  openHours?: string;
  creator?: string;
};

const FarmItem = ({ id, displayName, image, name, phone, createdDate, openHours, creator }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.upSession}>
        <View style={styles.fieldsWrapper}>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Name:</Text>
            <Text style={styles.fieldValue}>{name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Display Name:</Text>
            <Text style={styles.fieldValue}>{displayName}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Phone:</Text>
            <Text style={styles.fieldValue}>{phone ? phone : 'N/A'}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Creator:</Text>
            <Text style={styles.fieldValue}>{creator}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Created Date:</Text>
            <Text style={styles.fieldValue}>{createdDate}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image ? image : 'https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg' }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.downSession}>
        <Text style={styles.openHours}>Open Hours:</Text>
        <Text>{openHours ? openHours : 'N/A'}</Text>
      </View>
    </View>
  );
};

export default FarmItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgreen',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  upSession: {
    flexDirection: 'row',
  },
  fieldsWrapper: {
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 5,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  fieldValue: {
    fontSize: 14,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: 200,
  },
  downSession: {
    flex: 1,
    borderColor: 'brown',
    borderWidth: 4,
    padding: 5,
    borderRadius: 10,
  },
  openHours: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
