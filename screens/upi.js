import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import RNUpiPayment from 'react-native-upi-payment';

const UPI = () => {
    const paymentGateway=()=>{
        RNUpiPayment.initializePayment(
            {
              vpa: 'bhanu2004-3okaxis', // or can be john@ybl or mobileNo@upi
              payeeName: 'BHANU SHAKYA',
              amount: '10',
              transactionRef: 'aasf-332-aoei-fn',
            },
            successCallback,
            failureCallback
          );
    }
    function successCallback(data) {
        // do whatever with the data
        console.log(data);
      }
      
      function failureCallback(data) {
        // do whatever with the data
        console.log(data);
      }
    return (
    <View>
        <Text>
            <Button title="Pay" onPress={paymentGateway}>Pay</Button>
        </Text>
    </View>
    )
};