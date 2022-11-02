import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { LOCALHOST } from "@env";
import * as SecureStore from "expo-secure-store";
import User from "../models/User";

function Login({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //login to the app
  const login = async () => {
    if (email !== "" && password !== "") {
      console.log({ email, password });
      axios
        .post(`http://${LOCALHOST}:8070/siteManagers/login`, {
          email,
          password,
        })
        .then(async (res) => {
          await storeUserData(res.data.userData);
          navigation.navigate("HomeScreen");
        })
        .catch((err) => {
          console.log(err);
          showToast("Incorrect email or password!");
        });
    } else {
      showToast("Please enter both email and password!");
    }
  };

  //store user details in secure store
  const storeUserData = async (data) => {
    try {
      const value = JSON.stringify(data);
      await SecureStore.setItemAsync("user_data", value);
      const usr = User.getUserInstance();
      usr.setFullName(data.fullName);
      usr.setSiteId(data.siteId);
      usr.setSiteName(data.siteName);
      usr.setEmail(data.email);
      usr.setPassword(data.password);
    } catch (error) {
      console.log(error);
      showToast("Error! Please try again later.");
    }
  };

  //show toast message
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.LONG);
  };

  //check if user is already logged in
  const checkIfLoggedIn = async () => {
    try {
      const user = await SecureStore.getItemAsync("user_data");
      if (user !== undefined) {
        const parsed = JSON.parse(user);
        const usr = User.getUserInstance();
        usr.setFullName(parsed.fullName);
        usr.setSiteId(parsed.siteId);
        usr.setSiteName(parsed.siteName);
        usr.setEmail(parsed.email);
        usr.setPassword(parsed.password);
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <View style={styles.inputGrp}>
        <Text style={styles.inputLbl}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setemail}
          placeholder="john@gmail.com"
        />
      </View>
      <View style={styles.inputGrp}>
        <Text style={styles.inputLbl}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setpassword}
          secureTextEntry={true}
          placeholder="Your password"
        />
      </View>
      <View style={styles.inputGrp}>
        <Pressable style={styles.btn} onPress={login}>
          <Text style={styles.btnText}>Log In</Text>
        </Pressable>
      </View>
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
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  inputGrp: {
    width: "100%",
    padding: 10,
  },
  input: {
    height: 50,
    width: "100%",
    marginTop: 5,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fdd835",
    backgroundColor: "#fff",
    fontSize: 18,
  },
  inputLbl: {
    fontSize: 18,
    fontWeight: "600",
  },
  btn: {
    width: "100%",
    backgroundColor: "#2d2d2d",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#ffd54f",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Login;
