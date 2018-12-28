import { exampleCat } from '../../examples/import-export/json-cat';

const STORAGE_KEY = 'pixelart-react-v3-0-0';

/*
 *  Storage data structure
 *
 *  {
 *   stored: [
 *     { frames: [],paletteGridData, cellSize, columns, rows, animate},
 *     { frames: [],paletteGridData, cellSize, columns, rows, animate},
 *     ...
 *   ]
 *   current: position
 *  }
 *
 */

function saveDataToStorage(storage, data) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    return false; // There was an error
  }
}

/*
  Storage initialization
*/
export function initStorage(storage) {
  storage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      stored: [exampleCat], // Load an example project data by default
      current: 0
    })
  );
}

/*
  Get stored data from the storage
*/
export function getDataFromStorage(storage) {
  try {
    const data = storage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : false;
  } catch (e) {
    return false; // There was an error
  }
}

/*
  Save a project into the stored data collection
*/
export function saveProjectToStorage(storage, projectData) {
  try {
    let dataStored = getDataFromStorage(storage);
    if (dataStored) {
      dataStored.stored.push(projectData);
      dataStored.current = dataStored.stored.length - 1;
    } else {
      dataStored = {
        stored: [projectData],
        current: 0
      };
    }
    storage.setItem(STORAGE_KEY, JSON.stringify(dataStored));
    return true;
  } catch (e) {
    return false; // There was an error
  }
}

/*
  Remove a project from the stored data collection
*/
export function removeProjectFromStorage(storage, indexToRemove) {
  const dataStored = getDataFromStorage(storage);
  if (dataStored) {
    let newCurrent = 0;
    dataStored.stored.splice(indexToRemove, 1);
    if (dataStored.stored.length === 0) {
      newCurrent = -1; // Empty collection
    } else if (dataStored.current > indexToRemove) {
      newCurrent = dataStored.current - 1; // Current is greater than the one to remove
    }
    dataStored.current = newCurrent;
    return saveDataToStorage(storage, dataStored);
  }
  return false; // There was an error if it reaches this code
}

/*
  Returns the export code
*/
export function generateExportString(projectData) {
  try {
    return JSON.stringify(projectData);
  } catch (e) {
    return 'Sorry, there was an error';
  }
}

/*
  Returns project data ready from a exported data string
*/
export function exportedStringToProjectData(projectData) {
  if (projectData === '') {
    return false;
  }
  try {
    return JSON.parse(projectData);
  } catch (e) {
    return false;
  }
}
