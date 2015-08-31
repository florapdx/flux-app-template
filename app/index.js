import React from 'react';
import Router from 'react-router';
import routes from './routes';
import _ from 'lodash';

window.React = React;
window._ = _;

Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    React.render(<Handler {...state} />, document.getElementById('app-wrapper'));
});