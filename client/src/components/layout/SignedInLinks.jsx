import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import './css/SignedInLinks.css';

function SignedInLinks(props){
    const signOut = (e) =>{
        e.preventDefault();
        window.localStorage.clear();
        window.location.reload();
    }

    const {status} = props;

    const linkStyle = {textDecoration: 'none'};

    return(
        <div className = 'ml-auto signed-in-links'>
            <Nav>
                <Nav.Item className='nav-item'>
                    <Link to='/profile' className='link' style={linkStyle}>
                        <i className="fa fa-user" title="Profile"></i>
                        <span className>Profile</span>
                    </Link>
                </Nav.Item> 

                {status?
                    (<Nav.Item className='nav-item'>
                        <Link to='/admin' className='link' style={linkStyle}>
                            <i className="fas fa-shield-alt" title="Admin"></i>
                            <span className>Admin</span>
                        </Link>
                    </Nav.Item> ) : null
                }
                
                <Nav.Item className='nav-item'>
                    <Link to='/settings' className='link' style={linkStyle}>
                        <i className="fa fa-cog" title="Settings"></i>
                        <span className>Settings</span>
                    </Link>
                </Nav.Item>
                
                <Nav.Item className='nav-item'>
                    <Link to='/' onClick={signOut} className='link' style={linkStyle}>
                        <i className="fas fa-sign-out-alt" title="Sign Out"></i>
                        <span>Logout</span>
                    </Link>
                </Nav.Item>
            </Nav>
        </div> 
    )
}

export default withRouter(SignedInLinks);