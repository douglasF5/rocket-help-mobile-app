import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import auth from '@react-native-firebase/auth';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    function handleSignIn() {
        if(!email || !password) {
            return Alert.alert('Sign in', 'Enter email and password.');
        }

        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Heading
                color='gray.100'
                fontSize='xl'
                mt={20}
                mb={6}
            >
                Acces your account
            </Heading>
            <Input
                mb={4}
                placeholder='E-mail'
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />
            <Input
                mb={8}
                placeholder='Password'
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                secureTextEntry
                onChangeText={setPassword}
            />

            <Button
                title='Sign in'
                w='full'
                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    );
}