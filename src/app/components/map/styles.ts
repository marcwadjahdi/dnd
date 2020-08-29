import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

const defaultPointRadius = 15;
const defaultFill = '#cccccc99';
const defaultStroke = '#ffcc33';

function newPointStyle(fillColor, strokeColor) {
  return new Style({
    image: new CircleStyle({
      radius: defaultPointRadius,
      fill: new Fill({color: fillColor}),
      stroke: new Stroke({color: strokeColor, width: 2})
    })
  });
}

export const STYLES = {
  player: newPointStyle('#33ff3333', '#33ff33'),
  monster: newPointStyle('#ff333333', '#ff3333'),
  Point: newPointStyle(defaultFill, defaultStroke),
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
