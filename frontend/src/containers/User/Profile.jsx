import React, {Component} from 'react';
import {store} from '../../index';

class Profile extends Component {
    // Render component view
    render() {
        return (
            <h1>Hello {store.getState().user.data.first_name}</h1>
        )
    }
}

export default Profile;