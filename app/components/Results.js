import React, { Component } from 'react';
import queryString from 'query-string';
import { battle } from '../utils/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

function Profile ({info}) {
    const {
        login,
        avatar_url,
        name,
        location,
        company,
        followers,
        following,
        public_repos,
        blog
    } = info;

    return (
        <PlayerPreview username={login} avatar={avatar_url}>
            <ul className='space-list-items'>
                {name && <li>{name}</li>}
                {location && <li>{location}</li>}
                {company && <li>{company}</li>}
                <li>Followers: {followers}</li>
                <li>Following: {following}</li>
                <li>Public Repos: {public_repos}</li>
                {blog && <li><a href={blog}>{blog}</a></li>}
            </ul>
        </PlayerPreview>
    );
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}


function Player({label, score, profile}) {
    return (
        <div>
            <h1  className='header'>{label}</h1>
            <h3 style={{textAlign:'center'}}>{`Score: ${score}`}</h3>
            <Profile info={profile} />
        </div>
    );
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,
};

class Results extends Component{
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        const { location: {search} } = this.props;
        const { playerOneName, playerTwoName } = queryString.parse(search);

        const results = await battle([playerOneName, playerTwoName])
        if(results === null) {
            this.setState(() => ({
                error:'Looks like there was an error. Check that both users exist.',
                loading: false
            }));

        } else {
            this.setState(() => ({
                error: null,
                loading: false,
                winner: results[0],
                loser: results[1]
            }));
        }
    }

    render() {
        const {
            error,
            winner,
            loser,
            loading 
        } = this.state;

        if (loading) {
            return <Loading />
        }

        if (error){
            return (
                <div>
                    <p>error</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            );
        }
        
        return (
            <div className='row'>
                <Player label='1st Place'
                    score={winner.score}
                    profile={winner.profile} />
                <Player label='2nd Place'
                    score={loser.score}
                    profile={loser.profile} />
            </div>
        );
    }
}

export default Results;