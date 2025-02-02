import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const ProductCard = ({ index, product, onAddToCart }) => {
  const [scaleValue] = useState(new Animated.Value(1))

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => onAddToCart())
  }

  return (
    <Animated.View style={[styles.productCard, { transform: [{ scale: scaleValue }], marginRight: index%2 === 0 ? 8 : 0, marginLeft: index%2 === 0 ? 0 : 8 }]}>
      <Image source={{ uri: product?.image  }} style={styles.productImage} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>R {product.price.toFixed(2)}</Text>
          <TouchableOpacity onPress={handlePress} style={styles.addButton}>
            <MaterialCommunityIcons name="cart-outline" size={12} color="#54634B" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  productCard: {
    width: '47%',
    maxWidth: 163,
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  contentContainer: {
    padding: 0,
  },
  productName: {
    fontSize: 14,
    color: "#54634B",
    fontFamily: 'Avenir',
    marginBottom: 8,
    opacity: 0.4,
    lineHeight: 20,
    height: 40,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 20,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Avenir',
    color: "#54634B",
    fontWeight: 900,
    lineHeight:20,
  },
  addButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor:"#54634B",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default ProductCard

