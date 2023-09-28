import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as rawData from './data.json';

// TODO: work on light mode styling
let team = Team.load(JSON.stringify(rawData));
const egoLevels = ['Zayin', 'Teth', 'He', 'Waw', 'Aleph'];
const initialData = JSON.parse(team.as_json_string());

function generateIdSelector(sinnerName, identities, selected) {
  const button = document.createElement('button');
  const selector = document.createElement('select');
  const idDialog = document.createElement('dialog');
  button.className = 'w-full h-full bg-orange-500 truncate block max-w-full p-1';
  button.innerText = selected.name;
  button.addEventListener('click', () => {
    idDialog.showModal();
  });
  identities.forEach((id) => {
    const option = document.createElement('option');
    option.innerHTML = id.name;
    option.selected = id.name === selected.name;
    selector.appendChild(option);
  });
  selector.addEventListener('change', () => {
    team.change_selected_id(sinnerName, selector.value);
    button.innerText = selector.value;
    idDialog.close();
    updateSins();
  });
  idDialog.addEventListener('click', (event) => {
    const rect = idDialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      idDialog.close();
    }
  });
  idDialog.appendChild(selector);
  return [button, idDialog];
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
    // sinner name
    const nameContainer = sinnerContainers[i].querySelector('p.name');
    nameContainer.innerHTML = sinner.name;

    // sinner id
    const idContainer = sinnerContainers[i].querySelector('span.identity');
    let [button, dialog] = generateIdSelector(sinner.name, sinner.all_identities, sinner.selected_identity);
    idContainer.appendChild(button);
    idContainer.appendChild(dialog);

    
    // egos
    const egoContainer = sinnerContainers[i].querySelector('span.ego');
    egoContainer.innerHTML = `${sinner.selected_egos[0].name}: ${sinner.all_egos.length}`;

    // is sinner selected
    const isInTeamCheckboxContainer = sinnerContainers[i].querySelector('span.in-team-checkbox-container');
    isInTeamCheckboxContainer.prepend(generateInTeamCheckbox(sinner.in_team, sinner.name));
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
