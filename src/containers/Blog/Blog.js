import React, { Component } from 'react';
// import axios from 'axios'
import axiosInstance from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    // State
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    // Lifecycles
    componentDidMount() {
        axiosInstance
        .get('/posts')
        .then(res => {
            const recentPosts = res.data.slice(0, 4)
            const updatedPosts = recentPosts.map(post => {
                return {...post, author: 'Daniel'}
            })
            this.setState({posts: updatedPosts})
        })
        .catch(err => {
            this.setState({error: true})         
        })
    }

    // Callback Methods
    postSelectedHandler = id => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = <h4 style={{textAlign: 'center', color: 'red'}}>Something went wrong and cannot get blogs.</h4>
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                <Post key={post.id} 
                title={post.title} 
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)} />
            ))
        }

        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
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