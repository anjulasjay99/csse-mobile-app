import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import User from "../models/User";

function Home({ navigation }) {
  //log out from the app
  const logout = () => {
    SecureStore.deleteItemAsync("user_data");
    User.destroy();
    navigation.navigate("Login");
  };

  //confirm logout
  const confirmation = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: logout,
        },
        {
          text: "No",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Site Manager</Text>
      <Pressable
        style={styles.tile}
        onPress={() => navigation.navigate("Products")}
      >
        <Image
          style={styles.tileImage}
          source={require("../assets/products.png")}
        />
        <Text style={styles.tileText}>View Products</Text>
      </Pressable>
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.tile}
          onPress={() => navigation.navigate("Orders")}
        >
          <Image
            style={styles.tileImage}
            source={require("../assets/orders.png")}
          />
          <Text style={styles.tileText}>View Orders</Text>
        </Pressable>
        <Pressable style={styles.tile} onPress={confirmation}>
          <Image
            style={styles.tileImage}
            source={require("../assets/logout.png")}
          />
          <Text style={styles.tileText}>Logout</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

//styles for the component
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  rowContainer: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tile: {
    flex: 0.5,
    width: "100%",
    backgroundColor: "#fffde7",
    borderWidth: 2,
    borderColor: "#fdd835",
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  },
  tileText: {
    fontSize: 20,
    fontWeight: "600",
  },
  tileImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
});

export default Home;
