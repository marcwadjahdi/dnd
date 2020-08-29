import { createAction, props } from '@ngrx/store';
import { DialogConfig, OpenConfig } from './dialog.models';

export const DialogActions = {
    Open: createAction(`[DIALOG] Open Custom Dialog Component`, props<OpenConfig>()),
    OpenDialog: createAction(`[DIALOG] Open Default Dialog`, props<{ config: DialogConfig }>()),
    DialogOpened: createAction(`[DIALOG] Dialog opened`),
    Close: createAction(`[DIALOG] Closing current modal`),
    Closed: createAction(`[DIALOG] Closed`)
};
