import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost'

class Blog extends Component {

    render () {

        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            {/* use Link instead of href to avoid reloading of the app */}
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to={{pathname: '/new-post', hash: '#goToSomeId', search: '?query-string=true'}}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                
                {/* need exact keyword here to detect exactly '/' path, if not specified, it detects paths start with '/' */}
                <Route path='/' exact component={Posts} />
                <Route path='/new-post' component={NewPost} />
            </div>
        );
    }
}

export default Blog;