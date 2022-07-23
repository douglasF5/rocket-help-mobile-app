import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Ticket, TicketProps } from '../components/Ticket';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { dateFormat } from '../utils/firestoreDateFormat';


export function Home() {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [ticketsCount, setTicketsCount] = useState(0);
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [tickets, setTickets] = useState<TicketProps[]>([]);

    const navigation = useNavigation();

    function handleNewRequest() {
        navigation.navigate('newRequest');
    }

    function handleSeeDetails(ticketId: string) {
        navigation.navigate('details', { ticketId });
    }

    function handleLogOut() {
        auth()
            .signOut()
            .catch(err => {
                console.log(err);
                return Alert.alert('Log out', 'It wasn\'t possible to log you out.');
            });
    }

    useEffect(() => {
        setIsLoading(true);

        const subscriber = firestore()
            .collection('requests')
            .where('status', '==', statusSelected)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { patrimony, description, status, created_at } = doc.data();

                    return {
                        id: doc.id,
                        patrimony,
                        description,
                        status,
                        when: dateFormat(created_at)
                    }
                });
                setTickets(data);
                setTicketsCount(data.length)
                setIsLoading(false);
            });
        return subscriber;
    }, [statusSelected]);
    
    return (
        <VStack flex={1} pb={6} bg='gray.700'>
            <HStack
                w='full'
                justifyContent='space-between'
                alignItems='center'
                bg='gray.600'
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<SignOut size={26} color={colors.gray[300]}/>}
                    onPress={handleLogOut}
                />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>
                        My requests
                    </Heading>
                    <Text color='gray.200'>
                        {ticketsCount}
                    </Text>

                </HStack>
                <HStack space={3} mb={8}>
                    <Filter
                        title='In progress'
                        type='open'
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        title='Closed'
                        type='closed'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>
                {
                    isLoading
                        ? <Loading />
                        : <FlatList
                                data={tickets}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <Ticket data={item} onPress={() => handleSeeDetails(item.id)} />}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingBottom: 100
                                }}
                                ListEmptyComponent={() => (
                                    <Center>
                                        <ChatTeardropText color={colors.gray[400]} size={40} />
                                        <Text color='gray.300' mt={6} textAlign='center' fontSize={16}>
                                            You don't have {'\n'}
                                            {statusSelected === 'open' ? 'open' : 'closed'} tickets
                                        </Text>
                                    </Center>
                                )}
                            />
                }
                <Button title='New request' onPress={handleNewRequest}/>
            </VStack>
        </VStack>
  );
}