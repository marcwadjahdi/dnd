export interface CharacterSize {
  name: string;
  ratio: number;
}

export const CharacterSizes = {
  Tiny: {name: 'Tiny', ratio: 0.5},
  Small: {name: 'Small', ratio: 0.75},
  Medium: {name: 'Medium', ratio: 1},
  Large: {name: 'Large', ratio: 2},
  Huge: {name: 'Huge', ratio: 3},
  Gargantuan: {name: 'Gargantuan', ratio: 4},
};
