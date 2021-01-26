import React from 'react';
import { View, TextInput, StyleSheet, FlatList, Image, Text, ActivityIndicator } from 'react-native';

export default class Comments extends React.Component<any, {[key: string]: any}> {

    collectionComments : any = [];

    constructor(props : any){
        super(props);
        this.initiateStates();
    }

    initiateStates = () => {
        this.state = {
            input : '',
            commentsData : [],
            isLoadingComments : true
        }
    }

    componentDidMount(){
        const post_id = this.props.post_id;
        this.fetchCommentsByPostID(post_id);
    }

    fetchCommentsByPostID = async(post_id : number) => {
        try{ 
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${(post_id).toString()}`);
            const json = await response.json();
            console.log('here is a comment json', json);
            let collection = [];
            for(let item of json){
                collection.push({name : item.name, email : item.email, body : item.body});
            }
            this.collectionComments = collection;
            this.setState({isLoadingComments : false, commentsData : collection});
        } catch(e){
            console.log('An error occurred either on networking side or codes side.');
            console.log(e);
        }
    }


    inputChanged = (text : string) => {
        if(this.state.isLoadingComments) return;
        this.setState({input : text});
        this.filterData(text);
    } 

    filterData = (text : string) => {
        const value = text;
        let collection = [];
        const data = this.collectionComments;

        if(value === ''){
            this.setState({commentsData : this.collectionComments}); return;
        }
        for(let item of data){
            for(let key in item){
                console.log(item);
                console.log('lala');
                console.log(item[key]);
                if(((item[key]).toString()).indexOf(value) > -1) collection.push(item); continue;
            }
        }
        console.log(this.collectionComments);
        this.setState({commentsData : collection});
    }

    renderItem = ({ item } : any) => {
        return(
            <View style={styles.containerUser}>
                <Image source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPluX0lZs9ujZ8Uy1NNi6blJzh3_0en13QfA&usqp=CAU'}} />
                <View style={styles.containerSubUser}>
                    <Text style={{fontSize : 15, fontWeight : 'bold', marginBottom : 10}}>{item.name} {`<${item.email}>`}</Text>
                    <Text>{item.body}</Text>
                </View>
            </View>
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput value={this.state.input} onChangeText={text => this.inputChanged(text)} placeholder="Search..." />

                {
                    this.state.isLoadingComments ? 

                    <View style={styles.containerLoading}>
                        <ActivityIndicator />
                    </View>

                    :

                    <FlatList
                        data={this.state.commentsData}
                        renderItem={this.renderItem}
                    />
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column'
    },
    containerUser : {
        flex : 1,
        flexDirection : 'row'
    },
    containerSubUser : {
        flex : 1,
        flexDirection : 'column',
        padding : 10
    },
    containerLoading : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    }

})

