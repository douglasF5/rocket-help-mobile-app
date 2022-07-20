import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assets/logo_secondary.svg';
import { Filter } from '../components/Filter';
import { Ticket, TicketProps } from '../components/Ticket';
import { useState } from 'react';
import { Button } from '../components/Button';


export function Home() {
    const { colors } = useTheme();
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [tickets, setTickets] = useState<TicketProps[]>([]);

    // {
    //     id: '123',
    //     patrimony: '123456',
    //     when: '18/07/2022 at 10:00',
    //     status: 'open'
    // }

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
                    icon={<SignOut size={26} color={colors.gray[300]} />}
                />
            </HStack>
            <VStack flex={1} px={6}>
                <HStack w='full' mt={8} mb={4} justifyContent='space-between' alignItems='center'>
                    <Heading color='gray.100'>
                        Meus chamados
                    </Heading>
                    <Text color='gray.200'>
                        3
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
                        title='Finished'
                        type='closed'
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>
                <FlatList
                    data={tickets}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <Ticket data={item} />}
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
                <Button title='New request'/>
            </VStack>
        </VStack>
  );
}