import { createReducer, on } from '@ngrx/store';
import { DialogState } from './dialog.state';
import { DialogActions } from 'app/shared/store/dialog/dialog.actions';

function getInitialState(): DialogState {
    return { current: 0, closing: null };
}

const onOpen = state => {
    const current = state.current + 1;
    return { current };
};

const onClose = state => {
    return { current: state.current, closing: state.current };
};

const onClosed = state => {
    let current = state.current - 1;
    if (current <= 0) {
        current = 0;
    }
    return { current, closing: null };
};

export function DialogReducer(state, action) {
    return createReducer(
        getInitialState(),
        // LoadErrors
        on(DialogActions.Open, onOpen),
        on(DialogActions.OpenDialog, onOpen),
        on(DialogActions.Close, onClose),
        on(DialogActions.Closed, onClosed)
    )(state, action);
}
