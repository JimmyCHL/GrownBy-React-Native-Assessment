import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import UserAuthentication from '../components/UserAuthentication';
import type { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'UserLoginAndRegisterPage'>;

const UserLoginAndRegisterPage = ({ navigation }: Props) => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GrownBy</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => setLoginMode((prev) => !prev)}>
          <Text style={styles.headerButtonText}>{loginMode ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>
      </View>

      <UserAuthentication loginMode={loginMode} />

      {/* FarmList */}
    </SafeAreaView>
  );
};

export default UserLoginAndRegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 35,
    color: 'brown',
    textShadowColor: 'brown',
    textShadowRadius: 10,
  },
  headerButton: {
    padding: 10,
    backgroundColor: 'brown',
    borderRadius: 10,
  },
  headerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
