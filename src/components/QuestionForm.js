import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Form } from 'react-bootstrap'
import { handleSaveQuestion } from '../actions/shared'
import '../css/questionView.css'

class QuestionForm extends Component {
    state = {
        option1: null,
        option2: null
    }
    handleChange1 = (e) => {
        this.setState({
            option1: e.target.value
        })
    }
    handleChange2 = (e) => {
        this.setState({
            option2: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleSaveQuestion(this.props.authedUser, this.state.option1, this.state.option2))
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                <div className="question-view-box">
                    <Card>
                        <Card.Body>
                            <Card.Title>Would you Rather...</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                <Form.Control onChange={this.handleChange1} type="text" placeholder="Option 1" />
                                <span>Or</span>
                                <Form.Control onChange={this.handleChange2} type="text" placeholder="Option 2" />
                                </Form.Group>
                                <Button variant="warning" onClick={this.onSubmit} block>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionForm)