import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Details() {
  return (
    <VStack flex={1} p={6} bg='gray.700'>
        <Header title='Request details' />

    </VStack>
  );
}