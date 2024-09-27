import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from './CartContext';
import { CropContext } from './CropContext';  
import { db } from '../config/FireBaseConfig';
import { collection, onSnapshot } from 'firebase/firestore'; 

const { width } = Dimensions.get('window');

export default function MainScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(CartContext);
  const { selectCrop } = useContext(CropContext);  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setFilteredProducts(productList); 
    }, (error) => {
      console.error("Error fetching products: ", error);
    });

    return () => unsubscribe(); 
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products); 
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  const renderCardItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => {
          selectCrop(item);
          navigation.navigate('CropDetails');
        }}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardPrice}>₹{item.price.toFixed(2)}/kg</Text>
          <Text style={styles.cardDescription}>{item.category}</Text>
        </View>
      </TouchableOpacity>
  
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          addToCart(item);
        }}
      >
        <Ionicons name="cart" size={24} color="#fff" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topNavBar}>
        <Text style={styles.appName}>Namaste 🙏</Text>
        <View style={styles.navBarRight}>
          <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{ uri: 'https://i.pinimg.com/736x/1c/c5/35/1cc535901e32f18db87fa5e340a18aff.jpg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchNavBar}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <FlatList
          data={filteredProducts} 
          renderItem={renderCardItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.cardColumnWrapper}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#4CAF50',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchNavBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  cardsContainer: {
    paddingHorizontal: 10,
  },
  cardColumnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    width: width / 2 - 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2, // Adds shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 12,
    color: '#777',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
