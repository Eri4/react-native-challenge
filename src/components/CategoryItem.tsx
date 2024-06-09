import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {useFonts} from "expo-font";

interface CategoryItemProps {
    category: {
        name: string;
        imagePath: string;
    };
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {

    let [fontsLoaded] = useFonts({
        'ProximaNovaAlt-Semibold': require('../../assets/fonts/ProximaNovaAlt-Semibold.ttf'),
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: category.imagePath }} style={styles.image} />
            <Text style={styles.categoryName}>{category.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    categoryName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'rgba(67, 67, 67)',
        marginLeft: 8,
        fontFamily: 'ProximaNovaAlt-Semibold',
    },
});


export default CategoryItem;