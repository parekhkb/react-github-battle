const React = require('react');
const PropTypes = require('prop-types');
const api = require('../utils/api');
const Loading = require('./Loading');

const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'CSharp'];

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

class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(lang) {
        this.setState(()=>({
            selectedLanguage : lang,
            repos: null
        }));

        api.fetchPopularRepos(lang)
           .then(repos => this.setState(() => ({ repos })));
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

module.exports = Popular;