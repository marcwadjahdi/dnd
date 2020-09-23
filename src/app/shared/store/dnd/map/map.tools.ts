import GeometryType from 'ol/geom/GeometryType';

export const TOOLS = {
  edit: 'edit',
  trash: 'trash',
  eraser: 'eraser',
  point: GeometryType.POINT,
  line: GeometryType.LINE_STRING,
  polygon: GeometryType.POLYGON,
  circle: GeometryType.CIRCLE,
};
