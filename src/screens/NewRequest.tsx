import { Alert } from 'react-native';
import { VStack } from 'native-base';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export function NewRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewRequest() {
    if(!asset || !description) {
      return Alert.alert('New request', 'Fill in all fields.');
    }

    setIsLoading(true);

    firestore()
      .collection('requests')
      .add({
        asset,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Request', 'New request successfully saved.');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        return Alert.alert('Request', 'It wasn\'t possible to saved your request.');
      });
  }

  return (
    <VStack flex={1} bg='gray.600'>
      <Header title='New request'/>
      <VStack flex={1}  p={6} >
          <Input
              placeholder='Asset code'
              mt={4}
              onChangeText={setAsset}
          />
          <Input
              placeholder='Describe your request'
              flex={1}
              mt={5}
              mb={5}
              multiline
              textAlignVertical='top'
              onChangeText={setDescription}
          />
          <Button
            title='Send request'
            isLoading={isLoading}
            onPress={handleNewRequest}
          />
      </VStack>
    </VStack>
  );
}