// import React from "react";
// import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
// import { menu_list } from "../assets/assets"; 

// const ExploreMenu = ({ category, setCategory }) => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Explore our menu</Text>
//       <Text style={styles.subHeading}>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt illum
//         deleniti laborum.
//       </Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.menuList}
//       >
//         {menu_list.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.menuItem}
//             onPress={() =>
//               setCategory((prev) => (prev === item.menu_name ? "all" : item.menu_name))
//             }
//           >
//             <Image
//               source={item.menu_image}
//               style={[
//                 styles.menuImage,
//                 category === item.menu_name && styles.activeImage,
//               ]}
//             />
//             <Text
//               style={[
//                 styles.menuText,
//                 category === item.menu_name && styles.activeText,
//               ]}
//             >
//               {item.menu_name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       <View style={styles.divider} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     gap: 10,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#27272a", // zinc-800
//   },
//   subHeading: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#27272a",
//   },
//   menuList: {
//     marginVertical: 15,
//   },
//   menuItem: {
//     alignItems: "center",
//     marginRight: 15,
//   },
//   menuImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 2,
//     borderColor: "transparent",
//   },
//   activeImage: {
//     borderColor: "tomato",
//     borderWidth: 3,
//   },
//   menuText: {
//     marginTop: 5,
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#3f3f46", // zinc-700
//   },
//   activeText: {
//     color: "orange",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#d4d4d8", // zinc-300
//     marginTop: 10,
//   },
// });

// export default ExploreMenu;


import React, { useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { storeContext } from "../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list = [] } = useContext(storeContext); // get from context

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore our menu</Text>
      <Text style={styles.subHeading}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt illum
        deleniti laborum.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.menuList}
      >
        {menu_list.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() =>
              setCategory((prev) => (prev === item.menu_name ? "all" : item.menu_name))
            }
          >
            <Image
              source={{ uri: item.menu_image }} // use API URL
              style={[
                styles.menuImage,
                category === item.menu_name && styles.activeImage,
              ]}
            />
            <Text
              style={[
                styles.menuText,
                category === item.menu_name && styles.activeText,
              ]}
            >
              {item.menu_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.divider} />
    </View>
  );
};

export default ExploreMenu;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#27272a",
  },
  subHeading: {
    fontSize: 14,
    fontWeight: "600",
    color: "#27272a",
  },
  menuList: {
    marginVertical: 15,
  },
  menuItem: {
    alignItems: "center",
    marginRight: 15,
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeImage: {
    borderColor: "tomato",
    borderWidth: 3,
  },
  menuText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "500",
    color: "#3f3f46",
  },
  activeText: {
    color: "orange",
  },
  divider: {
    height: 1,
    backgroundColor: "#d4d4d8",
    marginTop: 10,
  },
});

