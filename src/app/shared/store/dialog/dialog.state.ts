import { AppState } from 'app/shared/store/clik.state';

export interface DialogState extends AppState {
    current: number;
    closing: number;
}

export const DIALOG_FEATURE_NAME = 'dialogs';

export interface DialogsPartialState {
    readonly [DIALOG_FEATURE_NAME]: DialogState;
}
