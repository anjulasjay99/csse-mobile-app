import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function ProductCard({ navigation, product }) {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.headerText}>{product.productId}</Text>
        <Text style={styles.headerText}>{product.productName}</Text>
      </View>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.bodyText}>Available Quantity :</Text>
        <Text style={styles.bodyText}>{product.quantity}</Text>
      </View>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.bodyText}>Price Rate :</Text>
        <Text style={styles.bodyText}>{product.productPrice}</Text>
      </View>
      <View style={[styles.row, styles.bodyCont]}>
        <Text style={styles.bodyText}>Supplier :</Text>
        <Text style={styles.bodyText}>{product.supplierName}</Text>
      </View>
      <View style={styles.actions}>
        <Button
          title="Select"
          onPress={() => navigation.navigate("Place Order", { product })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
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
  headerText: {
    fontWeight: "700",
    fontSize: 20,
    marginRight: 20,
  },
  bodyText: {
    fontWeight: "400",
    fontSize: 18,
    marginRight: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default ProductCard;
