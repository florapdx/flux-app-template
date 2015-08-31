import React from 'react';
import {RouteHandler} from 'react-router';

let NotFound = React.createClass({
    render() {
        return (
            <div>
                <h2>Oops! We couldn't find what you're looking for.</h2>
                <RouteHandler />
            </div>
        );
    }
});

export default NotFound;