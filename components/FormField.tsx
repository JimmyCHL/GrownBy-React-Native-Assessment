import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  name: string;
  value: string;
  title: string;
  handleChange: any;
}

const FormField = ({ name, value, title, handleChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>*{title}</Text>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor="gray"
          placeholder="Your Farm Name"
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          value={value}
        />
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
  },
  label: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputFieldContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  inputField: {
    fontSize: 20,
  },
});
