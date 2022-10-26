import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Pressable, Image } from "react-native";

function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <Button
        title="View Products"
        onPress={() => navigation.navigate("Products")}
      /> */}
      <Text style={styles.heading}>Procurement Management</Text>
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

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
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
