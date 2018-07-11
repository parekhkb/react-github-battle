var axios = require('axios');

function getProfile (username) {
    return axios.get('https://api.github.com/users/'+ username)
                .then(function(user) {
                    return user.data;
                });
}

function getRepos (username) {
    return axios.get('https://api.github.com/users/'+ username + '/repos' + '?per_page=100');
}

function getStarCount (repos) {
    return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);
}

function calculateScore (profile, repos) {
    var followers = profile.followers;
    var stars = getStarCount(repos);
    return (followers * 3) + stars;
}

function handleError (error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
                    getProfile(player),
                    getRepos(player),
                ])
                .then(results => {
                    var profile = results[0];
                    var repos = results[1];

                    return { 
                        profile: profile,
                        score: calculateScore(profile, repos)
                    };
                });
}

function sortPlayers(players) {
    return players.sort((a,b) => b.score - a.score);
}

module.exports = {
    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'
                                    + language
                                    + '&sort=starts&order=desc&type=Repositories');
        return axios.get(encodedURI)
                    .then(function(response){
                        return response.data.items;
                    });
    },
    battle: function (players) {
        return axios.all(players.map(getUserData))
                    .then(sortPlayers)
                    .catch(handleError);
    }
}