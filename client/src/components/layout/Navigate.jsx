import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Navbar} from 'react-bootstrap';
import logo from "../../images/logo.png";
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import './css/Navigate.css';

class Navigate extends Component{    
    render(){
        const {uid, status} = this.props;

        return(
            <div>
                <Navbar expand="lg" className="navbar">
                    <Navbar.Brand href="/">
                        <img
                            src= {logo}
                            width="34"
                            height="34"
                            className="d-inline-block align-top"
                            alt="Website logo"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle className='toggle' aria-controls="basic-navbar-nav"/>
                    
                    <Navbar.Collapse id="basic-navbar-nav">

                        <div className="ml-auto">
                            {uid? <SignedInLinks status={status}/> : <SignedOutLinks/>}
                        </div>
                        
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.auth.uid,
        status: state.auth.status
    }
};

export default connect(mapStateToProps)(Navigate);