import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";
import { LOCALHOST } from "@env";
import axios from "axios";
import OrderCard from "../components/OrderCard";
import * as SecureStore from "expo-secure-store";

function Orders() {
  const [orders, setorders] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [refreshing, setrefreshing] = useState(false);
  const [siteId, setsiteId] = useState("");

  //fetch orders
  const getOrders = (id) => {
    setrefreshing(true);
    axios
      .get(`http://${LOCALHOST}:8070/orders/all/${id}`)
      .then((res) => {
        setorders(res.data.data);
        setrefreshing(false);
      })
      .catch((err) => {
        showAlert("Error!");
        setrefreshing(false);
      });
  };

  //show alert
  const showAlert = (msg) => {
    Alert.alert(
      "Orders",
      msg,
      [
        {
          text: "OK",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  //check if user is logged in
  const checkIfLoggedIn = async () => {
    try {
      const user = await SecureStore.getItemAsync("user_data");
      if (user !== undefined) {
        const data = JSON.parse(user);
        setsiteId(data.siteId);
        getOrders(data.siteId);
      } else {
        navigation.navigate("Login");
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
      <TextInput
        style={styles.searchInput}
        placeholder="Search here..."
        value={searchText}
        onChangeText={setsearchText}
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getOrders(siteId)}
          />
        }
      >
        {orders
          .filter((order) => {
            if (searchText !== "") {
              if (
                order.productName.trim().toLowerCase().includes(searchText) ||
                order.orderId.trim().toLowerCase().includes(searchText)
              ) {
                return order;
              }
            } else {
              return order;
            }
          })
          .map((data, index) => {
            return <OrderCard key={index} order={data} />;
          })}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0e0e0",
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
  },
  scrollViewStyle: {
    alignContent: "center",
  },
  searchInput: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "thistle",
    padding: 10,
  },
  searchInput: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#fdd835",
    backgroundColor: "#fff",
    padding: 10,
    color: "black",
  },
});

export default Orders;
