import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import UserAuthentication from '../components/UserAuthentication';
import type { RootStackParamList } from '../App';
import { auth } from '../firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'UserLoginAndRegisterPage'>;

const UserLoginAndRegisterPage = ({ navigation }: Props) => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        setUserExist(true);
      }
      if (auth.currentUser) {
        setUserExist(true);
      }
    });
  }, []);

  //handleAuthButton

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GrownBy</Text>
        <TouchableOpacity style={styles.headerButton} onPress={() => setLoginMode((prev) => !prev)}>
          <Text style={styles.headerButtonText}>{userExist ? 'Logout' : loginMode ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>
      </View>

      {/* show email */}
      {!userExist && <UserAuthentication loginMode={loginMode} />}

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
