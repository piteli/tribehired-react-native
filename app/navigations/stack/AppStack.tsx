import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../../screens/posts/Posts';
import Post from '../../screens/post/Post';

const Stack = createStackNavigator();

export function AppStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Post" component={Post} />
      </Stack.Navigator>
    );
  }