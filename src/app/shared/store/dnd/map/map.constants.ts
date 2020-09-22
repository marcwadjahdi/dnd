import Projection from 'ol/proj/Projection';

export const battleMapID = 'battle_map';

export const extent = [0, 0, 1920, 1920];
export const projection = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent,
});
export const minZoom = 1;
export const maxZoom = 8;
