import { StyleSheet, View, Image, Text, Linking } from 'react-native';
import { StudentCourseDescription } from '../../../../entities/course/model/course.model';
import { Chip } from '../../../../shared/Chip/Chip';
import { Button } from '../../../../shared/Button/Button';
import { Colors, Fonts, Gaps, Radius } from '../../../../shared/tokens';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { CourseProgress } from '../../../../entities/course/ui/CourseProgress/CourseProgress';

export function CourseCard({
    image,
    shortTitle,
    courseOnDirection,
    alias,
    tariffs,
}: StudentCourseDescription) {
    return (
        <View style={styles.card}>
            <Image
                source={require('../../../../assets/courses/full-stack.jpg')}
                style={styles.imageTemp}
            />
            <View style={styles.header}>
                <CourseProgress totalLessons={120} passedLessons={40} />
                <Text style={styles.title}>{shortTitle}</Text>
                <View style={styles.chips}>
                    {courseOnDirection.length > 0 &&
                        courseOnDirection.map((c, index) => <Chip key={index} text={c.direction.name} />)}
                </View>
                <MaskedView
                    maskElement={<Text style={styles.tariff}>Rate &laquo;{tariffs[0].name}&raquo;</Text>}
                >
                    <LinearGradient
                        colors={['#D77BE5', '#6C38CC']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={{ ...styles.tariff, ...styles.tariffWithOpacity }}>
                            Rate &laquo;{tariffs[0].name}&raquo;
                        </Text>
                    </LinearGradient>
                </MaskedView>
            </View>
            <View style={styles.footer}>
                <Button
                    text="Buy"
                    onPress={() => Linking.openURL(`https://owlunion.com/course/${alias}`)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        borderRadius: Radius.r10,
        backgroundColor: Colors.blackLight,
    },
    tariff: {
        marginTop: 10,
        fontSize: Fonts.f16,
        fontFamily: Fonts.regular,
    },
    tariffWithOpacity: {
        opacity: 0,
    },
    image: {
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    imageTemp: {
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: 335,
        height: 150,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    title: {
        fontSize: Fonts.f21,
        color: Colors.white,
        fontFamily: Fonts.semibold,
        marginBottom: 12,
    },
    chips: {
        flexDirection: 'row',
        gap: Gaps.g10,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    footer: {
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});