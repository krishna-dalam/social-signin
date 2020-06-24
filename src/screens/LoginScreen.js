import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import AppContext from "../context/AppContext";

function LoginScreen(props) {
  const [user, setUser] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const facebookSignIn = async () => {
    setLoading(true);
    try {
      await Facebook.initializeAsync("2638491649759749");
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (result.type === "success") {
        // Get the user's name using Facebook's Graph API
        const fields = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${result.token}`
        );
        const picture = await fetch(
          `https://graph.facebook.com/me/picture?redirect=0&height=200&width=200&type=normal&access_token=${result.token}`
        );
        const fieldsResp = await fields.json();
        const pictureResp = await picture.json();
        console.log(fieldsResp);
        setUser({
          name: fieldsResp.name,
          photoUrl: pictureResp.data.url,
        });
        return;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    setLoading(false);
  };

  const googleSignIn = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LottieView
          autoPlay
          loop
          style={{ height: 200, width: 200 }}
          source={require("../assets/animations/loading.json")}
        />
      ) : (
        <>
          <SocialIcon
            button
            raised
            Component={TouchableOpacity}
            type="google"
            onPress={googleSignIn}
            style={styles.social}
            title="Sign in with Google"
          />
          <SocialIcon
            button
            raised
            Component={TouchableOpacity}
            type="facebook"
            onPress={facebookSignIn}
            style={styles.social}
            title="Sign in with Facebook"
          />
        </>
      )}
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
