import { View, StyleSheet, Image, Text, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import colours from '../components/Colours';
import dimensions from '../components/ScreenSize'
import * as Firebase from '../components/Firebase';

const convertTime = (time) => {
  let myDate = new Date(time * 1000);
  return myDate.toLocaleDateString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit' });
};

const sortOptions = [{ title : 'By Name Asc', icon : 'sort-asc', field : 'title',  dir : 'asc'},
			  		 { title : 'By Name Desc', icon : 'sort-desc', field : 'title', dir : 'desc'},
			  		 { title : 'By Date Asc', icon : 'sort-asc', field : 'date',  dir : 'asc'},
			  		 { title : 'By Date Desc', icon : 'sort-desc', field : 'date', dir : 'desc'}]

export default function Feed({ navigation }) {
	const [posts, setPosts] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	
	const onCollectionUpdate = (querySnapshot) => {
		const results = [];
		querySnapshot.forEach((doc) => {
			const { image, title, description, date, likes, dislikes } = doc.data();
			results.push({key: doc.id,
						  title: title,
						  description: description,
				          image: image,
						  date: date.seconds,
						  likes: likes,
						  dislikes: dislikes});
		});
		setPosts(results)
	}

	useEffect(() => { 
		if (posts.length < 1) {
			unsubscribe = Firebase.subscribeToPosts(onCollectionUpdate, 'date', 'desc');
			return () => (unsubscribe());
		}
	}, []);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{
				paddingTop: 30,
				paddingBottom: 60,
      		}}>
				{posts.map((item) => (
					<View key={item.key}>
						<Image style={styles.cardImage} source={{uri: item.image}}/>
						<View style={styles.cardHeader}>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.date}>{convertTime(item.date)}</Text>
							<Text style={styles.copy}>{item.description}</Text>
						</View>
						<View style={styles.editContainer}>
							<MaterialIcons.Button 
								name="edit" 
								backgroundColor="#bb1d68" size={20}
								style={styles.btn}
								onPress={() => navigation.navigate('PostDetails', {item: item})}>
								edit
							</MaterialIcons.Button>
							<MaterialIcons.Button
								name="thumb-up-alt"
								backgroundColor='#bb1d68'
								size={20}
								styles={styles.btn}
								onPress={() => Firebase.likePost(item.key)}
							>
								{`${item.likes ? item.likes : 0}`}
							</MaterialIcons.Button>
							<MaterialIcons.Button
								name="thumb-down-alt"
								backgroundColor='#bb1d68'
								size={20}
								styles={styles.btn}
								onPress={() => Firebase.dislikePost(item.key)}
							>
								{`${item.dislikes ? item.dislikes : 0}`}
							</MaterialIcons.Button>
						</View>
					</View>
				))}
			</ScrollView>
			<Modal
        		animationType="slide"
        		transparent={true}
        		visible={modalVisible}
        		onRequestClose={() => {
          		Alert.alert('Modal has been closed.');
          			setModalVisible(!modalVisible);
        	}}>
				<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{sortOptions.map((item) => (
								<FontAwesome.Button
									key={`${item.field}${item.dir}`}
									name={item.icon}
									backgroundColor="#bb1d68"
									size={20}
									styles={styles.btn}
									onPress={() => {
										Firebase.subscribeToPosts(onCollectionUpdate, item.field, item.dir);
										setModalVisible(false);
									}}
								>
								{item.title}
								</FontAwesome.Button>
							))}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<View style={styles.navbar}>
				<MaterialIcons.Button
					name="add-circle-outline"
					backgroundColor="#bb1d68"
					size={20}
					onPress={() => navigation.navigate('AddPost')}
				>
					Add Post
				</MaterialIcons.Button>
				<MaterialIcons.Button
					name="sort"
					backgroundColor='#bb1d68'
					size={20}
					styles={styles.btn}
					onPress={() => setModalVisible(!modalVisible)}
				>
					Sort
				</MaterialIcons.Button>
			</View>
		</View>
	); 
}

const styles = StyleSheet.create({ 
	container: {
		flex: 1,
		backgroundColor: colours.background
	}, 
	navbar: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center', 
		justifyContent: 'space-between', 
		position: 'absolute', 
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#bb1d68',
		height: 60,
	}, 
	editContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-evenly',
		marginBottom: 10,
		padding: 10
	}, 
	btn: {
		padding: 10,
		color: 'white',
		flexGrow: 1,
		width: dimensions.width / 3 - 10,
	}, 
	whiteText: {
		color: 'white'
	},
	card: { 
		backgroundColor: 'red', 
		marginBottom: 25
	}, 
	cardImage: {
		width: '100%',
		height: 300 
	},
	cardHeader: { 
		padding: 10,
	}, 
	title: {
		color: 'white', 
		fontWeight: "bold",
		fontSize: 30 
	},
	copy: {
		color: 'white', 
		fontSize: 18
	},
	modalOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginTop: 22,
	},
	modalView: {
		backgroundColor: '#bb1d68',
		marginBottom: 60,
		padding: 5
	},
	modalText: {
		marginBottom: 15,
		color: 'white',
		textAlign: 'center',
	},
	date: {
		color: colours.green,
		fontSize: 14,
		fontWeight: "bold",
		marginTop: 10, 
		marginBottom: 10
}});