import React, { Component } from 'react'
// import axios from 'axios'
import axiosInstance from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';

import './Posts.css'
import FullPost from '../FullPost/FullPost';

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
                <Link to={'/posts/' + post.id} key={post.id}>
                    <Post title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                </Link>
            ))
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:postId'} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts