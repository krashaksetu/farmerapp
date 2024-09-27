import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';
import { Button } from 'react-native-paper';
import RNUpiPayment from 'react-native-upi-payment';

export default function Checkout() {
  const navigation = useNavigation();
  const { cartItems } = useContext(CartContext);

  // State for address, landmark, and payment method
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [showPaymentButton, setShowPaymentButton] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle place order
  const handlePlaceOrder = () => {
    if (!address || !landmark) {
      Alert.alert('Error', 'Please enter your address and nearby landmark.');
      return;
    }

    // If UPI is selected, show the payment button
    if (paymentMethod === 'UPI') {
      setShowPaymentButton(true);
      return;
    }

    // Simulate placing the order
    Alert.alert('Order Placed', 'Your order has been placed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Main') } // Navigate to MainScreen
    ]);
  };

  // UPI payment function
  const paymentGateway = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: 'bhanu2004-3okaxis', // UPI ID
        payeeName: 'BHANU SHAKYA',
        amount: totalPrice.toString(), // Convert totalPrice to string
        transactionRef: 'aasf-332-aoei-fn',
      },
      successCallback,
      failureCallback
    );
  };

  // Success callback for payment
  function successCallback(data) {
    console.log(data);
    Alert.alert('Payment Successful', 'Your payment has been processed successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Main') }
    ]);
  }

  // Failure callback for payment
  function failureCallback(data) {
    console.log(data);
    Alert.alert('Payment Failed', 'There was an issue processing your payment. Please try again.');
  }

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{`₹${item.price.toFixed(2)}`}</Text>
        <Text style={styles.itemQuantity}>{`x${item.quantity}`}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      {/* Cart Items */}
      <View style={styles.cartSection}>
        <Text style={styles.sectionTitle}>Your Cart</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id.toString()}
        />
        <Text style={styles.totalPrice}>Total: ₹{totalPrice.toFixed(2)}</Text>
      </View>

      {/* Address Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Address:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Nearby Landmark Input */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Nearby Landmark:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a nearby landmark"
          value={landmark}
          onChangeText={setLandmark}
        />
      </View>

      {/* Payment Method */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Payment Method:</Text>
        <View style={styles.paymentOptions}>
          {['UPI', 'Credit Card', 'Debit Card', 'Cash on Delivery'].map(method => (
            <TouchableOpacity
              key={method}
              onPress={() => {
                setPaymentMethod(method);
                setShowPaymentButton(method === 'UPI');
              }}
              style={[styles.paymentOption, paymentMethod === method && styles.selectedPaymentOption]}
            >
              <Text style={paymentMethod === method ? styles.selectedOption : styles.optionText}>{method}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity onPress={handlePlaceOrder} style={styles.placeOrderButton}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* UPI Payment Button */}
      {showPaymentButton && (
        <View style={styles.upiButtonContainer}>
          <Button mode="contained" onPress={paymentGateway} style={styles.upiButton}>
            Pay via UPI
          </Button>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  cartSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 18,
    flex: 2,
  },
  itemPrice: {
    fontSize: 16,
    color: '#4CAF50',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'right',
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  paymentOption: {
    padding: 10,
    borderRadius: 4,
  },
  selectedPaymentOption: {
    backgroundColor: '#e0f2f1',
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  upiButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  upiButton: {
    width: '100%',
  },
});
