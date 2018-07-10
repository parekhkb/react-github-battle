var React = require('react');
var ReactRouter = require('react-router-dom')
var Link = ReactRouter.Link;
var NavLink = ReactRouter.NavLink;

function Nav () {
    return (
        <ul className="nav">
            <li><NavLink activeClassName='active' to='/' exact>Home</NavLink></li>
            <li><NavLink activeClassName='active' to='/battle'>Battle</NavLink></li>
            <li><NavLink activeClassName='active' to='/popular'>Popular</NavLink></li>
        </ul>
    );
}

module.exports = Nav;