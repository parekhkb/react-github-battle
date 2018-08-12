const React = require('react');
const PropTypes = require('prop-types');

class Loading extends React.Component {
    constructor(props){
        super(props);

        const { text } = props;
        this.state = { text };
    }

    componentDidMount() {
        const { text, speed } = this.props;
        const stopper = `${text}...`;

        this.interval = window.setInterval(() => {
            this.state.text === stopper 
                ? this.setState(() => ({ text })) 
                : this.setState((prevState) => ({ text: `${prevState.text}.`}));
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        const { text } = this.state;
        return (
            <p style={{textAlign: 'center',fontSize: '35px'}}>{text}</p>
        );
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number

}

module.exports = Loading;