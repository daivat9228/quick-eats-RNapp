import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { storeContext } from "../context/StoreContext"; // only for food_list
import { SafeAreaView } from "react-native-safe-area-context";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { food_list } = useContext(storeContext); // only for food data

  const cartItem = useSelector((state) => state.cart.cartItem);
  const dispatch = useDispatch();

  const cartData = food_list.filter((item) => cartItem[item.id] > 0);

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * cartItem[item.id],
    0
  );
  const deliveryFee = cartData.length > 0 ? 2 : 0;
  const total = subtotal + deliveryFee;

  // Input states
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });

  const placeOrder = () => {
    if (!address.trim()) {
      alert("Please enter delivery address!");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.trim()) {
      alert("Please enter a valid UPI ID!");
      return;
    }

    if (paymentMethod === "CARD") {
      if (
        !cardDetails.number.trim() ||
        !cardDetails.expiry.trim() ||
        !cardDetails.cvv.trim()
      ) {
        alert("Please enter complete card details!");
        return;
      }
      if (cardDetails.number.length < 12) {
        alert("Card number must be at least 12 digits!");
        return;
      }
      if (cardDetails.cvv.length < 3) {
        alert("CVV must be at least 3 digits!");
        return;
      }
    }

    alert(
      `✅ Order Placed!\n\n📍 Address: ${address}\n💳 Payment: ${paymentMethod}\n💰 Total: $${total}`
    );

    // Clear cart after placing order
    dispatch(clearCart());

    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>← </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cartData.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.name} x {cartItem[item.id]}
              </Text>
              <Text style={styles.itemPrice}>
                ${item.price * cartItem[item.id]}
              </Text>
            </View>
          ))}
          <View style={styles.itemRow}>
            <Text>Subtotal</Text>
            <Text>${subtotal}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text>Delivery Fee</Text>
            <Text>${deliveryFee}</Text>
          </View>
          <View style={styles.itemRow}>
            <Text style={{ fontWeight: "700" }}>Total</Text>
            <Text style={{ fontWeight: "700" }}>${total}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TextInput
            placeholder="Enter your delivery address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>

          {/* COD */}
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("COD")}
          >
            <Text style={styles.radio}>{paymentMethod === "COD" ? "◉" : "○"}</Text>
            <Text>Cash on Delivery</Text>
          </TouchableOpacity>

          {/* UPI */}
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("UPI")}
          >
            <Text style={styles.radio}>{paymentMethod === "UPI" ? "◉" : "○"}</Text>
            <Text>UPI</Text>
          </TouchableOpacity>
          {paymentMethod === "UPI" && (
            <TextInput
              placeholder="Enter UPI ID"
              value={upiId}
              onChangeText={setUpiId}
              style={styles.input}
            />
          )}

          {/* Card */}
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setPaymentMethod("CARD")}
          >
            <Text style={styles.radio}>{paymentMethod === "CARD" ? "◉" : "○"}</Text>
            <Text>Debit/Credit Card</Text>
          </TouchableOpacity>
          {paymentMethod === "CARD" && (
            <View>
              <TextInput
                placeholder="Card Number"
                value={cardDetails.number}
                onChangeText={(text) =>
                  setCardDetails({ ...cardDetails, number: text.replace(/[^0-9]/g, "") })
                }
                style={styles.input}
                keyboardType="numeric"
                maxLength={16}
              />
              <TextInput
                placeholder="Expiry (MM/YY)"
                value={cardDetails.expiry}
                onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
                style={styles.input}
              />
              <TextInput
                placeholder="CVV"
                value={cardDetails.cvv}
                onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                style={styles.input}
                secureTextEntry
                keyboardType="numeric"
              />
            </View>
          )}
        </View>

        {/* Place Order */}
        <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

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

  section: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  itemName: { fontSize: 15 },
  itemPrice: { fontSize: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: "#fafafa",
  },
  radioRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  radio: { fontSize: 20, marginRight: 8 },
  placeOrderBtn: {
    margin: 15,
    backgroundColor: "#FF6347",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  placeOrderText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});





// // using contextAPI ****************************************************
// import React, { useContext, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { storeContext } from "../context/StoreContext";
// import { SafeAreaView } from "react-native-safe-area-context";

// const CheckoutScreen = () => {
//   const navigation = useNavigation();
//   const { cartItem, food_list } = useContext(storeContext);

//   const cartData = food_list.filter((item) => cartItem[item.id] > 0);

//   const subtotal = cartData.reduce(
//     (acc, item) => acc + item.price * cartItem[item.id],
//     0
//   );
//   const deliveryFee = cartData.length > 0 ? 2 : 0;
//   const total = subtotal + deliveryFee;

//   // States for inputs
//   const [address, setAddress] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [upiId, setUpiId] = useState("");
//   const [cardDetails, setCardDetails] = useState({
//     number: "",
//     expiry: "",
//     cvv: "",
//   });

//   const placeOrder = () => {
//     if (!address.trim()) {
//       alert("Please enter delivery address!");
//       return;
//     }

//     if (paymentMethod === "UPI" && !upiId.trim()) {
//       alert("Please enter a valid UPI ID!");
//       return;
//     }

//     if (paymentMethod === "CARD") {
//       if (
//         !cardDetails.number.trim() ||
//         !cardDetails.expiry.trim() ||
//         !cardDetails.cvv.trim()
//       ) {
//         alert("Please enter complete card details!");
//         return;
//       }
//       if (cardDetails.number.length < 12) {
//         alert("Card number must be at least 12 digits!");
//         return;
//       }
//       if (cardDetails.cvv.length < 3) {
//         alert("CVV must be at least 3 digits!");
//         return;
//       }
//     }

//     alert(
//       `✅ Order Placed!\n\n📍 Address: ${address}\n💳 Payment: ${paymentMethod}\n💰 Total: $${total}`
//     );
//     navigation.navigate("Home"); // ya koi order success screen
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.backBtn}>← </Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Checkout</Text>
//         </View>

//         {/* Order Summary */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Order Summary</Text>
//           {cartData.map((item) => (
//             <View key={item.id} style={styles.itemRow}>
//               <Text style={styles.itemName}>
//                 {item.name} x {cartItem[item.id]}
//               </Text>
//               <Text style={styles.itemPrice}>
//                 ${item.price * cartItem[item.id]}
//               </Text>
//             </View>
//           ))}
//           <View style={styles.itemRow}>
//             <Text>Subtotal</Text>
//             <Text>${subtotal}</Text>
//           </View>
//           <View style={styles.itemRow}>
//             <Text>Delivery Fee</Text>
//             <Text>${deliveryFee}</Text>
//           </View>
//           <View style={styles.itemRow}>
//             <Text style={{ fontWeight: "700" }}>Total</Text>
//             <Text style={{ fontWeight: "700" }}>${total}</Text>
//           </View>
//         </View>

//         {/* Delivery Address */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Delivery Address</Text>
//           <TextInput
//             placeholder="Enter your delivery address"
//             value={address}
//             onChangeText={setAddress}
//             style={styles.input}
//           />
//         </View>

//         {/* Payment Method */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Payment Method</Text>

//           {/* COD */}
//           <TouchableOpacity
//             style={styles.radioRow}
//             onPress={() => setPaymentMethod("COD")}
//           >
//             <Text style={styles.radio}>
//               {paymentMethod === "COD" ? "◉" : "○"}
//             </Text>
//             <Text>Cash on Delivery</Text>
//           </TouchableOpacity>

//           {/* UPI */}
//           <TouchableOpacity
//             style={styles.radioRow}
//             onPress={() => setPaymentMethod("UPI")}
//           >
//             <Text style={styles.radio}>
//               {paymentMethod === "UPI" ? "◉" : "○"}
//             </Text>
//             <Text>UPI</Text>
//           </TouchableOpacity>
//           {paymentMethod === "UPI" && (
//             <TextInput
//               placeholder="Enter UPI ID"
//               value={upiId}
//               onChangeText={setUpiId}
//               style={styles.input}
//             />
//           )}

//           {/* Card */}
//           <TouchableOpacity
//             style={styles.radioRow}
//             onPress={() => setPaymentMethod("CARD")}
//           >
//             <Text style={styles.radio}>
//               {paymentMethod === "CARD" ? "◉" : "○"}
//             </Text>
//             <Text>Debit/Credit Card</Text>
//           </TouchableOpacity>
//           {paymentMethod === "CARD" && (
//             <View>
//               <TextInput
//                 placeholder="Card Number"
//                 value={cardDetails.number}
//                 onChangeText={(text) =>
//                   setCardDetails({
//                     ...cardDetails,
//                     number: text.replace(/[^0-9]/g, ""),
//                   })
//                 }
//                 style={styles.input}
//                 keyboardType="numeric"
//                 maxLength={16}
//               />

//               <TextInput
//                 placeholder="Expiry (MM/YY)"
//                 value={cardDetails.expiry}
//                 onChangeText={(text) =>
//                   setCardDetails({ ...cardDetails, expiry: text })
//                 }
//                 style={styles.input}
//               />
//               <TextInput
//                 placeholder="CVV"
//                 value={cardDetails.cvv}
//                 onChangeText={(text) =>
//                   setCardDetails({ ...cardDetails, cvv: text })
//                 }
//                 style={styles.input}
//                 secureTextEntry
//                 keyboardType="numeric"
//               />
//             </View>
//           )}
//         </View>

//         {/* Place Order */}
//         <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
//           <Text style={styles.placeOrderText}>PLACE ORDER</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default CheckoutScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F6FA" },
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

//   section: {
//     backgroundColor: "#fff",
//     padding: 15,
//     margin: 10,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 4,
//   },
//   itemName: { fontSize: 15 },
//   itemPrice: { fontSize: 15 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     borderRadius: 6,
//     marginTop: 8,
//     backgroundColor: "#fafafa",
//   },
//   radioRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
//   radio: { fontSize: 20, marginRight: 8 },
//   placeOrderBtn: {
//     margin: 15,
//     backgroundColor: "#FF6347",
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   placeOrderText: { color: "#fff", fontWeight: "700", fontSize: 16 },
// });

