import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as rawData from './data.json';

// TODO: work on light mode styling
const initialData = JSON.parse(JSON.stringify(rawData));
let team = Team.load(JSON.stringify(rawData));

// team.change_selected_id("Yi Sang", "Seven Association South Section 6");

function generateIdSelector(sinnerName, identities, selected) {
  const selector = document.createElement('select');
  identities.forEach(id => {
    const option = document.createElement('option');
    option.innerHTML = id.name;
    option.selected = id.name === selected.name;
    selector.appendChild(option);
  });
  selector.addEventListener('change', () => {
    team.change_selected_id(sinnerName, selector.value);
    updateSins();
  });
  return selector;
}

function generateInTeamCheckbox(inTeam, sinnerName) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = inTeam;
  checkbox.setAttribute('aria-label', `select ${sinnerName}`);
  checkbox.className =
    'appearance-none peer w-8 h-8 bg-gray-300 border-gray-300 rounded focus:ring-red-500 focus:ring-2 checked:border-0 dark:bg-gray-700 dark:border-gray-600 checked:bg-slate-300 dark:checked:bg-slate-500 dark:focus:ring-red-600 dark:ring-offset-gray-800';
  checkbox.addEventListener('change', () => {
    team.toggle_sinner_selection(sinnerName);
    updateSins();
  });
  return checkbox;
}

function initialRender() {
  const sinnerContainers = document.getElementById('sinner-container').querySelectorAll('div.sinner-element');
  initialData.sinners.forEach((sinner, i) => {
    const nameContainer = sinnerContainers[i].querySelector('p.name');
    const idContainer = sinnerContainers[i].querySelector('p.identity');
    const isInTeamCheckboxContainer = sinnerContainers[i].querySelector('span.in-team-checkbox-container');
    nameContainer.innerHTML = sinner.name;
    isInTeamCheckboxContainer.prepend(generateInTeamCheckbox(sinner.in_team, sinner.name));
    idContainer.appendChild(generateIdSelector(sinner.name, sinner.all_identities, sinner.selected_identity));
  });
  document.body.removeAttribute('style');
}

function updateSins() {
  const sinsContainer = document.getElementById('sins-container');
  let supportedSins = JSON.parse(team.sum_supported_sins());
  let requiredSins = JSON.parse(team.sum_required_sins());
  for (let sin in supportedSins) {
    sinsContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = `${requiredSins[sin]}/${supportedSins[sin]}`;
  }
}
initialRender();
updateSins();
