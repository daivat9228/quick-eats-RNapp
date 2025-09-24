import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import FoodItem from "./FoodItem";
import { storeContext } from "../context/StoreContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // update path if needed

const FoodDisplay = ({ category }) => {
  const { food_list = [], loading, error } = useContext(storeContext) || {};
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);

  // Filtered data based on category
  const filteredData =
    category === "all"
      ? food_list
      : food_list.filter((item) => item.category === category);

  // Loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#ff5733" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: "red", fontSize: 16 }}>
          Something went wrong while fetching food items.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top dishes near you</Text>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodItem
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            quantity={cartItem[item.id] || 0} // pass current quantity from Redux
            onAdd={() => dispatch(addToCart(item.id))}
            onRemove={() => dispatch(removeFromCart(item.id))}
          />
        )}
        numColumns={1}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 100,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default FoodDisplay;


// // second 
// import React, { useContext } from "react";
// import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
// import FoodItem from "./FoodItem";
// import { storeContext } from "../context/StoreContext";

// const FoodDisplay = ({ category }) => {
//   const { food_list = [], loading, error } = useContext(storeContext) || {};

//   // Filtered data based on category
//   const filteredData =
//     category === "all"
//       ? food_list
//       : food_list.filter((item) => item.category === category);

//   // Loading state
//   if (loading) {
//     return (
//       <View style={[styles.container, styles.center]}>
//         <ActivityIndicator size="large" color="#ff5733" />
//       </View>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <View style={[styles.container, styles.center]}>
//         <Text style={{ color: "red", fontSize: 16 }}>
//           Something went wrong while fetching food items.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Top dishes near you</Text>

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item, index) => item.id}
//         renderItem={({ item }) => (
//           <FoodItem
//             id={item.id}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             image={item.image}
//           />
//         )}
//         numColumns={1} // 1 columns grid layout
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         nestedScrollEnabled={true}   // 👈 important
//         scrollEnabled={false}        // 👈 important
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 15,
//     color: "#333",
//   },
//   listContainer: {
//     paddingBottom: 100, // extra space for scroll
//   },
//   center: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
// });

// export default FoodDisplay;



// first 
// import React, { useContext } from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import FoodItem from "./FoodItem";
// import { storeContext } from "../context/StoreContext";

// const FoodDisplay = ({ category }) => {
//   const { food_list = [] } = useContext(storeContext) || {};

//   // Filtered data based on category
//   const filteredData =
//     category === "all"
//       ? food_list
//       : food_list.filter((item) => item.category === category);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Top dishes near you</Text>

//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item._id.toString()}
//         renderItem={({ item }) => (
//           <FoodItem
//             id={item._id}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             image={item.image}
//           />
//         )}
//         numColumns={2} // 2 columns grid layout
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//         nestedScrollEnabled={true}   // 👈 important
//         scrollEnabled={false}        // 👈 important
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 15,
//     color: "#333",
//   },
//   listContainer: {
//     paddingBottom: 100, // extra space for scroll
//   },
// });

// export default FoodDisplay;

