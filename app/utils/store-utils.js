import {EventEmitter} from 'events';
import assign from 'object-assign';

// Based on https://github.com/gaearon/flux-react-router-example/blob/master/scripts/utils/StoreUtils.js
const CHANGE_EVENT = 'change';

export function createStore(spec) {

    const store = assign({}, EventEmitter.prototype, {
        emitChange() {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener(callback) {
            this.on(CHANGE_EVENT, callback);
        },

        removeChangeListener(callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    }, spec);
    store.setMaxListeners(0);

    return store;
};