import React from 'react';
import {RouteHandler} from 'react-router';


let HomePage = React.createClass({
    render() {
        return (
            <div className="home">
                <h1>Welcome to the Homepage!</h1>
                <RouteHandler />
            </div>
        );
    }
});

export default HomePage;