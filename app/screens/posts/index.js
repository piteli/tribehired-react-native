import React, { Component } from 'react';
import PostsContainer from './PostsContainer';

export default class PostsIndex extends Component { //pintu
    render() {
        const { navigation } = this.props;
        return (
            <PostsContainer navigation={navigation} />

        );
    }
}
