/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, Image, Dimensions, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useEffect, useState } from 'react';
import { CustomLink } from '../shared/CustomLink/CustomLink';
import { useAtom } from 'jotai';
import { loginAtom } from '../entities/auth/model/auth.state';
import { router } from 'expo-router';
import { useScreenOrientation } from '../shared/hooks';
import { Orientation } from 'expo-screen-orientation';

export default function Login() {
    const [localError, setLocalError] = useState<string | undefined>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [{ access_token, isLoading, error }, login] = useAtom(loginAtom);
    const orientation = useScreenOrientation();

    const submit = () => {
        if (!email) {
            setLocalError('Email not entered');
            return;
        }
        if (!password) {
            setLocalError('No password entered');
            return;
        }
        login({ email, password });
    };

    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    useEffect(() => {
        if (access_token) {
            router.replace('/(app)');
        }
    }, [access_token]);

    return (
        <View style={styles.container}>
            <ErrorNotification error={localError} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.logoForm}>
                    <Image
                        style={styles.logoImg}
                        source={require('../assets/logo.png')}
                        resizeMode='contain'
                    />
                    <Text style={styles.logoText}>OwlUnion</Text>
                </View>
                <View style={styles.form}>
                    <View
                        style={{
                            ...styles.inputs,
                            flexDirection: orientation === Orientation.PORTRAIT_UP ? 'column' : 'row',
                        }}
                    >
                        <Input
                            style={{
                                width:
                                    orientation === Orientation.PORTRAIT_UP
                                        ? 'auto'
                                        : Dimensions.get('window').width / 2 - 16 - 48,
                            }}
                            placeholder="Email"
                            onChangeText={setEmail}
                        />
                        <Input
                            style={{
                                width:
                                    orientation === Orientation.PORTRAIT_UP
                                        ? 'auto'
                                        : Dimensions.get('window').width / 2 - 16 - 48,
                            }}
                            isPassword
                            placeholder="Password"
                            onChangeText={setPassword}
                        />
                    </View>
                    <Button text="Sign In" onPress={submit} isLoading={isLoading} />
                </View>
                <CustomLink href={'/restore'} text="Restore password" />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 55,
        backgroundColor: Colors.black,
    },
    content: {
        alignItems: 'center',
        gap: Gaps.g50,
    },
    form: {
        alignSelf: 'stretch',
        gap: Gaps.g16,
    },
    logo: {
        width: 30,
        height: 30
    },
    inputs: {
        gap: Gaps.g16,
    },
    logoForm: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    logoImg: {
        width: 30,
        height: 30
    },
    logoText: {
        fontSize: 18,
        color: '#CCCCCC'
    }
});
