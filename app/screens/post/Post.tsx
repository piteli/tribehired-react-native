import React from 'react';
import { View, Modal, Image, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import Comments from '../../components/Comments';

export default class PostsIndex extends React.Component<any, any> {

    constructor(props : any){
        super(props);
        this.initiateStates();
        //props = bannerImage, id
    }

    initiateStates = () => {
        this.state = {
            isLoadingPost : true,
            postBody : {},
            showComments : false
        }
    }

    componentDidMount(){
        const post_id = this.props.route.params.id;
        this.fetchPost(post_id);
    }

    fetchPost = async(post_id : number) => {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${(post_id).toString()}`);
            const json = await response.json();
            this.setState({postBody : json, isLoadingPost : false});
        } catch(e){
            console.log(e);
        }
    }

    renderModal = () => {
        return(
            <Modal 
                animationType="slide"
                transparent={false}
                visible={this.state.showComments}
            >
                <View style={{height : 60, paddingTop : 20}}>
                    <Button
                        onPress={() => this.setState({showComments : false})}
                        title="Close Comments"
                        color="#1a5bc4"
                    />
                </View>
                <Comments post_id={this.props.route.params.id}  />
            </Modal>
        )
      }

    render() {
        return (
            <View style={styles.container}>
                { this.renderModal() }
                {
                    this.state.isLoadingPost ?

                    <View style={styles.loading}>
                        <ActivityIndicator size="large" />
                    </View>
                     :

                    <View>
                        <Image source={{uri : this.props.route.params.bannerImage}} style={styles.banner} />
                        <View style={{padding : 10}}>
                            <Text style={{fontSize : 20, fontWeight : 'bold', marginBottom : 10}}>{this.state.postBody.title}</Text>
                            <Text>{this.state.postBody.body}</Text>
                        </View>
                        <Button 
                                onPress={() => this.setState({showComments : true})}
                                title="Show Comments"
                                color="#1a5bc4"
                        />
                    </View>
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column'
    },
    loading : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    banner : {
        height : 200,
        width : '100%',
        resizeMode : 'cover'
    },
})