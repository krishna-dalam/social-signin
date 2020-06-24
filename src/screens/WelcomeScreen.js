import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image, Avatar, Text, colors } from "react-native-elements";

import AppContext from "../context/AppContext";

function WelcomeScreen(props) {
  const [user, setUser] = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Image
        source={user.photoUrl && { uri: user.photoUrl }}
        style={styles.image}
        PlaceholderContent={
          <Avatar icon={{ name: "user", type: "font-awesome" }} size={200} />
        }
      />
      <Text h4 style={styles.text}>
        Welcome {user.name}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setUser(null);
        }}
        style={styles.logout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    // flexDirection: "row",
    marginTop: 25,
    width: "80%",
    backgroundColor: colors.warning,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    marginTop: 15,
  },
});

export default WelcomeScreen;
