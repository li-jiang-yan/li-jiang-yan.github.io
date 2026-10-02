import { ProjectCol } from "./components/ProjectCol.js";
import projects from '../data/projects.json' with { type: 'json' };


export function showProjects () {
  const activeSkills = new Set(
    Array.from(document.querySelectorAll('.btn-skill.active')).map(btn => btn.innerText)
  );
  document.querySelector('#projects').replaceChildren(
    ...projects.data.filter(
      object => (object.skills.filter(skill => activeSkills.has(skill)).length > 0)
    ).map(object => ProjectCol(object))
  );
}

document.querySelectorAll('.btn-skill').forEach(
  btn => btn.addEventListener('click', showProjects)
);

showProjects();
