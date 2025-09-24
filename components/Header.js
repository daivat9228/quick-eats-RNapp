import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar
} from "react-native";


const Header = () => {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
      <ImageBackground
        source={require("../assets/header_img.png")}
        style={styles.headerImage}
        resizeMode="cover"
      >
        <View style={styles.overlayContent}>
          <Text style={styles.title}>
            Order your {"\n"} favourite food here
          </Text>

          <Text style={styles.description}>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Menu</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerImage: {
    height: 300,
    marginHorizontal: 20,
    borderRadius: 20,
    marginTop: 0,
    marginBottom: 20,
    overflow: "hidden",
  },
  overlayContent: {
    position: "absolute",
    bottom: "10%",
    left: 20,
    right: 20,
    flexDirection: "column",
    gap: 15,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "900",
  },
  description: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
    opacity: 0.9,
  },
  button: {
    backgroundColor: "#fff",
    width: 150,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
});
