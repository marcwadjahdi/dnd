import {Pipe, PipeTransform} from '@angular/core';
import {Character} from '../../character.model';

const SEPARATOR = ' / ';

@Pipe({name: 'hpFormatter'})
export class HpFormatterPipe implements PipeTransform {

  constructor() {
  }

  transform(character: Character): string {
    const hp = character.hp || character.maxHP;
    const {maxHP} = character;
    const hpLevel = hp / maxHP;
    const hpCls = hpLevel === 0 ? 'dead'
      : (hpLevel > 0.5 ? 'healthy' : (hpLevel > 0.25 ? 'warning' : 'danger'));
    return `<span class="hp hp-${hpCls}">${hp}${SEPARATOR}${maxHP}</span>`;
  }

  parse(str: string): number {
    const [hp, maxHP] = str.split('>')[1].split('<')[0].split(SEPARATOR);

    return parseInt(hp, 10);
  }

}
