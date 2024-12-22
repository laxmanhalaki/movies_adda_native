import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../Screens/LoginPage';


const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Home" component={LoginPage} />
		</Stack.Navigator>
	);
}
