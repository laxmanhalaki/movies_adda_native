import AsyncStorage from "@react-native-async-storage/async-storage";

const addToken = async (value) => {
	try {
		await AsyncStorage.setItem('token', value);
	} catch (e) {
		// saving error
		console.log(e);
	}
};
const removeToken = async () => {
	try {
		await AsyncStorage.removeItem('token');
	} catch (e) {
		// saving error
		console.log(e)
	}
};
const getToken = async () => {
	try {
		return await AsyncStorage.getItem('token');
	} catch (e) {
		// saving error
		console.log(e);
		return null;
	}
};
export {addToken,removeToken,getToken};