import React, { Component } from 'react'
import axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
class Posts extends Component{

    state = {
        posts: []
    }

    componentDidMount(){
        // console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,12);
                const updatedPosts = posts.map(post => {
                    return{
                        ...post,
                        author: 'Prateek'
                    }
                });
                this.setState({posts: updatedPosts});
            } )
            .catch(error => {
                // console.log(error);
                //this.setState({error:true});
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/'+id);
    }

    render(){
        let posts = <p style={{textAlign:'center'}}>Something Went Wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return(
                    // <Link to={"/"+post.id} > 
                        <Post key={post.id} title={post.title} author={post.author} clicked={() => this.postSelectedHandler(post.id)}/>
                    // </Link>
                )
            });
        }
        return(
            <div>
                <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
                <section className="Posts">
                    {posts}
                </section>
            </div>
        );
    }
}

export default Posts;