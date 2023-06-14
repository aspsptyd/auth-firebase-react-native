import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import auth from '@react-native-firebase/auth';

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const handleSignin = () => {
    auth()
      .createUserWithEmailAndPassword('devadiroot@gmail.com', '!!&21adi')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Text
        style={{
          marginTop: 130,
        }}>
        {login ? 'Terontentikasi' : 'Belum terotentikasi'}
      </Text>

      <Button title="Login Email Password" onPress={() => handleSignin()} />
    </View>
  );
};

export default App;
