import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Details } from '../screens/Details';
import { NewRequest } from '../screens/NewRequest';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false}}>
            <Screen name='home' component={Home} />
            <Screen name='newRequest' component={NewRequest} />
            <Screen name='details' component={Details} />
        </Navigator>
    );
}