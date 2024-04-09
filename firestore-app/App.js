import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "./screens/Feed";
import AddPost from "./screens/AddPost";
import PostDetails from "./screens/PostDetails";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={FeedScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="PostDetails" component={PostDetails} />
      </Stack.Navigator> 
    </NavigationContainer>
  ); 
}
