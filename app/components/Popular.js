import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

const languages = ['All', 'C', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'CSharp', 'GoLang'];

function SelectedLanguage({selectedLanguage, onSelect}) {
    return (
        <ul className='languages'>
            {languages.map(lang => (
                    <li style={lang === selectedLanguage ? {color:'#d0021b'} : null}
                        key={lang}
                        onClick={() => onSelect(lang)}>
                    {lang}
                    </li>
                )
            )}
        </ul>
    );
}    

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

function ReposGrid({ repos }) {
    return (
        <ul className="popular-list">
            {repos.map(({name, html_url, stargazers_count, owner }, index) => (
                    <li key={name} className='popular-item'>
                        <div className='popular-rank'>#{index + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img 
                                    className='avatar'
                                    src={owner.avatar_url}
                                    alt={`Avatar for ${owner.login}`} />
                            </li>
                            <li><a href={html_url}>{name}</a></li>
                            <li>@{owner.login}</li>
                            <li>{stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            )}
        </ul>
    );
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends Component{
    state = {
        selectedLanguage: 'All',
        repos: null
    };

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage = async lang => {
        this.setState(()=>({
            selectedLanguage : lang,
            repos: null
        }));

        const repos = await fetchPopularRepos(lang);
        this.setState(() => ({ repos }));
    }

    render() {
        const {repos, selectedLanguage} = this.state;

        return (
            <div>
            <SelectedLanguage 
                onSelect={this.updateLanguage} 
                selectedLanguage={selectedLanguage} />
            {!repos
                ? <Loading text='Querying' speed={200}/>
                : <ReposGrid repos={repos} />}
            </div>
        )
    }
}

export default Popular;