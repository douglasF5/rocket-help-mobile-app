import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function NewRequest() {
  return (
    <VStack flex={1} p={6} bg='gray.600'>
        <Header title='Request'/>
        <Input
            placeholder='Patrimony code'
            mt={4}
        />
        <Input
            placeholder='Describe your request'
            flex={1}
            mt={5}
            mb={5}
            multiline
            textAlignVertical='top'
        />
        <Button title='Send request' />
    </VStack>
  );
}