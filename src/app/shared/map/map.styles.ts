import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

const defaultPointRadius = 15;
const defaultFill = '#cccccc99';
const defaultStroke = '#ffcc33';

export const STYLES = {
  friendlyNPC: new CircleStyle({
    radius: defaultPointRadius,
    fill: new Fill({color: '#33ff3333'}),
    stroke: new Stroke({color: '#33ff33', width: 2})
  }),
  hostileNPC: new CircleStyle({
    radius: defaultPointRadius,
    fill: new Fill({color: '#ff333333'}),
    stroke: new Stroke({color: '#ff3333', width: 2})
  }),
  Point: new Style({
    image: new CircleStyle({
      radius: defaultPointRadius,
      fill: new Fill({color: defaultFill}),
      stroke: new Stroke({color: defaultStroke, width: 2})
    })
  }),
  LineString: new Style({
    fill: new Fill({color: defaultFill}),
    stroke: new Stroke({color: defaultStroke, width: 2}),
  }),
  Polygon: new Style({
    fill: new Fill({color: defaultFill}),
    stroke: new Stroke({color: defaultStroke, width: 2}),
  }),
  Circle: new Style({
    fill: new Fill({color: defaultFill}),
    stroke: new Stroke({color: defaultStroke, width: 2}),
  }),
};
