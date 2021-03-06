import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserById} from './store/actions/profileActions';
import AdminHome from './components/admin/AdminHome.jsx';
import PostList from './components/posts/PostList.jsx';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import SearchCourse from './components/search/SearchCourse.jsx';
import Navigate from './components/layout/Navigate.jsx';
import Profile from './components/profile/Profile.jsx';
import DeadPage from './components/layout/DeadPage.jsx';
import Settings from './components/settings/Settings.jsx';
import PostDetails from './components/posts/PostDetails.jsx';
import './App.css';

class App extends Component{
  componentDidUpdate(prevProps){
      const {uid} = this.props;

      if(!prevProps.uid && uid){
          const interval = setInterval(async () => {
              if(uid){
                 const user = await getUserById(uid);

                 if(user.banned){
                    clearInterval(interval);

                    window.localStorage.clear();
                    window.location.reload();
                 }
              } else{
                 clearInterval(interval);
              }
          }, 1000 * 60 * 30);
      }
  }
  
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Navigate/>
  
          <Switch>
            <Route exact path='/' component={SearchCourse}/>
            <Route exact path='/admin' component={AdminHome}/>
            <Route exact path='/admin/:type' component={AdminHome}/>
            <Route exact path='/posts/:courseId' component={PostList}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path= '/settings' component={Settings}/>
            <Route exact path= '/post/:postId' component={PostDetails}/>
            <Route path = '/' component={DeadPage}/>
            
  
          </Switch>
        </BrowserRouter>
  
      </div>
    );
  }
}

const mapStateToProps = (state) => ({uid: state.auth.uid});

export default connect(mapStateToProps)(App);