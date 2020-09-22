import Feature from 'ol/Feature';
import {Character} from '../../../models/character/common/character.model';

export interface Environment {
  features: Feature[];
}

export interface StoryCharacter {
  order: number;
  initiative: number;
  size: number;

  character: Character;
  x: number;
  y: number;
}

export interface StoryTurn {
  id: number;
  characters: StoryCharacter[];
}

export interface StoryStep {
  creation: Date;
  basemap: string;
  environment: Environment;
  turns: StoryTurn[];
}
