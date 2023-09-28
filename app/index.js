import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as starterData from './starter-data.json';

// TODO: work on light mode styling
let team = Team.load(JSON.stringify(starterData));

let teamData = JSON.parse(team.as_json_string());
console.log(teamData);

function generateInTeamCheckbox(inTeam, sinnerName) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = inTeam;
  checkbox.setAttribute('aria-label', `select ${sinnerName}`)
  checkbox.addEventListener('change', () => {
    console.log(checkbox.checked);
    team.toggleSinnerSelection(sinnerName);
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
  isInTeamCheckboxContainer.appendChild(generateInTeamCheckbox(sinner.in_team, sinner.name));
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