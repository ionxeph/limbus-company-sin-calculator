import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as rawData from './data.json';

// TODO: work on light mode styling
let team = Team.load(JSON.stringify(rawData));
const egoLevels = ['Zayin', 'Teth', 'He', 'Waw', 'Aleph'];
const initialData = JSON.parse(team.as_json_string());

function createDialogWithBackdrop() {
  const dialog = document.createElement('dialog');
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  return dialog;
}
function generateIdSelector(sinner) {
  const [sinnerName, identities, selected] = [sinner.name, sinner.all_identities, sinner.selected_identity];
  const button = document.createElement('button');
  const selector = document.createElement('select');
  const dialog = createDialogWithBackdrop();
  button.className = 'w-full h-full bg-orange-500 truncate block max-w-full p-1';
  button.innerText = selected.name;
  button.addEventListener('click', () => {
    dialog.showModal();
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
    dialog.close();
    updateCalculatedElements();
  });
  dialog.appendChild(selector);
  return [button, dialog];
}

function generateEgoSelector(sinner) {
  const [sinnerName, selectedEgos, allEgos] = [sinner.name, sinner.selected_egos, sinner.all_egos];
  const button = document.createElement('button');
  button.className = 'w-full h-full truncate block max-w-full p-1 grid grid-cols-4 grid-rows-5 gap-1';
  const dialog = createDialogWithBackdrop();
  const dialogContent = document.createElement('div');
  dialogContent.className = 'grid grid-cols-1';
  dialog.appendChild(dialogContent);
  button.addEventListener('click', () => {
    dialog.showModal();
  });
  egoLevels.forEach((level) => {
    const levelIndicator = document.createElement('span');
    levelIndicator.className = 'w-full h-full truncate block max-w-full col-span-1 text-left';
    levelIndicator.innerHTML = level;

    const currentSelected = document.createElement('span');
    currentSelected.className = 'w-full h-full truncate block max-w-full col-span-3 text-left';
    const selectedEgo = selectedEgos.filter((e) => e.level === level);
    currentSelected.innerHTML = selectedEgo.length > 0 ? selectedEgo[0].name : '';
    button.appendChild(levelIndicator);
    button.appendChild(currentSelected);

    const selector = document.createElement('select');
    selector.className = 'mb-2';
    const allEgosAtThisLevel = allEgos.filter((e) => e.level === level);
    if (level !== 'Zayin') {
      const option = document.createElement('option');
      option.innerHTML = 'None';
      if (allEgosAtThisLevel.length === 0) {
        option.selected = true;
      }
      selector.appendChild(option);
    }
    allEgosAtThisLevel.forEach((ego) => {
      const option = document.createElement('option');
      option.innerHTML = ego.name;
      option.selected = selectedEgos.filter((e) => e.name === ego.name).length > 0;
      if (option.selected) {
        selector.setAttribute('data-current', ego.name);
      }
      selector.appendChild(option);
    });
    selector.addEventListener('change', () => {
      if (selector.value === 'None') {
        team.toggle_ego(sinnerName, selector.dataset.current);
      } else {
        team.toggle_ego(sinnerName, selector.value);
      }
      selector.setAttribute('data-current', selector.value);
      updateCalculatedElements();
    });
    dialogContent.appendChild(selector);
  });
  return [button, dialog];
}

function generateInTeamCheckbox(sinner) {
  const [inTeam, sinnerName] = [sinner.in_team, sinner.name];
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = inTeam;
  checkbox.setAttribute('aria-label', `select ${sinnerName}`);
  checkbox.className =
    'appearance-none peer w-8 h-8 bg-gray-300 border-gray-300 rounded focus:ring-red-500 focus:ring-2 checked:border-0 dark:bg-gray-700 dark:border-gray-600 checked:bg-slate-300 dark:checked:bg-slate-500 dark:focus:ring-red-600 dark:ring-offset-gray-800';
  checkbox.addEventListener('change', () => {
    team.toggle_sinner_selection(sinnerName);
    updateCalculatedElements();
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
    let [idButton, idDialog] = generateIdSelector(sinner);
    idContainer.appendChild(idButton);
    idContainer.appendChild(idDialog);

    // egos
    const egoContainer = sinnerContainers[i].querySelector('span.ego');
    let [egoButton, egoDialog] = generateEgoSelector(sinner);
    egoContainer.appendChild(egoButton);
    egoContainer.appendChild(egoDialog);

    // is sinner selected
    const isInTeamCheckboxContainer = sinnerContainers[i].querySelector('span.in-team-checkbox-container');
    isInTeamCheckboxContainer.appendChild(generateInTeamCheckbox(sinner));
  });
  document.body.removeAttribute('style');
}

function updateCalculatedElements() {
  const sinsContainer = document.getElementById('sins-container');
  const supportedSins = JSON.parse(team.sum_supported_sins());
  const requiredSins = JSON.parse(team.sum_required_sins());
  const updatedData = JSON.parse(team.as_json_string());
  for (let sin in supportedSins) {
    sinsContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = `${supportedSins[sin]}/${requiredSins[sin]}`;
  }
  updatedData.sinners.forEach((sinner, i) => {
    const egoContainers = document
      .getElementById('sinner-container')
      .querySelectorAll('div.sinner-element')
      [i].querySelectorAll('span.ego button span.col-span-3');
    egoLevels.forEach((level, i) => {
      const selectedEgo = sinner.selected_egos.filter((e) => e.level === level);
      egoContainers[i].innerHTML = selectedEgo.length > 0 ? selectedEgo[0].name : '';
    });
  });
}

initialRender();
updateCalculatedElements();
