import { View, Text, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import colours from '../components/Colours';
import { TextInput } from 'react-native';
import { addPost } from '../components/Firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function AddPost({ navigation }) {
	const [title, setTitle] =useState('');
	const [description, setDescription] =useState('');
	const [image, setImage] =useState('');
	const [isLoading, setIsLoading] =useState(false);

	const savePost = () => {
		if (title == '') {
			Alert.alert('Your post is missing a title');
			return;
		}

		if (description == '') {
			Alert.alert('Your post is missing a description');
			return;
		}

		if (image == '') {
			Alert.alert('Your post is missing an image');
			return;
		}

		setIsLoading(true);

		addPost(title, description, image)
		.then(() => {
			setTitle('');
			setDescription('');
			setImage('');
			setIsLoading(false);
		})

		navigation.goBack();

	}

	const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
			base64: true
  	});
		setImage(`data:image/jpg;base64,${result.base64}`)
	}


	return (
		<KeyboardAwareScrollView style={styles.container}>
			<View style={styles.subContainer}>
				{image ? (
					<View>
						<Image source={{uri: image}} style={{width: "100%", height: 300, marginBottom: 10}}/>
						<MaterialIcons.Button
							name='upload'
							backgroundColor='#bb1d68'
							size={20}
							onPress={() => pickImage()}>
						Change Image
						</MaterialIcons.Button>
					</View>
				) :
				<MaterialIcons.Button
					name='upload'
					backgroundColor='#bb1d68'
					size={20}
					onPress={() => pickImage()}>
					Upload Image
				</MaterialIcons.Button>}
			</View>
			<View style={styles.subContainer}>
				<TextInput 
					style={styles.whiteText}
					placeholder="Title"
					placeholderTextColor="#eee"
					value={title}
					onChangeText={(text) => setTitle(text)}
				/>
			</View>
			<View style={styles.subContainer}>
				<TextInput 
					style={styles.whiteText}
					placeholder="Description"
					placeholderTextColor="#eee"
					value={description}
					onChangeText={(text) => setDescription(text)}
				/>
			</View>
			<View>
				<MaterialIcons.Button
					name='save'
					backgroundColor='#bb1d68'
					disabled={isLoading}
					size={20}
					onPress={savePost}
				>
					Save
				</MaterialIcons.Button>
			</View>
		</KeyboardAwareScrollView>
	); 
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: colours.background
	},
	subContainer: {
		flex: 1,
		marginBottom: 10,
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: colours.green,
		paddingBottom: 20
	},
	whiteText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	activity: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,	
	}
})