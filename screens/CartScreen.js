import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { updateQuantity, removeFromCart } from '../store/cartSlice';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => (
  <View style={styles.cartItem}>
    <Image source={{ uri: item.image }} style={styles.itemImage} />
    <View style={styles.itemDetails}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
      <View style={styles.quantityControls}>
      <TouchableOpacity
        onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
      >
        <Text style={styles.quantityButton}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{item.quantity}</Text>
      <TouchableOpacity
        onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
      >
        <Text style={styles.quantityButton}>+</Text>
      </TouchableOpacity>
    </View>
    </View>
    
  </View>
);

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, total, deliveryFee } = useSelector(state => state.cart);

  return (
    <SafeAreaView style={styles.container}>
              <View style={[styles.header, styles.backArowContainer]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Ionicons name="chevron-back" size={20} color="#54634B" />
                </TouchableOpacity>
              </View>

               <View style={styles.welcomeContainer}>
                 <Text style={styles.welcomeTitle}>Cart</Text>
                 <Text style={styles.greenRectangle}/>
               </View>

      <ScrollView style={styles.content}>
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={(id, quantity) => 
              dispatch(updateQuantity({ id, quantity }))
            }
            onRemove={(id) => dispatch(removeFromCart(id))}
          />
        ))}

        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Add your promo code"
          />
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub total</Text>
            <Text style={styles.summaryValue}>R {total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>R {deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              R {(total + deliveryFee).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    height: '20px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArowContainer: {
    marginBottom: 16,
    height: 20,
  },
  welcomeContainer: {
    top: 0,
    marginBottom: 24,
    height: 65,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  welcomeTitle: {
    fontFamily: 'AdobeGaramondProBoldItalic',
    fontSize: 40,
    lineHeight: 50,
    color: '#54634B',

  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#54634B',
    fontFamily: 'Avenir',
    lineHeight: 24,
    marginBottom: 8,
  },
  greenRectangle: {
    backgroundColor: "#54634B", 
    height: 15 
  },
  content: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    height: 126
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    flexDirection: 'column',
    display: 'flex',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Avenir',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4A5D4F',
    fontWeight: '600',
  },
  removeButton: {
    marginTop: 8,
  },
  removeButtonText: {
    color: '#4A5D4F',
    fontSize: 14,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  quantityButton: {
    fontSize: 20,
    color: '#4A5D4F',
    paddingHorizontal: 12,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  promoContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  promoButton: {
    backgroundColor: '#4A5D4F',
    borderRadius: 25,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  promoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  summaryContainer: {
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#666',
  },
  summaryValue: {
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5D4F',
  },
  checkoutButton: {
    backgroundColor: '#54634B',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
});