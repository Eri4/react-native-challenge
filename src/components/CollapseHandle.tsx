import React from 'react';
import { View, PanResponder, PanResponderInstance, Animated, StyleSheet } from 'react-native';

interface HandlebarProps {
    onCollapse: () => void;
}

const CollapseHandle: React.FC<HandlebarProps> = ({ onCollapse }) => {
    const panResponder = React.useRef<PanResponderInstance>();
    const deltaY = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        panResponder.current = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                deltaY.setValue(gestureState.dy);
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 20) {
                    onCollapse();
                }
                Animated.spring(deltaY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            },
        });
    }, [onCollapse]);

    return (
        <Animated.View
            style={{
                transform: [{ translateY: deltaY }],
            }}
            {...panResponder.current?.panHandlers}
        >
            <View style={styles.container} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 5,
        width: 50,
        backgroundColor: 'gray',
        borderRadius: 4,
        marginBottom: 5,
    },
});

export default CollapseHandle;
