const axios = require('axios');

const getProfile = username => axios.get(`https://api.github.com/users/${username}`)
                                    .then(user => user.data);

const getRepos = username => axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);

const getStarCount  = ({ data }) => data.reduce((count, {stargazers_count}) => count + stargazers_count, 0);

const calculateScore = ({followers}, repos) => followers * 3 + getStarCount(repos);

const handleError = error => console.warn(error) && null;

const getUserData = player => Promise.all([
                                    getProfile(player), 
                                    getRepos(player)
                                ])
                                .then(([profile, repos]) =>  ({ 
                                    profile,
                                    score: calculateScore(profile, repos)}) 
                                );

const sortPlayers = players => players.sort((a,b) => b.score - a.score);

const getUrl = lang => window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=starts&order=desc&type=Repositories`);

module.exports = {
    battle: players => Promise.all(players.map(getUserData)).then(sortPlayers).catch(handleError),
    fetchPopularRepos: lang => axios.get(getUrl(lang)).then(response => response.data.items)
}