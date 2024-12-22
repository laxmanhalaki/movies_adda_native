import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Theme from '../utiliteis';
import { TouchableOpacity } from 'react-native';

const Player = ({videos,setPlayer}) => {
	const youtubebaseUrl = videos[0]
		? 'https://www.youtube.com/embed/' + videos[0].key
		: 'https://www.youtube.com/embed/';
		console.log(videos)
	return (
		<View
			style={{
				position: 'fixed',
				width: '100%',
				height: '100%',
				// backgroundColor: 'rgba(0,0,0,0.4)',
				zIndex: 20,
				top: '0px',
				bottom: '0px',
			}}
		>
			<View
				style={{
			
					backgroundColor: Theme.primary,
					height: 250,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{videos[0] ? (
					<>
						<WebView
							source={{
								html: `<iframe width="100%" height="100%" src=${youtubebaseUrl} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`,
							}}
							style={{ width: 300,}}
						/>
					</>
				) : (
					<View>
						<Text style={{ color: 'white', fontWeight: '600' }}>
							No Videos Available
						</Text>
					</View>
				)}
				<TouchableOpacity
					style={{
						paddingHorizontal: 10,
						paddingVertical: 10,
						borderRadius: 8,
						backgroundColor: 'white',
						width: '70%',
						alignSelf: 'center',
						marginVertical: 25,
					}}
					onPress={() => setPlayer(false)}
				>
					<Text style={{ fontWeight: '600', textAlign: 'center' }}>Close</Text>
				</TouchableOpacity>
			</View>

			{/* <WebView
				source={{
					html: '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
				}}
				style={{ marginTop: 20 }}
			/> */}
		</View>
	);
}

const styles = StyleSheet.create({})

export default Player;
