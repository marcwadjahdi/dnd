import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClikState } from 'app/shared/store/clik.state';
import { DIALOG_FEATURE_NAME, DialogState } from './dialog.state';

const selectState = createFeatureSelector<ClikState, DialogState>(DIALOG_FEATURE_NAME);
const Current = createSelector(selectState, state => state.current);
const Closing = createSelector(selectState, state => state.closing);

export const DialogSelectors = { Current, Closing };
