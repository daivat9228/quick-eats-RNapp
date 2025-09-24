import React, { useState, useRef, useContext } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";

import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import LogInPopup from "../components/LogInPopup";
import Navbar from "../components/Navbar";

import { storeContext } from "../context/StoreContext"; // only for food_list
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Redux
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const [category, setCategory] = useState("all");
  const [showLogin, setShowLogin] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigation = useNavigation();
  const scrollViewRef = useRef();

  const cartItem = useSelector((state) => state.cart.cartItem);

  const cartCount = Object.values(cartItem).reduce((a, b) => a + b, 0);

  const scrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(scrollY > 200);
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar
        setShowLogin={setShowLogin}
        onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
      />
      <ScrollView
        style={styles.container}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <LogInPopup visible={showLogin} setVisible={setShowLogin} />
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <View style={styles.bottomBanner}>
          <Text style={styles.liveItUpText}>Live it up!</Text>
          <Text style={styles.craftedText}>Crafted with ❤️ in Valsad, India</Text>
        </View>
      </ScrollView>

      {/* Back to Top Button */}
      {showBackToTop && (
        <View style={styles.backToTopContainer}>
          <TouchableOpacity style={styles.backToTopButton} onPress={scrollToTop}>
            <Ionicons name="arrow-up" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      )}

      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <View style={styles.cartButtonContainer}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate("CartScreen")}
          >
            <Text style={styles.cartButtonText}>Go to Cart ({cartCount})</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  bottomBanner: {
    alignItems: "flex-start",
    padding: 40,
    marginBottom: 120,
  },
  liveItUpText: { fontSize: 90, fontWeight: "bold", color: "#666" },
  craftedText: { fontSize: 20, color: "#999", marginTop: 5 },
  backToTopContainer: { position: "absolute", bottom: 80, right: 20 },
  backToTopButton: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cartButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "flex-end",
  },
  cartButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  cartButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});



// // using contextAPI ****************************************************

// import React, { useState, useContext, useRef } from "react";
// import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";

// import Header from "../components/Header";
// import ExploreMenu from "../components/ExploreMenu";
// import FoodDisplay from "../components/FoodDisplay";
// import LogInPopup from "../components/LogInPopup";
// import Navbar from "../components/Navbar";

// import { storeContext } from "../context/StoreContext";
// import { useNavigation } from "@react-navigation/native";
// import Ionicons from "react-native-vector-icons/Ionicons";


// const HomeScreen = () => {
//   const [category, setCategory] = useState("all");
//   const [showLogin, setShowLogin] = useState(false);
//   const [showBackToTop, setShowBackToTop] = useState(false); // ✅ New state
//   const { cartItem } = useContext(storeContext);
//   const navigation = useNavigation();
//   const scrollViewRef = useRef();

//   const cartCount = Object.values(cartItem).reduce((a, b) => a + b, 0);

//   const scrollToTop = () => {
//     scrollViewRef.current.scrollTo({ y: 0, animated: true });
//   };

//   // ✅ New function to handle scroll event
//   const handleScroll = (event) => {
//     const scrollY = event.nativeEvent.contentOffset.y;
//     if (scrollY > 200) { // Show the button after scrolling down 200 pixels
//       setShowBackToTop(true);
//     } else {
//       setShowBackToTop(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Navbar
//         setShowLogin={setShowLogin}
//         onMenuPress={() => navigation.openDrawer && navigation.openDrawer()}
//       />
//       <ScrollView
//         style={styles.container}
//         ref={scrollViewRef}
//         onScroll={handleScroll} // ✅ Attach the new handler
//         scrollEventThrottle={16}
//       >
//         <LogInPopup visible={showLogin} setVisible={setShowLogin} />
//         <Header />
//         <ExploreMenu category={category} setCategory={setCategory} />
//         <FoodDisplay category={category} />
//         <View style={styles.bottomBanner}>
//           <Text style={styles.liveItUpText}>Live it up!</Text>
//           <Text style={styles.craftedText}>Crafted with ❤️ in Valsad, India</Text>
//         </View>
//       </ScrollView>

//       {/* ✅ Conditionally render the "Back to top" button */}
//       {showBackToTop && (
//         <View style={styles.backToTopContainer}>
//           <TouchableOpacity
//             style={styles.backToTopButton}
//             onPress={scrollToTop}
//           >
//             <Ionicons name="arrow-up" size={25} color="#000" style={styles.backToTopText}/>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Floating Bottom Button for cart */}
//       {cartCount > 0 && (
//         <View style={styles.cartButtonContainer}>
//           <TouchableOpacity
//             style={styles.cartButton}
//             onPress={() => navigation.navigate("CartScreen")}
//           >
//             <Text style={styles.cartButtonText}>Go to Cart ({cartCount})</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   bottomBanner: {
//     alignItems: "flex-start",
//     padding: 40,
//     marginBottom: 120,
//   },
//   liveItUpText: {
//     fontSize: 90,
//     fontWeight: "bold",
//     color: "#666",
//   },
//   craftedText: {
//     fontSize: 20,
//     color: "#999",
//     marginTop: 5,
//   },
//   backToTopContainer: {
//     position: "absolute",
//     bottom: 80,
//     right: 20,
//     alignItems: "flex-end",
//   },
//   backToTopButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   backToTopText: {
//     color: '#333',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
//   cartButtonContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: "flex-end",
//   },
//   cartButton: {
//     backgroundColor: "#FF6347",
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "100%",
//   },
//   cartButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });