import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { assets } from "../assets/assets";
import { storeContext } from "../context/StoreContext";

const FoodItem = ({ id, name, description, image, price }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(storeContext);

  return (
    <View style={styles.card}>
      {/* Image Section */}        
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />

        {/* Add/Remove Counter */}
        {!cartItem[id] ? (
          <TouchableOpacity
            style={styles.addIconContainer}
            onPress={() => addToCart(id)}
          >
            <Image source={assets.add_icon_white} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={() => removeFromCart(id)}>
              <Image source={assets.remove_icon_red} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.counterText}>{cartItem[id]}</Text>

            <TouchableOpacity onPress={() => addToCart(id)}>
              <Image source={assets.add_icon_green} style={styles.icon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.nameRating}>
          <Text style={styles.foodName}>{name}</Text>
          <Image source={assets.rating_starts} style={styles.rating} />
        </View>

        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};