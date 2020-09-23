import Map from 'ol/Map';

interface Interaction {
  map: Map;

  addInteraction(map: Map);

  removeInteraction();
}
