import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useFonts} from "expo-font";

interface CuisinesHeaderProps {
    goBack?: () => void;
    navigateToRootScreen?: () => void;
    categoryName?: string;
    imagePath?: string;
}

const CuisinesHeader: React.FC<CuisinesHeaderProps> = ({ goBack, navigateToRootScreen, categoryName, imagePath }) => {
    let [fontsLoaded] = useFonts({
        'ProximaNovaAlt-Bold': require('../../assets/fonts/ProximaNovaAlt-Bold.ttf'),
    });

    const dynamicHeader = {
        backgroundColor: categoryName ? 'rgb(255, 236, 201)' : 'rgb(237, 237, 237)',
    };

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.outerContainer}>
            <View style={[styles.headerContainer, dynamicHeader]}>
                <View style={styles.iconRow}>
                    <Image source={!imagePath ? require('../../assets/app-assets/browse-cuisines.png') : { uri: imagePath }} style={styles.headerIcon} />
                    <Text style={styles.headerText}>{categoryName || 'Cuisines'}</Text>
                </View>
                <View style={styles.iconsEnd}>
                    {goBack && (
                        <>
                            <TouchableOpacity onPress={goBack}>
                                <Image source={require('../../assets/app-assets/arrow-left.png')} />
                            </TouchableOpacity>
                            <View style={styles.verticalLine}></View>
                        </>)
                    }
                    {navigateToRootScreen && (
                        <TouchableOpacity onPress={navigateToRootScreen}>
                            <Image source={require('../../assets/app-assets/cross-mark.png')} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        paddingHorizontal: 17,
    },
    headerContainer: {
        marginTop: 10,
        backgroundColor: 'rgb(237, 237, 237)',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 17
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: 33,
        height: 33,
        marginRight: 10,
    },
    headerText: {
        fontSize: 15,
        lineHeight: 18,
        fontFamily: 'ProximaNovaAlt-Bold',
        color: 'rgba(67, 67, 67)',
    },
    iconsEnd: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto'
    },
    verticalLine: {
        height: 20,
        width: 1,
        backgroundColor: 'rgb(72,69,69)',
        marginHorizontal: 10,
    },
});

export default CuisinesHeader;
