import React, { Component } from 'react'
// import axios from 'axios'
import axiosInstance from '../../../axios';
import Post from '../../../components/Post/Post';

import './Posts.css'

class Posts extends Component {
    // State
    state = {
        posts: []
    }


    // Lifecycles
    componentDidMount() {
        console.log(this.props);
        
        axiosInstance
            .get('/posts')
            .then(res => {
                const recentPosts = res.data.slice(0, 4)
                const updatedPosts = recentPosts.map(post => {
                    return { ...post, author: 'Daniel' }
                })
                this.setState({ posts: updatedPosts })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Callback Methods
    postSelectedHandler = id => {
        this.setState({ selectedPostId: id })
    }

    render() {
        let posts = <h4 style={{ textAlign: 'center', color: 'red' }}>Something went wrong and cannot get blogs.</h4>
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                
                <Post key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            ))
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts