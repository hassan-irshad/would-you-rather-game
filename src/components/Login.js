import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'
import { setAuthedUser } from '../actions/authedUser'
import { fakeAuth } from '../authentication/auth'
import { Redirect } from 'react-router-dom'
import '../css/login.css'

class Login extends Component {
    state = {
        userId: null,
        redirectToReferrer: false
    }
    handleChange = (e) => {
        this.setState({
            userId: e.target.value
        })
    }
    login = (e) => {
        e.preventDefault()
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToReferrer: true
            })
        })
        this.props.dispatch(setAuthedUser(this.state.userId))
    }
    render() {
        const { redirectToReferrer } = this.state
        const { from } = this.props.location.state || { from : { pathname: '/' } }

        if (redirectToReferrer === true) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div className="box">
                    <Card className="card-login">
                        <Card.Header className="card-login-header" as="h5">Would You Rather Game</Card.Header>
                        <Card.Body className="card-login-body">
                            <Card.Title>Sign In to begin the game</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                    <Form.Control as="select" onChange={this.handleChange}>
                                    <option hidden value="default">Username</option>
                                        {this.props.users.map((id) => (
                                            <option key={id} value={id}>
                                                {id}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="warning" onClick={this.login}>Sign in</Button>
                            </Form>
                        </Card.Body>
                    </Card>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)