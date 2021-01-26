import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from '../../screens/posts/Posts';
import Post from '../../screens/post/Post';
import { Button, View, Modal } from 'react-native';
import Comments from '../../components/Comments';

const Stack = createStackNavigator();

export default class AppStack extends React.Component<any, any> {
  
  render(){
    return (
      <View style={{flex : 1}}>
      
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen 
          name="Post" 
          component={Post}
          // options={{
          //   headerRight: () => (
          //     <Button
          //       onPress={() => alert('This is a button!')}
          //       title="Show Comments"
          //       color="#1a5bc4"
          //     />
          //   )
          // }}
        />
      </Stack.Navigator>
      </NavigationContainer>
      </View>
    );
  }
  }