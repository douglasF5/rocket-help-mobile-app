import { useRoute } from '@react-navigation/native';
import { VStack, Text } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

type RouteParams = {
  ticketId: string;
}

export function Details() {
  const route = useRoute();
  const { ticketId } = route.params as RouteParams;

  return (
    <VStack flex={1} bg='gray.700'>
      <Header title='Request details' />
    </VStack>
  );
}