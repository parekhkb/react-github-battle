var React = require('react');
var Popular = require('./Popular');
var ReactRouter = require('react-router-dom');
var BrowserRouter = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Switch = ReactRouter.Switch;
var Results = require('./Results');

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