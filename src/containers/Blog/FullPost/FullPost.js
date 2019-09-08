import React, { Component } from 'react';
import axios from 'axios'

import './FullPost.css';

// Prop List: id
class FullPost extends Component {
    // State
    state = {
        loadedPost: null
    }

    // Lifecycles
    componentDidUpdate() {
        if (this.props.id) {    
                
            if (!this.state.loadedPost || 
                (this.state.loadedPost && 
                this.state.loadedPost.id !== this.props.id)) {
                    axios.get(`/posts/${this.props.id}`)
                    .then(res => {
                        this.setState({loadedPost: res.data})            
                    })
            }

        }
    }

    // Callback Methods
    deleteBlogHandler = () => {
        axios.delete(`/posts/${this.props.id}`)
        .then(res => {
            console.log(res);            
        })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id && this.state.loadedPost) {
        
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deleteBlogHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;