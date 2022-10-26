import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ToastAndroid,
  Pressable,
} from "react-native";
import { LOCALHOST } from "@env";
import axios from "axios";

function OrderCard({ order }) {
  const [receivedQty, setreceivedQty] = useState(0);

  const update = () => {
    axios
      .put(
        `http://${LOCALHOST}:8070/orders/updateDeliveryDetails/${order.orderId}`,
        {
          receivedQty,
        }
      )
      .then(() => {
        showToast("Updated Successfully!");
      })
      .catch((err) => {
        console.log(err);
        showToast("Error!");
      });
  };

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  useEffect(() => {
    setreceivedQty(order.receivedQty);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.headerRow, styles.bodyCont]}>
        <View>
          <Text style={styles.headerText}>{order.productName}</Text>
          <Text style={[styles.headerText, styles.subHeading]}>
            ID : {order.orderId}
          </Text>
          <Text style={[styles.headerText, styles.subHeading]}>
            Date : {new Date(order.dateOfOrder).toLocaleDateString()}
          </Text>
        </View>
        <Text
          style={[
            styles.headerText,
            order.orderStatus === "Approved"
              ? styles.approvedText
              : order.orderStatus === "Pending"
              ? styles.pendingText
              : styles.canceledText,
          ]}
        >
          {order.orderStatus}
        </Text>
      </View>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.bodyText}>Expected Qty :</Text>
        <Text style={styles.bodyText}>{order.amount}</Text>
      </View>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.bodyText}>Received Qty :</Text>
        <TextInput
          style={styles.input}
          value={receivedQty.toString()}
          onChangeText={setreceivedQty}
          keyboardType="numeric"
          editable={order.confirmation}
          selectTextOnFocus={order.confirmation}
        />
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.buttonSecondary}
          onPress={() => setreceivedQty(0)}
        >
          <Text style={styles.buttonSecondaryText}>Reset</Text>
        </Pressable>
        <Pressable style={styles.buttonPrimary} onPress={() => update()}>
          <Text style={styles.buttonPrimaryText}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#fffde7",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#fdd835",
    width: "100%",
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  bodyCont: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 18,
  },
  bodyText: {
    fontWeight: "400",
    fontSize: 14,
    marginRight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  approvedText: {
    color: "green",
  },
  pendingText: {
    color: "orange",
  },
  canceledText: {
    color: "red",
  },
  subHeading: {
    fontSize: 12,
    color: "#2d2d2d",
  },
  input: {
    fontSize: 14,
    padding: 5,
    height: 30,
    width: 40,
    borderColor: "thistle",
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: "#2d2d2d",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonPrimaryText: {
    color: "#ffd54f",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#bcbcbc",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonSecondaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OrderCard;
