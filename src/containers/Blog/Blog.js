import React, { Component } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom'

import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {

    render() {

        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            {/* use Link instead of href to avoid reloading of the app */}
                            <li><NavLink to='/posts'
                                exact
                                activeClassName='my-active'
                                activeStyle={{
                                    color: 'green',
                                    textDecoration: 'underline'
                                }}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',  // by default is absolute path, to build relative path, use props.match.url + '/new'
                                hash: '#goToSomeId',
                                search: '?query-string=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>

                {/* need exact keyword here to detect exactly '/' path, if not specified, it detects paths start with '/' */}
                <Switch>
                    <Route path='/new-post' component={NewPost} />
                    <Route path='/posts' component={Posts} />
                </Switch>
            </div>
        );
    }
}

export default Blog;