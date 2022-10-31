import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  RefreshControl,
} from "react-native";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { LOCALHOST } from "@env";

function Products({ navigation }) {
  const [products, setproducts] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [refreshing, setrefreshing] = useState(false);

  //fetch all available products
  const getProducts = () => {
    setrefreshing(true);
    axios
      .get(`http://${LOCALHOST}:8070/products`)
      .then((res) => {
        setproducts(res.data.data);
        setrefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setrefreshing(false);
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
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getProducts} />
        }
      >
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
    borderRadius: 5,
    borderColor: "#fdd835",
    backgroundColor: "#fff",
    padding: 10,
    color: "black",
  },
});

export default Products;
