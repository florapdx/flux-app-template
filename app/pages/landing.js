import React from 'react';
import {RouteHandler} from 'react-router';


let Landing = React.createClass({
    render() {
        return (
            <div className="my-app">
                <h1>Welcome to the Landing Page</h1>
                <RouteHandler />
            </div>
        );
    }
});

export default Landing;