import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  Alert,
} from "react-native";
import { LOCALHOST } from "@env";
import axios from "axios";
import OrderCard from "../components/OrderCard";
import User from "../models/User";

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

  useEffect(() => {
    const user = User.getUserInstance();
    setsiteId(user.getSiteId());
    getOrders(user.getSiteId());
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
