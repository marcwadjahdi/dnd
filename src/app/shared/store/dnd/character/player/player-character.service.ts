import {Injectable} from '@angular/core';
import {PlayerCharacter} from '../../../../models/character/player/player-character';


@Injectable({
  providedIn: 'root'
})
export class PlayerCharacterService {

  constructor() {
  }

  search(params: any = {}): PlayerCharacter[] {
    return [];
  }
}
