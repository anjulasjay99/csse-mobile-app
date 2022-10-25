import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { LOCALHOST } from "@env";

function Products({ navigation }) {
  const [products, setproducts] = useState([]);
  const [searchText, setsearchText] = useState("");

  const getProducts = () => {
    axios
      .get(`http://${LOCALHOST}:8070/products`)
      .then((res) => {
        setproducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search here..."
        value={searchText}
        onChangeText={setsearchText}
      />
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {products
          .filter((prd) => {
            if (prd !== "") {
              if (
                prd.productName
                  .trim()
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase()) ||
                prd.productId
                  .trim()
                  .toLowerCase()
                  .includes(searchText.trim().toLowerCase())
              ) {
                return prd;
              }
            } else {
              return prd;
            }
          })
          .map((data, index) => {
            return (
              <ProductCard product={data} navigation={navigation} key={index} />
            );
          })}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});

export default Products;
