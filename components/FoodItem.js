import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice"; // update path if needed

const FoodItem = ({ id, name, description, image, price }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);

  const quantity = cartItem[id] || 0;

  return (
    <View style={styles.card}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

        {/* Add/Remove Counter */}
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => dispatch(addToCart(id))}
          >
            <Text style={[styles.counterText, { color: "white", fontWeight: "900" }]}>
              +
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity
              onPress={() => dispatch(removeFromCart(id))}
              style={styles.minusContainer}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.counterText}>{quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(addToCart(id))}
              style={styles.plusContainer}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRating}>
          <Text style={styles.foodName}>{name}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  addIconContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "#FF6347",
    borderRadius: 20,
    padding: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  counterContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  minusContainer: {
    backgroundColor: "#dedcdc",
    padding: 5,
    borderRadius: 20,
  },
  plusContainer: {
    backgroundColor: "#dedcdc",
    padding: 5,
    borderRadius: 20,
  },
  counterText: {
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 5,
    color: "#333",
  },
  infoContainer: {
    padding: 12,
  },
  nameRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  description: {
    fontSize: 13,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ff5733",
  },
});

export default FoodItem;



// second
// import React, { useContext } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { storeContext } from "../context/StoreContext";

// const FoodItem = ({ id, name, description, image, price }) => {
//   const { cartItem, addToCart, removeFromCart } = useContext(storeContext);

//   return (
//     <View style={styles.card}>
//       {/* Image Section */}
//       <View style={styles.imageContainer}>
//         {/* Now using URI from API */}
//         <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

//         {/* Add/Remove Counter */}
//         {!cartItem[id] ? (
//           <TouchableOpacity
//             style={styles.addIconContainer}
//             onPress={() => addToCart(id)}
//           >
//            <Text style={[styles.counterText, { color: 'white',fontWeight: 900 }]}>+</Text>
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.counterContainer}>
//             <TouchableOpacity onPress={() => removeFromCart(id)} style={styles.minusContainer}>
//               <Text style={styles.counterText}>-</Text>
//             </TouchableOpacity>

//             <Text style={styles.counterText}>{cartItem[id]}</Text>

//             <TouchableOpacity onPress={() => addToCart(id)} style={styles.plusContainer}  >
//               <Text style={styles.counterText}>+</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Info Section */}
//       <View style={styles.infoContainer}>
//         <View style={styles.nameRating}>
//           <Text style={styles.foodName}>{name}</Text>
//           {/* You can keep rating stars as static asset or ignore if not available */}
//         </View>

//         <Text style={styles.description}>{description}</Text>
//         <Text style={styles.price}>${price}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: "100%",
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   imageContainer: {
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: 180,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   addIconContainer: {
//     position: "absolute",
//     bottom: 15,
//     right: 15,
//     backgroundColor: "#FF6347",
//     color: "fff",
//     borderRadius: 20,
//     padding: 9,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   counterContainer: {
//     position: "absolute",
//     bottom: 15,
//     right: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 5,
//   },
//   minusContainer:{
//     backgroundColor:"#dedcdc",
//     padding: 5,
//     borderRadius: 20,
//   },
//   plusContainer:{
//     backgroundColor:"#dedcdc",
//     padding: 5,
//     borderRadius: 20,
//   },
 
//   counterText: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginHorizontal: 5,
//     color: "#333",
//   },
//   minusCounterText: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginHorizontal: 5,
//     color: "#d60404",
//   },
//   plusCounterText: {
//     fontSize: 18,
//     fontWeight: "700",
//     marginHorizontal: 8,
//     color: "#00ad20",
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   nameRating: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#333",
//   },
//   description: {
//     fontSize: 13,
//     color: "#666",
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#ff5733",
//   },
// });

// export default FoodItem;

// first 
// import React, { useContext } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
// import { assets } from "../assets/assets";
// import { storeContext } from "../context/StoreContext";

// const FoodItem = ({ id, name, description, image, price }) => {
//   const { cartItem, addToCart, removeFromCart } = useContext(storeContext);

//   return (
//     <View style={styles.card}>
//       {/* Image Section */}        
//       <View style={styles.imageContainer}>
//         <Image source={image} style={styles.image} resizeMode="cover" />

//         {/* Add/Remove Counter */}
//         {!cartItem[id] ? (
//           <TouchableOpacity
//             style={styles.addIconContainer}
//             onPress={() => addToCart(id)}
//           >
//             <Image source={assets.add_icon_white} style={styles.icon} />
//           </TouchableOpacity>
//         ) : (
//           <View style={styles.counterContainer}>
//             <TouchableOpacity onPress={() => removeFromCart(id)}>
//               <Image source={assets.remove_icon_red} style={styles.icon} />
//             </TouchableOpacity>

//             <Text style={styles.counterText}>{cartItem[id]}</Text>

//             <TouchableOpacity onPress={() => addToCart(id)}>
//               <Image source={assets.add_icon_green} style={styles.icon} />
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Info Section */}
//       <View style={styles.infoContainer}>
//         <View style={styles.nameRating}>
//           <Text style={styles.foodName}>{name}</Text>
//           <Image source={assets.rating_starts} style={styles.rating} />
//         </View>

//         <Text style={styles.description}>{description}</Text>
//         <Text style={styles.price}>${price}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     width: "100%",
//     borderRadius: 20,
//     backgroundColor: "#fff",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 4,
//     marginBottom: 20,
//     overflow: "hidden",
//   },
//   imageContainer: {
//     position: "relative",
//   },
//   image: {
//     width: "100%",
//     height: 180,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   addIconContainer: {
//     position: "absolute",
//     bottom: 15,
//     right: 15,
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 5,
//   },
//   counterContainer: {
//     position: "absolute",
//     bottom: 15,
//     right: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
//   counterText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginHorizontal: 8,
//   },
//   infoContainer: {
//     padding: 12,
//   },
//   nameRating: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   foodName: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#333",
//   },
//   rating: {
//     width: 80,
//     height: 20,
//     resizeMode: "contain",
//   },
//   description: {
//     fontSize: 13,
//     color: "#666",
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#ff5733",
//   },
// });

// export default FoodItem;


