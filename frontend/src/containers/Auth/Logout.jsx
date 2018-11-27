import {Component} from 'react';
import {store} from "../../index";
import {logout} from "../../actions/authActions";

class Logout extends Component {
    componentDidMount() {
        store.dispatch(logout());
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    render() {
        return null;
    }
}

export default Logout;