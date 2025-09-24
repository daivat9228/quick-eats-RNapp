import React, { createContext, useState, useEffect } from "react";

export const storeContext = createContext(null);

const StoreContext = ({ children }) => {
  const [food_list, setFoodList] = useState([]);
  const [menu_list, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://68a76a2b639c6a54e9a1f78a.mockapi.io/store/store";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          if (data[0].food_list) setFoodList(data[0].food_list);
          if (data[0].menu_list) setMenuList(data[0].menu_list);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    food_list,
    menu_list,
    loading,
    error,
  };

  return (
    <storeContext.Provider value={contextValue}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreContext;




    
// // using contextAPI ****************************************************
// import React, { createContext, useState, useEffect } from "react";

// export const storeContext = createContext(null);

// const StoreContext = ({ children }) => {
//   const [food_list, setFoodList] = useState([]);
//   const [menu_list, setMenuList] = useState([]);
//   const [cartItem, setCartItem] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API URL
//   const API_URL = "https://68a76a2b639c6a54e9a1f78a.mockapi.io/store/store";

//   // Fetching API data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(API_URL);
//         const data = await response.json();

//         if (Array.isArray(data) && data.length > 0) {
//           if (data[0].food_list) setFoodList(data[0].food_list);
//           if (data[0].menu_list) setMenuList(data[0].menu_list);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const addToCart = (itemId) => {
//     if (!cartItem[itemId]) {
//       setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     if (cartItem[itemId] > 1) {
//       setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//     } else {
//       const updatedCart = { ...cartItem };
//       delete updatedCart[itemId];
//       setCartItem(updatedCart);
//     }
//   };

//   const contextValue = {
//     food_list,
//     menu_list,
//     cartItem,
//     setCartItem,
//     addToCart,
//     removeFromCart,
//     loading,
//     error,
//   };

//   return (
//     <storeContext.Provider value={contextValue}>
//       {children}
//     </storeContext.Provider>
//   );
// };

// export default StoreContext;

