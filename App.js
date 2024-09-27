import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';


import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import OtpVerificationScreen from './screens/OtpVerificationScreen';
import MainScreen from './screens/MainScreen';
import Profile from './screens/Profile';
import Cart from './screens/Cart';
import CheckoutScreen from './screens/Checkout';
import CustomerSignup from './screens/CustomerSignup';
import OrganizationSignup from './screens/OrganizationSignup';
import SelectionScreen from './screens/SelectionScreen';
import CropDetailsScreen from './screens/CropDetailsScreen';
import RNUpiPayment from 'react-native-upi-payment';



import { CartProvider } from './screens/CartContext';
import { UserProvider } from './screens/UserContext';
import { CropProvider } from './screens/CropContext';  


const Stack = createStackNavigator();


const theme = {
  colors: {
    primary: '#4CAF50',
    accent: '#FFC107',
    background: '#ecf0f1',
    surface: '#ffffff',
    text: '#000000',
    disabled: '#d3d3d3',
    placeholder: '#6e6e6e',
  },
  roundness: 4,
};

const App = () => {
  return (
    
    <PaperProvider theme={theme}>
      
      <UserProvider>
        <CartProvider>
          <CropProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                  },
                  headerTintColor: theme.colors.surface,
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
              >
                
                <Stack.Screen 
                  name="Welcome" 
                  component={WelcomeScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Selection" 
                  component={SelectionScreen} 
                  options={{ title: 'Sign Up as' }} 
                />
                <Stack.Screen 
                  name="CustomerSignup" 
                  component={CustomerSignup} 
                  options={{ title: 'Customer Sign Up' }} 
                />
                <Stack.Screen 
                  name="OrganizationSignup" 
                  component={OrganizationSignup} 
                  options={{ title: 'Organization Sign Up' }} 
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{ title: 'Log In' }} 
                />
                <Stack.Screen 
                  name="OtpVerification" 
                  component={OtpVerificationScreen} 
                  options={{ title: 'Verify OTP' }} 
                />
                <Stack.Screen 
                  name="Main" 
                  component={MainScreen} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="Profile" 
                  component={Profile} 
                  options={{ title: 'Profile' }} 
                />
                <Stack.Screen 
                  name="Cart" 
                  component={Cart} 
                  options={{ title: 'Cart' }} 
                />
                <Stack.Screen 
                  name="Checkout" 
                  component={CheckoutScreen} 
                  options={{ title: 'Checkout' }} 
                />
                
                <Stack.Screen 
                  name="CropDetails" 
                  component={CropDetailsScreen} 
                  options={{ title: 'Crop Details' }} 
                />
              </Stack.Navigator>
            </NavigationContainer>
          </CropProvider>
        </CartProvider>
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
