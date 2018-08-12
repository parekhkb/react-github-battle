async function getProfile(username){
     const user = await fetch(`https://api.github.com/users/${username}`);
     return await user.json();
}

async function getRepos(username){
    const repos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    return await repos.json();
}
const getStarCount  = (data) => data.reduce((count, {stargazers_count}) => count + stargazers_count, 0);

const calculateScore = ({followers}, repos) => followers * 3 + getStarCount(repos);

async function getUserData(player) {
    let getProfilePromise = getProfile(player);
    let getReposPromise = getRepos(player);
    const profile = await getProfilePromise;
    const repos = await getReposPromise;

    return {
        profile,
        score: calculateScore(profile, repos) 
    };
}

const sortPlayers = players => players.sort((a,b) => b.score - a.score);

const getUrl = lang => window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${lang}&sort=starts&order=desc&type=Repositories`);

const handleError = error => console.warn(error) && null;

export async function battle(players){
    let playerData = await Promise.all(players.map(getUserData))
        .catch(handleError);

    if(playerData){
        playerData = sortPlayers(playerData);
    }    
    
    return playerData;
}

export async function fetchPopularRepos(lang) {
    const response = await fetch(getUrl(lang)).catch(handleError);
    if(!response){
        return null;
    }
    
    const data = await response.json();
    return data.items;
}