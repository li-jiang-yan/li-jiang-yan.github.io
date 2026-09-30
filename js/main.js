import { ProjectCol } from "./components/ProjectCol.js";
import projects from '../data/projects.json' with { type: 'json' };


document.querySelector('#projects').replaceChildren(
  ...projects.data.map(object => ProjectCol(object))
);
