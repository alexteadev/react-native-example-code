import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '../../../shared/tokens';

export default function CoursePage() {
    const { alias } = useLocalSearchParams();
    return (
        <View>
            <Text style={{ color: Colors.white }}>{alias}</Text>
        </View>
    );
}