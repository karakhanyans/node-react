import React, {Component} from 'react';
import {connect} from 'react-redux';

export default function (ComposedComponent) {
    // Middleware for check user logged in or not
    class Authenticated extends Component {
        componentDidMount() {
            if (!localStorage.getItem('token')) {
                this.props.history.push('/login');
            }
        }

        // Handle component updates
        componentWillUpdate(nextProps) {
            if (!nextProps.loggedIn) {
                this.props.history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps(state) {
        return {
            loggedIn: state.user.data._id !== undefined
        }
    }

    return connect(mapStateToProps)(Authenticated);
}