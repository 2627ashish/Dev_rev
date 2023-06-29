import React from "react";
import '../Styles/home.css';
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: 'solid 1px brown',
        borderRadius: '6px'
    },
};

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            loginCredentialIsOpen: false,
            userName: undefined,
            isLoggedIn: false,
            createAccIsOpen: false,
            email: '',
            password: '',
            username: '',
            firstname: '',
            lastname: '',
            phNumber: '',
            address: '',
            bName: [],
            suggesstions: [],
            searchText:'',
            inputTicker:''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleNavigation = () => {
        this.props.history.push('/');
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    handleLogin = () => {
        this.setState({ loginModalIsOpen: true, createAccIsOpen: false });
    }
    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }
    handleCreateAcc = () => {
        this.setState({ createAccIsOpen: true });
    }
    handleChange(event) {
        console.log("Taking in value:",event.target.value);
        this.setState({
            inputTicker: event.target.value
        });
        this.props.history.push(`/details?query=${this.state}`);

    }
    handleSearch = () => {
        this.props.history.push(`/details?query=${this.state}`);
    };
    
    handleLoginwithData = () => {
        const { email, password } = this.state;
        console.log(email, password);
        const loginObj = {
            user: email,
            pwd: password,
        };
        axios({
            method: 'POST',
            url: 'http://localhost:2963/userlogin',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isLoggedIn: response.data.isAuthenticated,
                    email: email,
                    password: password,
                    isLoggedIn: true,
                    loginCredentialIsOpen: false,
                    userName: email,
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
    }
    handleSignUp = () => {
        const { email, password, firstname, lastname, phNumber, address } = this.state;
        const signupobj = {
            user: email,
            pwd: password,
            fn: firstname,
            ln: lastname,
            ph: phNumber,
            add: address
        };
        axios({
            method: 'POST',
            url: 'http://localhost:2963/userSignUp',
            headers: { 'Content-Type': 'application/json' },
            data: signupobj
        })
            .then(response => {
                this.setState({
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    phNumber: phNumber,
                    address: address,
                }); alert(response.data.message);
            })
            .catch(err => console.log(err))
        this.setState({ createAccIsOpen: false, loginCredentialIsOpen: true })
    }
    render() {
        const { loginModalIsOpen, loginCredentialIsOpen, isLoggedIn, userName, createAccIsOpen } = this.state;
        return (
            <div>
                <div className="container-1">
                    <div className=" dplay" onClick={this.handleNavigation}>
                        <img src="Assets/logo.png" className="logo-1 hover-element"></img>

                    </div>
                    {
                        !isLoggedIn ? <div className="Dss">
                            <span className="button-font border hover-element" onClick={this.handleCreateAcc} >Register</span>
                            <span className="button-font border hover-element" onClick={this.handleLogin}>Login </span>
                        </div> :
                            <div className="Dss">
                                <span className="button-font border" onClick={this.handleLogout} >Logout</span>
                                <span className="button-font">{userName} </span>
                            </div>
                    }
                    <span href="cart.html" className="button-font border hover-element">CART</span>
                    <span onClick={this.handleNavigation} className="hover-element button-font border">HOME</span>
                    

                </div>
                <div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..."value={this.state.inputValue} onChange= {this.handleChange}></input>
                        <button><i className="fas fa-search" onClick={this.handleSearch}></i></button>
                    </div>
                    <div className="collage">
                        <div className="row">
                            <div className="col">
                                Reading 
                            </div>
                            <div className="col">
                                <div className="row">
                                    Is
                                </div>
                                <div className="row">
                                    Life
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Centaral">
                        <h1>Library Managemnt Tool</h1>
                        <p>Online Library Management System is an Automated Library System that handles the various functions of the
                            library. It provides a complete solution to the library management software. The online Library
                            Management System is classified into two parts Bar Code System and RFID System.</p>
                        <div>
                            <h2> Welcome to our Library Management System!</h2>

                            <h3>Explore, Learn, and Discover with our extensive collection of books, magazines, and multimedia
                                resources.</h3>

                            <b>Library Features:</b>
                            <ul>
                                <li>Easy search and browse functionality to find your favorite books.</li>
                                <li>Manage your account, borrow and return books seamlessly.</li>
                                <li>Access digital resources and e-books from the comfort of your home.</li>
                                <li>Discover new releases and curated collections.</li>
                                <li>Engage in community events and book clubs.</li>
                                <li>Knowledgeable staff to assist you in your literary journey.</li>
                                <li>Join our library today and unlock a world of knowledge and imagination.</li>
                            </ul>
                            <h4>Library Hours:</h4>
                            <h5>Monday - Friday: 9:00 AM - 8:00 PM</h5>
                            <h5>Saturday: 10:00 AM - 6:00 PM</h5>
                            <b>Sunday: Closed</b>
                            <p> Visit us at Dev_Rev and embark on an extraordinary reading experience!</p>
                        </div>
                    </div>
                    <div className="foot">
                        <p>This is my work for dev rev ©</p>
                    </div>


                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <div className="modal-login">
                            <button className="btn btn-primary"
                                onClick={() => {
                                    this.handleModal('loginModalIsOpen', false);
                                    this.handleModal('loginCredentialIsOpen', true);
                                }}
                            >Continue with Credentials</button>
                            <br />
                            <br />
                        </div>
                        <div className="modal-login">
                            <GoogleLogin
                                clientId="828947790591-m4utv0de292g57e3tb4gtnckk1k873fg.apps.googleusercontent.com"
                                buttonText="Continue with Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>

                    </div>
                </Modal>
                <Modal
                    isOpen={loginCredentialIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('loginCredentialIsOpen', false)}></div>
                        {
                            !isLoggedIn ? <div>
                                <div className="Log_head">Login</div>
                                <label className="Log_head">E-mail</label>
                                <input type="email" placeholder="Enter your e-mail" required onChange={(event) => this.handleInputChange(event, 'email')} className="form-log-c" />
                                <div>
                                    <label className="Log_head">password</label>
                                    <input type="password" placeholder="enter your password" required onChange={(event) => this.handleInputChange(event, 'password')} className="form-log-c" />
                                </div>
                                <button className="btn btn-danger PROCEED" onClick={this.handleLoginwithData}>Login</button>
                            </div> :
                                <div className="Dss">
                                    <span className="button-font border" onClick={this.handleLogout} >Logout</span>
                                    <span className="button-font">{userName} </span>
                                </div>
                        }
                    </div>
                </Modal>
                <Modal
                    isOpen={createAccIsOpen}
                    style={customStyles}>
                    <div style={{ height: '350px' }}>
                        <div className="fas fa-times close-btnH" style={{ marginTop: '5px', marginRight: '5px', float: 'right' }} onClick={() => this.handleModal('createAccIsOpen', false)}></div>

                        <div style={{ padding: '5px' }}  >
                            <h3 className="Acc-name">Create An Account</h3>
                            <span className="NameHa"> <label className="NameH">firstname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'firstname')} /></span>
                            <span className="NameHa">  <label className="NameH">lastname</label>
                                <input type="text" placeholder="enter your name" className="form-control" onChange={(event) => this.handleInputChange(event, 'lastname')} /></span>
                            <label className="NameH">E-mail</label>
                            <input type="email" placeholder="enter your name" className="form-control" required onChange={(event) => this.handleInputChange(event, 'email')} />
                            <label className="NameH">password</label>
                            <input type="password" placeholder="enter your password" className="form-control" required onChange={(event) => this.handleInputChange(event, 'password')} />
                            <label className="NameH">Ph.number</label>
                            <input type="tel" placeholder="enter your number" className="form-control" onChange={(event) => this.handleInputChange(event, 'phNumber')} />
                            <label className="NameH">Address</label>
                            <textarea type="text" placeholder="enter your address" className="form-control text-areaH" onChange={(event) => this.handleInputChange(event, 'address')} />
                            <button className="btn btn-danger PROCEED" style={{ float: 'right' }} onClick={this.handleSignUp}>Register </button>

                        </div>
                        <div className="Path"></div>
                        <div>
                            <span className="haveaccount">Already have an account? <span onClick={this.handleLogin} style={{ color: 'orange' }}>Login</span></span>
                        </div>
                    </div>
                </Modal>
            </div >

        )
    }

}

export default withRouter(Header);