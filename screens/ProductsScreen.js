import React, { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { toggleCategory } from "../store/productsSlice"
import { addToCart } from "../store/cartSlice"
import ProductCard from "../components/ProductCard"
import { Ionicons } from '@expo/vector-icons';
import { FilterIcon} from '../components/FilterIcon';

const categories = ["All", "Beef", "Fish", "Pork", "Poultry"]

const ProductsScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const { items, selectedCategories } = useSelector((state) => state.products)
  const [scrollY] = useState(new Animated.Value(0))

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 75],
    outputRange: [75, 55],
    extrapolate: "clamp",
  })

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  const filteredProducts = items.filter(
    (product) => selectedCategories.length === 0 || product.category.some((cat) => selectedCategories.includes(cat)),
  )

  return (
    <SafeAreaView style={styles.container}>
        <View style={[styles.header, styles.backArowContainer]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.filterComponent]}>
            <Ionicons name="chevron-back" size={20} color="#54634B" style={styles.backIconStyle} />
            <Text style={styles.backArrowText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterComponent}>
              <Text style={styles.backArrowText}>Filter</Text>
              <FilterIcon style={styles.filterIcon}/>
            </TouchableOpacity>
        </View>

      <View style={[styles.header, styles.titleHeight]}>
        <Text style={[styles.title]}>Meat</Text>
        <Text style={[styles.greenRectangle]}></Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, selectedCategories.includes(category) && styles.categoryButtonActive]}
              onPress={() => dispatch(toggleCategory(category))}
            >
              <Text style={[styles.categoryText, selectedCategories.includes(category) && styles.categoryTextActive]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >


        <Text style={styles.subtitle}>Based on your selection</Text>
        <Text style={styles.productsTitle}>Our products</Text>

        <View style={styles.productGrid}>
          {filteredProducts.map((product, index) => (
            <ProductCard index={index} key={product.id} product={product} onAddToCart={() => dispatch(addToCart(product))} />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backArrowText: {
    fontSize: 14,
    color: '#54634B',
    fontFamily: 'Avenir',
    lineHeight: 20,
    alignSelf:'flex-end'
  },
  titleHeight: {
    height: 75,
    marginBottom: 30
  },
  backIconStyle: {
    marginRight: 8,
  },
  greenRectangle: {
    backgroundColor: "#54634B", 
    height: 15 
  },
  backArowContainer: {
    marginBottom: 25,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 31,
  },
  filterComponent: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between'
  },
  filterIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "flex-start",
  },
  title: {
    textAlignVertical: 'top',
    fontFamily: 'AdobeGaramondProRegular',
    fontSize: 40,
    lineHeight: 50,
    color: '#54634B',
  },
  categoriesContainer: {
    marginHorizontal: 16,
    marginBottom: 40,
    textAlignVertical: 'top',
    height:28,
  },
  categoryButton: {
    paddingRight: 35,
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  categoryButtonActive: {
    backgroundColor: "transparent",
  },
  categoryText: {
    color: "#352329",
    fontSize: 14,
    fontFamily: 'Avenir',
    lineHeight: 19,
    textAlignVertical: 'top'
  },
  categoryTextActive: {
    color: "#54634B",
    fontFamily: 'Avenir',
    fontWeight: 800,
    lineHeight: 19,
    fontSize: 14,
    textAlignVertical: 'top'
  },
  subtitle: {
    fontSize: 12,
    color: "#54634B",
    marginHorizontal: 16,
    marginBottom: 12,
    fontFamily: 'Avenir',
    lineHeight: 16,
  },
  productsTitle: {
    textAlignVertical: 'top',
    fontFamily: 'AdobeGaramondProRegular',
    fontSize: 30,
    lineHeight: 40,
    color: '#54634B',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
})

export default ProductsScreen;