import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface Props {
  name: string;
  value: string;
  title: string;
  errorMessage?: string | null | undefined;
  handleChange: any;
}

const FormField = ({ name, value, title, handleChange, errorMessage }: Props) => {
  const placeholderHandler = (name: string) => {
    switch (name) {
      case 'displayName':
        return 'Farm Display Name';
        break;
      case 'name':
        return 'Farm Name (Unique)';
        break;
      case 'phone':
        return '(US only) (optional)';
        break;
      case 'openHours':
        return 'Open Hours (Optional)';
        break;
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>*{title}</Text>
      <View style={styles.inputFieldContainer}>
        <TextInput
          style={styles.inputField}
          placeholderTextColor="gray"
          placeholder={placeholderHandler(name)}
          autoCapitalize="none"
          onChangeText={handleChange(name)}
          value={value}
          keyboardType={name === 'phone' ? 'numeric' : 'default'}
        />
        <Text style={{ position: 'absolute', color: 'red', top: 45 }}>{errorMessage}</Text>
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
