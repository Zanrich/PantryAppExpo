// import React from 'react';
// import { View , Text} from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Feather } from '@expo/vector-icons';
// import ProductsScreen from '../screens/ProductsScreen';
// import CartScreen from '../screens/CartScreen';
// import { useSelector } from 'react-redux';
// import {HomeIcon} from '../components/HomeIcon'

// const Tab = createBottomTabNavigator();

// const PlaceholderScreen = () => <View />;

// export default function TabNavigator() {
//   const cartItems = useSelector(state => state.cart.items);
//   const cartItemCount = cartItems.length;

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#54634B',
//           borderTopWidth: 0,
//           height: 60,
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//         tabBarActiveTintColor: '#FCF9F5',
//         tabBarInactiveTintColor: '#FCF9F550',
//       }}
//     >
//       <Tab.Screen
//         name="Products"
//         component={ProductsScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             // <HomeIcon style={{height: 24, width: 24}}/>
//             <Feather name="home" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Favorites"
//         component={PlaceholderScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Feather name="heart" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={PlaceholderScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Feather name="search" size={24} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Cart"
//         component={CartScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <View>
//               <Feather name="shopping-bag" size={24} color={color} />
//               {cartItemCount > 0 && (
//                 <View style={{
//                   position: 'absolute',
//                   right: -6,
//                   top: -6,
//                   backgroundColor: '#4A5D4F',
//                   borderRadius: 10,
//                   width: 16,
//                   height: 16,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                   <Text style={{
//                     color: '#fff',
//                     fontSize: 10,
//                     fontWeight: 'bold',
//                   }}>
//                     {cartItemCount}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={PlaceholderScreen}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Feather name="user" size={24} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import ProductsScreen from '../screens/ProductsScreen';
import CartScreen from '../screens/CartScreen';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const PlaceholderScreen = () => <View />;

export default function TabNavigator() {
  const cartItems = useSelector(state => state.cart.items);
  const cartItemCount = cartItems.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false, // Hide tab names
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FCF9F5',
        tabBarInactiveTintColor: '#FCF9F550',
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;
          if (route.name === 'Products') {
            iconName = 'store';
          } else if (route.name === 'Favorites') {
            iconName = 'heart-outline';
          } else if (route.name === 'Search') {
            IconComponent = FontAwesome;
            iconName = 'search';
          } else if (route.name === 'Cart') {
            iconName = 'cart';
          } else if (route.name === 'Profile') {
            IconComponent = Ionicons;
            iconName = 'person-outline';
          }
          return (
            <View style={styles.iconContainer}>
              <IconComponent name={iconName} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Favorites" component={PlaceholderScreen} />
      <Tab.Screen name="Search" component={PlaceholderScreen} />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarIcon: ({ color, focused }) => (
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons name="cart" size={24} color={color} />
            {focused && <View style={styles.indicator} />}
            {cartItemCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartItemCount}</Text>
              </View>
            )}
          </View>
        ),
      }}/>
      <Tab.Screen name="Profile" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#54634B',
    borderTopWidth: 0,
    height: 68,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 15,
  },
  iconContainer: {
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FCF9F5',
    marginTop: 2,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -3,
    backgroundColor: '#4A5D4F',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
