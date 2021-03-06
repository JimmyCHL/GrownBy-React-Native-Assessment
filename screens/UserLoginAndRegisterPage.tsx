import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import UserAuthentication from '../components/UserAuthentication';
import FarmsList from '../components/FarmsList';
import type { RootStackParamList } from '../App';
import { auth } from '../firebase';

type Props = NativeStackScreenProps<RootStackParamList, 'UserLoginAndRegisterPage'>;

const UserLoginAndRegisterPage = ({ navigation }: Props) => {
  const [loginMode, setLoginMode] = useState<boolean>(true);
  const [userExist, setUserExist] = useState<boolean>(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserExist(true);
      } else {
        setUserExist(false);
      }
      if (auth.currentUser) {
        setUserExist(true);
      } else {
        setUserExist(false);
      }
    });
  }, []);

  //handleAuthButton
  const handleAuthButton = () => {
    if (userExist) {
      signOut(auth).then(() => {
        setUserExist(false);
      });
      return;
    }
    setLoginMode((prev) => !prev);
  };

  //to AddFarmPage
  const addFormButtonNavigation = () => {
    navigation.navigate('AddFarmPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GrownBy</Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            handleAuthButton();
          }}
          testID="authButton"
          accessibilityLabel="authButton"
        >
          <Text style={styles.headerButtonText}>{userExist ? 'Logout' : loginMode ? 'Register' : 'Login'}</Text>
        </TouchableOpacity>
      </View>

      {/* show email */}
      {auth.currentUser && (
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello ????, {auth.currentUser?.email}</Text>
          <TouchableOpacity
            style={styles.addFarmButtonContainer}
            onPress={() => addFormButtonNavigation()}
            testID="addFarmButton"
            accessibilityLabel="addFarmButton"
          >
            <View style={styles.addFarmButtonTextContainer}>
              <Text style={styles.addFarmButtonText}>AddFarm +</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* show form */}
      {!userExist && <UserAuthentication loginMode={loginMode} />}

      {/* FarmsList */}
      <FarmsList />
    </SafeAreaView>
  );
};

export default UserLoginAndRegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  greetingContainer: {
    paddingLeft: 20,
  },
  greetingText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  addFarmButtonContainer: {
    marginTop: 5,
    marginLeft: -15,
    marginRight: 5,
    borderRadius: 10,
  },
  addFarmButtonTextContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  addFarmButtonText: {
    color: 'white',
    fontWeight: '700',
    backgroundColor: 'green',
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});
