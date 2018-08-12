import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loading extends Component { 
    static defaultProps = {
        text: 'Loading',
        speed: 300
    }

    static propTypes = {
        text: PropTypes.string,
        speed: PropTypes.number
    }

    state = { 
        text: this.props.text 
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

export default Loading;