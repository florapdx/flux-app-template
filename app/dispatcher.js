import {Dispatcher} from 'flux';
import assign from 'object-assign';
import PayloadSources from './constants/payload-sources';

/*
 * There's some debate around the utility of distinguishing server and view actions in this way.
 * Inclusion here supports a) being able to easily which action sources when reading action code,
 * and b) intercepting data coming in from services, should that be necessary.
*/

const AppDispatcher = assign(new Dispatcher(), {

    handleViewAction(action) {
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    },

    handleServerAction(action) {
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    }
});

export default AppDispatcher;