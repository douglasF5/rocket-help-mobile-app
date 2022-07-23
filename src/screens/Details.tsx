import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { dateFormat } from '../utils/firestoreDateFormat';
import { useNavigation } from '@react-navigation/native';

import { TicketProps } from '../components/Ticket';
import { TicketFirestoreDTO } from '../DTOs/TicketDTO';

import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base';
import { Header } from '../components/Header';
import { CardDetails } from '../components/CardDetails';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Loading } from '../components/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText } from 'phosphor-react-native';
import { Alert } from 'react-native';

type RouteParams = {
  ticketId: string;
}

type TicketDetails = TicketProps & {
  description: string;
  solution: string;
  closed: string;
}

export function Details() {
  const [ticket, setTicket] = useState<TicketDetails>({} as TicketDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const route = useRoute();
  const { ticketId } = route.params as RouteParams;
  const { colors } = useTheme();
  const statusColor = ticket.status === 'open' ? colors.secondary[700] : colors.green[300];
  const statusTitle = ticket.status === 'open' ? 'In progress' : 'Closed';
  const navigation = useNavigation();

  function handleCloseTicket() {
    if(!solution) {
      return Alert.alert('Close ticket', 'Enter a solution before closing this ticket.');
    }

    firestore()
      .collection<TicketFirestoreDTO>('requests')
      .doc(ticketId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Ticket closed', 'The ticket have been successfully closed.');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Ticket closed', 'It\'s not possible to close this ticket at the moment.');
      });
  }

  useEffect(() => {
    setIsLoading(true);
    firestore()
      .collection<TicketFirestoreDTO>('requests')
      .doc(ticketId)
      .get()
      .then((doc) => {
        const { asset, description, status, created_at, closed_at, solution } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setTicket({
          id: doc.id,
          asset,
          description,
          status,
          solution,
          when: dateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg='gray.700'>
      <Header title='Ticket details' />
      <HStack
        bg='gray.500'
        justifyContent='center'
        p={4}
      >
        {
          ticket.status === 'closed'
          ? <CircleWavyCheck size={22} color={statusColor} />
          : <Hourglass size={22} color={statusColor} />
        }
        <Text
          textTransform='uppercase'
          color={statusColor}
          ml={2}
        >
          {statusTitle}
        </Text>
      </HStack>
      <ScrollView
        p={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
      >
        <CardDetails
          title='Equipment'
          description={`Asset ${ticket.asset}`}
          icon={DesktopTower}
        />
        <CardDetails
          title='Problem details'
          description={ticket.description}
          icon={ClipboardText}
          footer={`Create on ${ticket.when}`}
        />
        <CardDetails
          title='Solution'
          icon={CircleWavyCheck}
          description={ticket.solution}
          footer={ticket.status === 'closed' && `Closed on ${ticket.closed}`}
        >
          {
            ticket.status === 'open'
              && <Input
                  placeholder='Describe the solution'
                  flex={1}
                  mb={5}
                  multiline
                  textAlignVertical='top'
                  h={24}
                  onChangeText={setSolution}
                />
          }
        </CardDetails>
      </ScrollView>
      {
        !(ticket.status === 'closed')
          && <Button
              title='Close ticket'
              onPress={handleCloseTicket}
              m={5}
            />
      }
    </VStack>
  );
}