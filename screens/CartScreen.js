import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { storeContext } from "../context/StoreContext";
import { SafeAreaView } from "react-native-safe-area-context";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../redux/cartSlice";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { food_list } = useContext(storeContext); // only API data
  const cartItem = useSelector((state) => state.cart.cartItem);

  const cartData = food_list.filter((item) => cartItem[item.id] > 0);

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * cartItem[item.id],
    0
  );
  const deliveryFee = cartData.length > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* If empty */}
      {cartData.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Your cart is empty 😕</Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
            {/* Cart Items */}
            {cartData.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => dispatch(removeFromCart(item.id))}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyCount}>{cartItem[item.id]}</Text>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => dispatch(addToCart(item.id))}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                  <Text style={styles.removeBtn}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Promo Section */}
            <View style={styles.promoBox}>
              <Text style={{ color: "#333", fontWeight: "600" }}>
                If you have a promo code, enter it here
              </Text>
              <View style={styles.promoInputRow}>
                <TextInput
                  placeholder="Promo code"
                  style={styles.promoInput}
                  placeholderTextColor="#555"
                />
                <TouchableOpacity style={styles.promoBtn}>
                  <Text style={styles.promoBtnText}>Submit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.helpText}>
                Need help? <Text style={styles.contactText}>Contact us</Text>
              </Text>
            </View>
          </ScrollView>

          {/* Totals Section */}
          <View style={styles.totalBox}>
            <Text style={styles.totalTitle}>Cart Totals</Text>
            <View style={styles.totalRow}>
              <Text>Subtotal</Text>
              <Text>${subtotal}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Delivery fee</Text>
              <Text>${deliveryFee}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={{ fontWeight: "700" }}>Total</Text>
              <Text style={{ fontWeight: "700" }}>${total}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate("Checkout")}
            >
              <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

// Styles remain same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: { fontSize: 30, color: "#0f0f0f", marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#333" },

  emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#888" },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 10 },
  itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
  itemPrice: { fontSize: 14, color: "#666", marginVertical: 4 },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  qtyBtn: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  qtyText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  qtyCount: { marginHorizontal: 10, fontSize: 16, fontWeight: "600" },
  removeBtn: { color: "red", fontWeight: "700", marginLeft: 8 },

  promoBox: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 35,
  },
  promoInputRow: { flexDirection: "row", marginTop: 8 },
  promoInput: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  promoBtn: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 4,
  },
  promoBtnText: { color: "#fff", fontSize: 14 },
  helpText: { marginTop: 10, fontSize: 13, color: "#555" },
  contactText: { color: "#FF6347", fontWeight: "600" },

  totalBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    marginBottom: 25,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    borderRadius: 20,
    shadowRadius: 4,
    elevation: 6,
  },
  totalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  checkoutBtn: {
    marginTop: 12,
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "700" },
});



// first using contextAPI *********************************************************************
// import React, { useContext } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { storeContext } from "../context/StoreContext";
// import { SafeAreaView } from "react-native-safe-area-context";


// const CartScreen = () => {
//   const navigation = useNavigation();
//   const { cartItem, food_list, addToCart, removeFromCart } =
//     useContext(storeContext);

//   const cartData = food_list.filter((item) => cartItem[item.id] > 0);

//   const subtotal = cartData.reduce(
//     (acc, item) => acc + item.price * cartItem[item.id],
//     0
//   );
//   const deliveryFee = cartData.length > 0 ? 2 : 0;
//   const total = subtotal + deliveryFee;

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Text style={styles.backBtn}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>My Cart</Text>
//       </View>

//       {/* If empty */}
//       {cartData.length === 0 ? (
//         <View style={styles.emptyBox}>
//           <Text style={styles.emptyText}>Your cart is empty 😕</Text>
//         </View>
//       ) : (
//         <>
//           {/* Scrollable Items + Promo */}
//           <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
//             {/* Cart Items as cards */}
//             {cartData.map((item) => (
//               <View key={item.id} style={styles.itemCard}>
//                 <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="cover" />
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.name}</Text>
//                   <Text style={styles.itemPrice}>${item.price}</Text>
//                   <View style={styles.qtyRow}>
//                     <TouchableOpacity
//                       style={styles.qtyBtn}
//                       onPress={() => removeFromCart(item.id)}
//                     >
//                       <Text style={styles.qtyText}>-</Text>
//                     </TouchableOpacity>
//                     <Text style={styles.qtyCount}>{cartItem[item.id]}</Text>
//                     <TouchableOpacity
//                       style={styles.qtyBtn}
//                       onPress={() => addToCart(item.id)}
//                     >
//                       <Text style={styles.qtyText}>+</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//                 <TouchableOpacity onPress={() => removeFromCart(item.id)}>
//                   <Text style={styles.removeBtn}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}

//             {/* Promo Code Section */}
//             <View style={styles.promoBox}>
//               <Text style={{ color: "#333", fontWeight: "600" }}>
//                 If you have a promo code, enter it here
//               </Text>
//               <View style={styles.promoInputRow}>
//                 <TextInput
//                   placeholder="Promo code"
//                   style={styles.promoInput}
//                   placeholderTextColor="#555"
//                 />
//                 <TouchableOpacity style={styles.promoBtn}>
//                   <Text style={styles.promoBtnText}>Submit</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={styles.helpText}>
//                 Need help? <Text style={styles.contactText}>Contact us</Text>
//               </Text>
//             </View>
//           </ScrollView>

//           {/* Cart Totals Section (sticky at bottom) */}
//           <View style={styles.totalBox}>
//             <Text style={styles.totalTitle}>Cart Totals</Text>
//             <View style={styles.totalRow}>
//               <Text>Subtotal</Text>
//               <Text>${subtotal}</Text>
//             </View>
//             <View style={styles.totalRow}>
//               <Text>Delivery fee</Text>
//               <Text>${deliveryFee}</Text>
//             </View>
//             <View style={styles.totalRow}>
//               <Text style={{ fontWeight: "700" }}>Total</Text>
//               <Text style={{ fontWeight: "700" }}>${total}</Text>
//             </View>
//             <TouchableOpacity style={styles.checkoutBtn} onPress={() => navigation.navigate("Checkout")}>
//               <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// export default CartScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F6FA",
    
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#fff",
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   backBtn: { fontSize: 30, color: "#0f0f0f", marginRight: 10 },
//   headerTitle: { fontSize: 20, fontWeight: "700", color: "#333" },

//   emptyBox: { flex: 1, justifyContent: "center", alignItems: "center" },
//   emptyText: { fontSize: 18, color: "#888" },

//   itemCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     margin: 10,
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     elevation: 2,
//   },
//   itemImage: { width: 70, height: 70, borderRadius: 8 },
//   itemInfo: { flex: 1, marginLeft: 10 },
//   itemName: { fontSize: 16, fontWeight: "600", color: "#333" },
//   itemPrice: { fontSize: 14, color: "#666", marginVertical: 4 },
//   qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
//   qtyBtn: {
//     backgroundColor: "#eee",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 5,
//   },
//   qtyText: { fontSize: 18, fontWeight: "bold", color: "#333" },
//   qtyCount: { marginHorizontal: 10, fontSize: 16, fontWeight: "600" },
//   removeBtn: { color: "red", fontWeight: "700", marginLeft: 8 },

//   promoBox: {
//     backgroundColor: "#fff",
//     padding: 14,
//     borderRadius: 8,
//     elevation: 2,
//     marginHorizontal: 10,
//     marginTop: 15,
//     marginBottom: 35,
//   },
//   promoInputRow: { flexDirection: "row", marginTop: 8 },
//   promoInput: {
//     flex: 1,
//     backgroundColor: "#eee",
//     paddingHorizontal: 8,
//     borderRadius: 4,
//     marginRight: 6,
//   },
//   promoBtn: {
//     backgroundColor: "#000",
//     paddingHorizontal: 12,
//     justifyContent: "center",
//     borderRadius: 4,
//   },
//   promoBtnText: { color: "#fff", fontSize: 14 },
//   helpText: { marginTop: 10, fontSize: 13, color: "#555" },
//   contactText: { color: "#FF6347", fontWeight: "600" },

//   totalBox: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "#fff",
//     padding: 20,
//     margin: 10,
//     marginBottom: 25,
//     borderTopWidth: 1,
//     borderTopColor: "#ddd",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     borderRadius: 20,
//     shadowRadius: 4,
//     elevation: 6,
//   },
//   totalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 8,
//   },
//   checkoutBtn: {
//     marginTop: 12,
//     backgroundColor: "#FF6347",
//     paddingVertical: 12,
//     borderRadius: 6,
//     alignItems: "center",
//   },
//   checkoutText: { color: "#fff", fontWeight: "700" },
// });
