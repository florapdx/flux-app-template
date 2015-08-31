import React from 'react';
import {RouteHandler} from 'react-router';
import SessionStore from '../stores/session-store';


// If you need to do anything at the top-level of your app tree, such as
// check session state or render persistent UI, you may do it here.
let App = React.createClass({
    render() {
        return (
            <div className="my-app">
                <RouteHandler />
            </div>
        );
    }
});

export default App;