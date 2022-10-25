import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { LOCALHOST } from "@env";

function PlaceOrder({ route }) {
  const [productName, setproductName] = useState("");
  const [productId, setproductId] = useState("");
  const [supplierName, setsupplierName] = useState("");
  const [quantity, setquantity] = useState(0);
  const [ratePrice, setratePrice] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [siteName, setsiteName] = useState("SITE 69");
  const [supplierId, setsupplierId] = useState("");
  const [siteId, setsiteId] = useState("ST001");

  const onChangeQty = (qty) => {
    setquantity(qty);
    settotalPrice(qty * ratePrice);
  };

  //submit order
  const submit = () => {
    if (
      productName !== "" &&
      productId !== "" &&
      supplierName !== "" &&
      quantity !== 0 &&
      ratePrice !== 0 &&
      totalPrice !== 0 &&
      siteName !== "" &&
      siteId !== "" &&
      supplierId !== ""
    ) {
      const data = {
        productName,
        productId,
        supplierName,
        supplierId,
        siteId,
        siteName,
        amount: quantity,
        payment: totalPrice,
      };
      axios
        .post(`http://${LOCALHOST}:8070/orders`, data)
        .then((res) => {
          showAlert(
            "This order will be sent to the management for the approval."
          );
        })
        .catch((err) => {
          console.log(err);
          showAlert("Error!");
        });
    } else {
      showAlert("Please fill all the details");
    }
  };

  const showAlert = (msg) =>
    Alert.alert(
      "Place Order",
      msg,
      [
        {
          text: "OK",
          style: "ok",
        },
      ],
      {
        cancelable: true,
      }
    );

  useEffect(() => {
    setproductName(route.params.product.productName);
    setproductId(route.params.product.productId);
    setsupplierId(route.params.product.supplierId);
    setsupplierName(route.params.product.supplierName);
    setratePrice(route.params.product.productPrice);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Product Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setproductName}
        value={productName}
        placeholder="Ex:- Cement"
      />
      <Text>Product ID</Text>
      <TextInput
        style={styles.input}
        onChangeText={setproductId}
        value={productId}
        placeholder="Ex:- P001"
      />
      <Text>Supplier Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setsupplierName}
        value={supplierName}
        placeholder="Ex:- Dammika Perera"
      />
      <Text>Quantity</Text>
      <TextInput
        style={styles.input}
        onChangeText={(qty) => onChangeQty(qty)}
        value={quantity.toString()}
        placeholder="Ex:- 10"
        keyboardType="numeric"
      />
      <Text>Rate Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={setratePrice}
        value={ratePrice.toString()}
        placeholder="Ex:- 10000"
        keyboardType="numeric"
      />
      <Text>Total Price</Text>
      <TextInput
        style={styles.input}
        onChangeText={settotalPrice}
        value={totalPrice.toString()}
        placeholder="Ex:- 20000"
        keyboardType="numeric"
      />
      <Text>Site Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setsiteName}
        value={siteName}
        placeholder="Ex:- Construction Site"
      />
      <View style={styles.actions}>
        <Button title="Clear" onPress={() => showAlert("Success")} />
        <Button title="Submit" onPress={() => submit()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 10,
  },
  input: {
    height: 40,
    marginTop: 5,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default PlaceOrder;
