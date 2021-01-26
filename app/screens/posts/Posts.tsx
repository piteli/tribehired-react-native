import React from 'react';
import { View, StyleSheet, Image, FlatList, SafeAreaView, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

export default class Posts extends React.Component<any, {[key: string]: any}> {

    constructor(props : any){
        super(props);
        this.initiateStates();
    }

    initiateStates = () => {
        this.state = {
            isLoadingPosts : true,
            postsData : [],
        }
    }

    componentDidMount(){
        this.fetchPosts();
    }

    fetchPosts = async() =>{
        try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const json = await response.json();
            this.setState({postsData : json, isLoadingPosts : false});
        } catch(e){
            console.log(e);
            this.promptErrorAndRefresh();
        }
    }

    promptErrorAndRefresh = () => {
        Alert.alert(
            "An Error Occurred!",
            "Press reload button below to reload",
            [
              {
                text: "Reload",
                onPress: () => this.reload()
              },
            ]
        )
    }

    reload = () => {
        this.setState({isLoadingPosts : true}, () => this.fetchPosts());
    }

    onClickPost = (id : number, image_url : string) => {
        this.props.navigation.navigate('Post', {id, bannerImage : image_url});
    }

    renderItem = ({ item } : any) => {
        const image_url = 'https://source.unsplash.com/random';
        return (
            <TouchableOpacity onPress={() => this.onClickPost(item.id, image_url)}>
                <Image source={{uri : image_url}} style={styles.banner} />
                <View style={{padding : 10}}>
                    <Text style={{fontSize : 20, fontWeight : 'bold', marginBottom : 10}}>{item.title}</Text>
                    <Text>{item.body}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {
                    this.state.isLoadingPosts ?

                    <View style={styles.loadingView}>
                        <ActivityIndicator />
                    </View>

                    :

                    <FlatList
                        data={this.state.postsData}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                    />
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
        padding : 10,
    },
    banner : {
        height : 200,
        width : '100%',
        resizeMode : 'cover'
    },
    loadingView : {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    }
})
