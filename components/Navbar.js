import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";

const Navbar = ({ setShowLogin, onMenuPress }) => {
  return (
    <View style={styles.header}>
      {/* Center: Logo */}
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right: Profile icon */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setShowLogin(true)}
      >
        <Image
          source={require("../assets/profile_icon.png")}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "android" ? 100 : 80,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    flex: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  logo: {
    width: 100,
    height: 20,
    margin: 15,
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    margin: 15,
  },
});

export default Navbar;
