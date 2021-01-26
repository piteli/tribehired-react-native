import React from 'react';
import { View, Modal, Image, Text, StyleSheet } from 'react-native';
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
            postBody : {}
        }
    }

    componentDidMount(){
        const post_id = this.props.id;
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
                transparent={true}
                visible={this.state.showComments}
            >
                <Comments post_id={this.props.id}  />
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                { this.renderModal() }
                <Image source={this.props.bannerImage} />
                <Text style={{fontSize : 25}}>{this.state.postBody.title}</Text>
                <Text>{this.state.postBody.body}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column'
    }
})