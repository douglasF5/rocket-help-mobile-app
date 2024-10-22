import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if(timestamp) {
        const date = new Date(timestamp.toDate());
        const day = date.toLocaleDateString('en-US');
        const hour = date.toLocaleTimeString('en-US');

        return `${day} at ${hour}`;
    }
}