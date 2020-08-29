import {Attributes,  HasAttributes, HasItems, HasLevel, Identified, Item, Named} from 'src/app/shared/dnd';

export interface IHero extends  Identified, Named, HasLevel, HasAttributes, HasItems {
}

export class Hero implements IHero {
    static readonly FeatureName = 'Hero';

    id: number;
    name: string;
    level: number;
    attributes: Attributes;
    items: Array<Item> = [];

    constructor(hero: IHero = {}) {
        Object.assign(this, hero);
    }
}
