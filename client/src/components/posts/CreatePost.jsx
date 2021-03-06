import React, {Component} from 'react';
import {createPost} from '../../store/actions/postActions';
import {withAlert} from 'react-alert';
import './css/CreatePost.css';

class CreatePost extends Component{
    constructor(){
        super();

        this.state={
            year: "",
            prof: "",
            reason: "",
            stars: "",
            
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();

        const {uid, alert, addPost, course} = this.props;

        if(!this.state.stars){
            alert.error('Please select a rating');
            return;
        }

        else if(this.state.reason.trim() === ''){
            alert.error("Your reason must not be blank!");
            return;
        }

        else if(!uid){

            //open auth modal after 0.3 seconds and notify user they must sign in
            setTimeout(() => {
                document.getElementById('open-auth').click();

                const msg = "User must be signed in to make a post!";

                alert.error(msg);
            }, 300);

        } 
        
        else {

            const data = { 
                userId: uid, 
                courseId: course.id, 
                dateCreated: new Date().toString(), 
                ...this.state 
            };
          
            const post = await createPost(data);
            addPost(post);
            

            this.setState({year: '', prof: '', reason: '', stars: ''});
        }

        //close create post modal
        document.getElementById('close-create-post').click();    
    }

    handleChange(e){
        this.setState({[e.target.id]: e.target.value});
    }

    render(){
        const { year,  prof, reason, stars} = this.state;
        const {course} = this.props;

        const maxYear = new Date().getFullYear();
    
        return(
            <div className='post-modal modal fade' id='create-post' data-backdrop='false'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h3>Create Post</h3>

                            <button id='close-create-post' className='close' data-dismiss='modal'>
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className='modal-body'>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="course-id">Course Number</label>
                            
                                    <p>
                                        {course? course.number: 'Loading...'}
                                    </p>
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor="year">Year Course Was Taken</label>

                                    <input 
                                            type='number' 
                                            className="form-control"
                                            min = {1878}
                                            max = {maxYear}
                                            id='year' 
                                            value={year} 
                                            placeholder ={`Enter a year between 1878 and ${maxYear}`}
                                            onChange={this.handleChange}
                                    />
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor="prof">Professor</label>

                                    <input 
                                        type='text' 
                                        className="form-control"
                                        id='prof' 
                                        value={prof}
                                        minLength='2'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor='reason'>Reason For Rating</label>

                                    <textarea
                                        className="form-control"
                                        id='reason'
                                        value={reason}
                                        rows = '4'
                                        onChange={this.handleChange}
                                    />
                                </div>
                        
                                <div className="form-group">
                                    <label htmlFor='stars'>Stars</label>    

                                    <select className='form-control' id='stars' value={stars} onChange={this.handleChange}>
                                        <option value="">Select Rating</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                        
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        )
    } 
}

export default (withAlert()(CreatePost));