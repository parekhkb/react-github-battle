const React = require('react');
const Popular = require('./Popular');
const ReactRouter = require('react-router-dom');
const BrowserRouter = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');
const Switch = ReactRouter.Switch;
const Results = require('./Results');

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={()=> <p>Not Found</p>} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

module.exports = App;