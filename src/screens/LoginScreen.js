import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import AppContext from "../context/AppContext";

function LoginScreen(props) {
  const [user, setUser] = useContext(AppContext);
  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync("2638491649759749");
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (result.type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${result.token}`
        );
        const fbUser = await response.json();
        setUser({
          name: fbUser.name,
        });
        return;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "387054938539-6ro6ts4p3beeo4iundr6l1qssvskbq96.apps.googleusercontent.com",
        scopes: ["profile"],
      });

      if (result.type === "success") {
        setUser({
          name: result.user.name,
          photoUrl: result.user.photoUrl,
        });
        return;
      }
    } catch ({ message }) {
      alert(`Google Login Error: ${message}`);
    }
  };

  return (
    <View style={styles.container}>
      <SocialIcon
        button
        Component={TouchableOpacity}
        type="google"
        onPress={googleSignIn}
        style={styles.social}
        title="Sign in with Google"
      />
      <SocialIcon
        button
        Component={TouchableOpacity}
        type="facebook"
        onPress={facebookSignIn}
        style={styles.social}
        title="Sign in with Facebook"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  social: {
    width: "90%",
  },
});

export default LoginScreen;
