import { View, Text, Image, Style, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import * as Firebase from '../components/Firebase';
import colours from '../components/Colours';
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';

export default function PostDetails({ route, navigation }) {
	const { item } = route.params;
	const [title, setTitle] =useState(item.title);
	const [description, setDescription]=useState(item.description);
	const [image, setImage]=useState(item.image);
	const [isLoading, setIsLoading]=useState(false);

	const updatePost = () => {
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
		
		Firebase.updatePost(item.key, title, description, image)
		.then(() => {
			setIsLoading(false);
		})

		navigation.goBack();

	}

	const deletePost = () => {
		setIsLoading(true);

		Firebase.deletePost(item.key)
		.then(() => {
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
				<Image source={{uri: image}} style={{width: "100%", height: 300, marginBottom: 20}}/>
				<MaterialIcons.Button
					name="upload"
					backgroundColor='#bb1d68'
					size={20}
					onPress={() => pickImage()}>
				Change Image
				</MaterialIcons.Button>
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
			<View style={styles.editContainer}>
				<MaterialIcons.Button
					name='save'
					backgroundColor='#bb1d68'
					disabled={isLoading}
					size={20}
					onPress={updatePost}
				>
					Save Changes
				</MaterialIcons.Button>
				<MaterialIcons.Button
					name='delete'
					backgroundColor='#bb1d68'
					disabled={isLoading}
					size={20}
					onPress={deletePost}
				>
					Delete
				</MaterialIcons.Button>
			</View>
		</KeyboardAwareScrollView>
	); 
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	},
	editContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-evenly',
		marginBottom: 10,
		padding: 10
	}
})
