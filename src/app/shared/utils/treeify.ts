import ImageLayer from 'ol/layer/Image';
import Static from 'ol/source/ImageStatic';
import {Group as GrouLayer} from 'ol/layer';
import {EXTENT, LAYER_PATH_PREFIX, PROJECTION} from '../dnd/map/map.constants';

function toUrlLayer(url) {
  return `${LAYER_PATH_PREFIX}${url}`;
}

function toTitle(file) {
  return file.split('.').shift().split('_').map(it => `${it[0].toUpperCase()}${it.substr(1).toLocaleLowerCase()}`).join(' ');
}

function toGroupeLayer(title: string) {
  return new GrouLayer({title, layers: []});
}

function toImageLayer({title, url}) {
  return new ImageLayer({
    title,
    source: new Static({
      url: toUrlLayer(url),
      projection: PROJECTION,
      imageExtent: EXTENT
    }),
  });
}

function findLayerByTitle(group, title) {
  return group.getLayersArray().find(it => it.get('title') === title);
}

function addToGroupLayer(group, layer) {
  group.getLayers().extend([layer]);
}

export function Treeify(files) {
  if (!Array.isArray(files)) {
    return {};
  }

  const layerTree = new GrouLayer({
    title: 'Basemaps',
    layers: [],
  });


  function mergeInTree(previousGroup, currentGroupTitle, i, path) {
    const pathSize = path.length - 1;

    if (i === pathSize) {
      addToGroupLayer(previousGroup, toImageLayer(path.pop));
      const layer = path.pop();
      previousGroup[layer.title] = layer;
    }

    const existingLayer = findLayerByTitle(previousGroup, currentGroupTitle);

    if (!existingLayer && i < pathSize) {
      addToGroupLayer(previousGroup, toGroupeLayer(currentGroupTitle));
    }

    return findLayerByTitle(previousGroup, currentGroupTitle);
  }

  files.forEach(url => {
    let path = url.split('/');
    const title = toTitle(path.pop());
    path = path.map(toTitle);
    const layer = {url, title};

    if (path.length === 0) {
      return addToGroupLayer(layerTree, toImageLayer(layer));
    }

    path.push(layer);
    path.reduce(mergeInTree, layerTree);
  });

  return Object.values(layerTree);
}
