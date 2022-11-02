import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { LOCALHOST } from "@env";
import User from "../models/User";

function PlaceOrder({ navigation, route }) {
  const [productName, setproductName] = useState("");
  const [productId, setproductId] = useState("");
  const [supplierName, setsupplierName] = useState("");
  const [quantity, setquantity] = useState(0);
  const [ratePrice, setratePrice] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);
  const [siteName, setsiteName] = useState("");
  const [supplierId, setsupplierId] = useState("");
  const [siteId, setsiteId] = useState("");

  /*
    called when user changes qty.
    calculates total price according to qty
  */
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
          if (res.data.data.confirmation) {
            showAlert("Successful!.");
          } else {
            showAlert("This order will be reviewed by the management.");
          }
        })
        .catch((err) => {
          console.log(err);
          showAlert("Error!");
        });
    } else {
      showAlert("Please fill all the details");
    }
  };

  //show alert box
  const showAlert = (msg) =>
    Alert.alert(
      "Place Order",
      msg,
      [
        {
          text: "View Orders",
          onPress: () => navigation.navigate("Orders"),
        },
        {
          text: "OK",
        },
      ],
      {
        cancelable: true,
      }
    );

  const clear = () => {
    setquantity(0);
    settotalPrice(0);
  };

  useEffect(() => {
    const user = User.getUserInstance();
    setsiteId(user.getSiteId());
    setsiteName(user.getSiteName());
    setproductName(route.params.product.productName);
    setproductId(route.params.product.productId);
    setsupplierId(route.params.product.supplierId);
    setsupplierName(route.params.product.supplierName);
    setratePrice(route.params.product.productPrice);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.inputLabel}>Product Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setproductName}
          value={productName}
          placeholder="Ex:- Cement"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputLabel}>Product ID</Text>
        <TextInput
          style={styles.input}
          onChangeText={setproductId}
          value={productId}
          placeholder="Ex:- P001"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputLabel}>Supplier Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setsupplierName}
          value={supplierName}
          placeholder="Ex:- Dammika Perera"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputLabel}>Quantity</Text>
        <TextInput
          style={styles.input}
          onChangeText={(qty) => onChangeQty(qty)}
          value={quantity.toString()}
          placeholder="Ex:- 10"
          keyboardType="numeric"
        />
        <Text style={styles.inputLabel}>Rate Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={setratePrice}
          value={ratePrice.toString()}
          placeholder="Ex:- 10000"
          keyboardType="numeric"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputLabel}>Total Price</Text>
        <TextInput
          style={styles.input}
          onChangeText={settotalPrice}
          value={totalPrice.toString()}
          placeholder="Ex:- 20000"
          keyboardType="numeric"
          editable={false}
          selectTextOnFocus={false}
        />
        <Text style={styles.inputLabel}>Site Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setsiteName}
          value={siteName}
          placeholder="Ex:- Construction Site"
          editable={false}
          selectTextOnFocus={false}
        />
        <View style={styles.actions}>
          <Pressable style={styles.buttonSecondary} onPress={() => clear()}>
            <Text style={styles.buttonSecondaryText}>Clear</Text>
          </Pressable>
          <Pressable style={styles.buttonPrimary} onPress={() => submit()}>
            <Text style={styles.buttonPrimaryText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>

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
    padding: 0,
  },
  input: {
    height: 50,
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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  scrollView: {
    padding: 10,
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
    borderColor: "red",
    borderWidth: 1,
  },
  buttonSecondaryText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PlaceOrder;
