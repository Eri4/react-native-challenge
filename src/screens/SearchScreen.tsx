import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen: React.FC = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const openCategoryModal = () => {
        navigation.navigate('Category');
    };

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Icon name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.optionButton} onPress={openCategoryModal}>
                    <Image source={ require('../../assets/app-assets/browse-cuisines.png')} />
                    <Text style={styles.optionText}>Categories</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#333',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 20,
    },
    optionButton: {
        alignItems: 'center',
    },
    optionText: {
        marginTop: 5,
        fontSize: 12,
        color: '#333',
    },
});

export default SearchScreen;