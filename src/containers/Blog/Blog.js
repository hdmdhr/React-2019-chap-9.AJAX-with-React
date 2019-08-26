import React, { Component } from 'react';
import axios from 'axios'

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    // State
    state = {
        posts: [],
        selectedPostId: null
    }

    // Lifecycles
    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
            const recentPosts = res.data.slice(0, 4)
            const updatedPosts = recentPosts.map(post => {
                return {...post, author: 'Daniel'}
            })
            this.setState({posts: updatedPosts})
        })
    }

    // Callback Methods
    postSelectedHandler = id => {
        this.setState({selectedPostId: id})
    }

    render () {
        const posts = this.state.posts.map(post => (
            <Post key={post.id} 
            title={post.title} 
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)} />
        ))

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;