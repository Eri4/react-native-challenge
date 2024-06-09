import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import {useFonts} from "expo-font";

const FilterButtonsContainer = () => {
    const [filterButtonScale] = useState(new Animated.Value(1));

    let [fontsLoaded] = useFonts({
        'ProximaNovaAlt-Bold': require('../../assets/fonts/ProximaNovaAlt-Bold.ttf'),
    });

    const handleFilterButtonPress = () => {
        Animated.spring(filterButtonScale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handleFilterButtonRelease = () => {
        Animated.spring(filterButtonScale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const filterButtonAnimatedStyle = {
        transform: [{ scale: filterButtonScale }],
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.filterContainer}>
            <Animated.View style={[styles.filterButton, filterButtonAnimatedStyle]}>
                <TouchableOpacity
                    onPressIn={() => handleFilterButtonPress()}
                    onPressOut={() => handleFilterButtonRelease()}
                >
                    <Text style={styles.filterButtonText}>Anytime</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.filterButton, filterButtonAnimatedStyle]}>
                <TouchableOpacity
                    onPressIn={() => handleFilterButtonPress()}
                    onPressOut={() => handleFilterButtonRelease()}
                >
                    <Text style={styles.filterButtonText}>Any price</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.filterButton, filterButtonAnimatedStyle]}>
                <TouchableOpacity
                    onPressIn={() => handleFilterButtonPress()}
                    onPressOut={() => handleFilterButtonRelease()}
                >
                    <Text style={styles.filterButtonText}>Any rating</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.filterButton, filterButtonAnimatedStyle]}>
                <TouchableOpacity
                    onPressIn={() => handleFilterButtonPress()}
                    onPressOut={() => handleFilterButtonRelease()}
                >
                    <Text style={styles.filterButtonText}>All chains</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    filterButton: {
        flex: 1,
        height: 40,
        backgroundColor: 'rgb(236, 236, 236)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    filterButtonText: {
        fontSize: 11.5,
        lineHeight: 15,
        textTransform: 'uppercase',
        fontFamily: 'ProximaNovaAlt-Bold',
        color: 'rgba(136, 136, 136)',
    },
});

export default FilterButtonsContainer;