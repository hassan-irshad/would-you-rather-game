import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap'
import LeaderboardCard from './LeaderboardCard';
import '../css/leaderboard.css'

class Leaderboard extends Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                    <div className="leaderboard">
                        {this.props.sortedUsers.map((user) => (
                            <LeaderboardCard key={user.id} user={user} />
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    const sortedUsers = (Object.values(users)).sort((a, b) => {
        const x1 = (Object.keys(a.answers)).length + a.questions.length
        const x2 = (Object.keys(b.answers)).length + b.questions.length
        return x2 - x1
    })
    return {
        sortedUsers
    }
}

export default connect(mapStateToProps)(Leaderboard)