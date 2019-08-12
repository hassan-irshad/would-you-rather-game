import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { deleteAuthedUser } from '../actions/authedUser'
import '../css/navbar.css'

class NavigationBar extends Component {
    logout = () => {
        this.props.dispatch(deleteAuthedUser())
    }
    render() {
        const { loggedInUser } = this.props
        if(this.props.authedUser === '') {
            return (
                <Redirect to="/login" />
            )
        }

        return (
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Would You Rather</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse  id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/add">New Question</Link>
                        <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                    </Nav>
                    <Nav>
                    <Image src={loggedInUser.avatarURL} rounded />
                    <NavDropdown title={'Hello, '+loggedInUser.name} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                        {/*<div className="navText">Hello, {loggedInUser.name}</div>
                        <Image src={loggedInUser.avatarURL} rounded />
        <Button variant="light" onClick={this.logout}>Logout</Button>*/}
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            
        )
    }
}

function mapStateToProps({ authedUser, users } ){
    return {
        loggedInUser: users[authedUser],
        authedUser
    }
}

export default connect(mapStateToProps)(NavigationBar)