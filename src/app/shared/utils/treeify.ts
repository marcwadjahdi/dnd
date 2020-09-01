function Treeify(files) {
  const fileTree = {};

  if (files instanceof Array === false) {
    throw new Error('Expected an Array of file paths, but saw ' + files);
  }

  function mergePathsIntoFileTree(prevDir, currDir, i, filePath) {

    if (i === filePath.length - 1) {
      prevDir[currDir] = filePath.join('/');
    }

    if (!prevDir.hasOwnProperty(currDir)) {
      prevDir[currDir] = {};
    }

    return prevDir[currDir];
  }

  function parseFilePath(filePath) {
    const fileLocation = filePath.split('/');

    // If file is in root directory, eg 'index.js'
    if (fileLocation.length === 1) {
      return (fileTree[fileLocation[0]] = filePath);
    }

    fileLocation.reduce(mergePathsIntoFileTree, fileTree);
  }

  files.forEach(parseFilePath);

  return fileTree;
}
