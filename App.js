import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

import auth from '@react-native-firebase/auth';

const App = () => {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.error('EMAIL USER: ', user?._auth?._user?.providerData[0]?.uid); // 'EMAIL USER: ', 'devadiroot@gmail.com'
        console.error('UID: ', user?._auth?._user?.uid); // 'UID: ', 'X46vRIFkqmNSJJcGKeeeybMokx42'
        console.error( // 'METADATA: ', 'Last Sign In: 2023-06-14T06:27:22.104Z', 'Creation Time: 2023-06-14T06:11:37.719Z'
          'METADATA: ',
          'Last Sign In: ' + user?._auth?._user?.metadata?.lastSignInTime,
          'Creation Time: ' + user?._auth?._user?.metadata?.creationTime,
        );
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const handleSignUpAccountEmail = () => {
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

  const handleSignInAccountEmail = () => {
    auth()
      .signInWithEmailAndPassword('devadiroot@gmail.com', '!!&21adi')
      .then(() => {
        console.log('User account signed in!');
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

  const handleSignOutAccountEmail = () => {
    auth()
      .signOut()
      .then(res => console.log('User signed out! : ', res));
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

      {login ? (
        <Button title="Signout" onPress={() => handleSignOutAccountEmail()} />
      ) : (
        <View>
          <Button
            title="Sign Up Email Password"
            onPress={() => handleSignUpAccountEmail()}
          />
          <Button
            title="Sign In Email Password"
            onPress={() => handleSignInAccountEmail()}
          />
        </View>
      )}
    </View>
  );
};

export default App;
