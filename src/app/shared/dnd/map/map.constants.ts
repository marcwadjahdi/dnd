import Projection from 'ol/proj/Projection';

export const EXTENT = [0, 0, 1000, 1000];
export const PROJECTION = new Projection({
  code: 'xkcd-image',
  units: 'pixels',
  extent: EXTENT,
});
export const ZOOM_MIN = 2;
export const ZOOM_MAX = 3.5;


