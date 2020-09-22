import {StoryStep} from './stroy.models';

export const STRORY_FEATURE = 'stroy';

export interface StoryState {
  active: StoryStep;
  archived: StoryStep[];
}

export interface StroyPartialState {
  [STRORY_FEATURE]: StoryState;
}

