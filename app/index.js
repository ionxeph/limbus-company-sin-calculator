import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as starterData from './starter-data.json';

// TODO: work on light mode styling
let team = Team.load(JSON.stringify(starterData));

let teamData = JSON.parse(team.as_json_string());

function generateInTeamCheckbox(inTeam, sinnerName) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = inTeam;
  checkbox.setAttribute('aria-label', `select ${sinnerName}`);
  checkbox.className = 'appearance-none peer w-8 h-8 bg-gray-300 border-gray-300 rounded focus:ring-red-500 focus:ring-2 checked:border-0dark:bg-gray-700 dark:border-gray-600 checked:bg-slate-300 dark:checked:bg-slate-500 dark:focus:ring-red-600 dark:ring-offset-gray-800';
  checkbox.addEventListener('change', () => {
    team.toggle_sinner_selection(sinnerName);
    updateSins();
  });
  return checkbox;
}

const sinnerContainers = document
  .getElementById('sinner-container')
  .querySelectorAll('div.sinner-element');
teamData.sinners.forEach((sinner, i) => {
  const nameContainer = sinnerContainers[i].querySelector('p.name');
  const selectedIdContainer = sinnerContainers[i].querySelector('p.selected-id');
  const isInTeamCheckboxContainer = sinnerContainers[i].querySelector('span.in-team-checkbox-container');
  nameContainer.innerHTML = sinner.name;
  selectedIdContainer.innerHTML = sinner.selected_identity.name;
  isInTeamCheckboxContainer.innerHTML = `<svg class="absolute w-8 h-8 right-0 top-1 fill-slate-900 hidden peer-checked:block pointer-events-none"><use xlink:href="#icon-id" /></svg>`;
  isInTeamCheckboxContainer.prepend(generateInTeamCheckbox(sinner.in_team, sinner.name));
});

function updateSins() {
  const sinsContainer = document.getElementById('sins-container');
  let supportedSins = JSON.parse(team.sum_supported_sins());
  let requiredSins = JSON.parse(team.sum_required_sins());
  for (let sin in supportedSins) {
    sinsContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = `${requiredSins[sin]}/${supportedSins[sin]}`;
  }
}

updateSins();