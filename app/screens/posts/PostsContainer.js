import React from "react";
import Posts from "./Posts";

export default class PostsContainer extends React.Component {
    constructor(props){
        super(props);
        this.initiateStates();
        this.initiateInstances();
    }

    initiateStates(){
        this.state = {
            postsData : []
        }
    }

    initiateInstances(){
        this.bannerImages = [];
     }

    componentDidMount(){
        this.fetchPosts();
    }

    fetchPosts(){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            console.log(json);
            // this.setState({postsData : json});
        } catch(e){
            //either network error or code issue
            console.log(e);
        }
    }

    render(){
        return(
            <Posts postsData={this.state.postsData} />
        );
    }
}