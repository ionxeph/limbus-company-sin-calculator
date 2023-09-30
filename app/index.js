import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as rawData from './data.json';

let storedData = localStorage.getItem(
  'limbus-company-sin-calculator-e2896bbf50e0ad7507c11f4664baa14d0c9868104c0d109ddb1a59292d3221b19f2f7677b26'
);
let team;
if (storedData) {
  let newData = JSON.parse(JSON.stringify(rawData));
  storedData = JSON.parse(storedData);
  newData.sinners.forEach((sinner, i) => {
    sinner.selected_identity = storedData.sinners[i].selected_identity;
    sinner.selected_egos = storedData.sinners[i].selected_egos;
    sinner.in_team = storedData.sinners[i].in_team;
  });
  team = Team.load(JSON.stringify(newData));
} else {
  team = Team.load(JSON.stringify(rawData));
}
const egoLevels = ['Zayin', 'Teth', 'He', 'Waw', 'Aleph'];
const initialData = JSON.parse(team.as_json_string());

function createDialogWithBackdrop() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog', 'text-right');

  const button = document.createElement('button');
  button.innerHTML = 'Close';
  button.className = 'border-black dark:text-white p-2 border-2 dark:border-white rounded mr-2 mt-2';
  button.addEventListener('click', () => {
    dialog.close();
  });
  dialog.appendChild(button);

  const dialogContent = document.createElement('div');
  dialogContent.classList.add('dialog__content');
  dialog.appendChild(dialogContent);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
  return [dialog, dialogContent];
}

function generateIdSelector(sinner) {
  const [sinnerName, identities, selected] = [sinner.name, sinner.all_identities, sinner.selected_identity];
  const [dialog, dialogContent] = createDialogWithBackdrop();
  dialogContent.classList.add('dialog__content--identity');
  identities.forEach((id) => {
    const button = document.createElement('button');
    button.innerHTML = id.name;

    button.classList.add('card', 'card--identity');
    button.classList.toggle('card--selected', id.name === selected.name);

    button.addEventListener('click', (e) => {
      team.change_selected_id(sinnerName, e.target.innerHTML);
      dialog.close();
      updateCalculatedElements();
    });
    dialogContent.appendChild(button);
  });
  return dialog;
}

function generateEgoSelector(sinner) {
  const [sinnerName, selectedEgos, allEgos] = [sinner.name, sinner.selected_egos, sinner.all_egos];
  const [dialog, dialogContent] = createDialogWithBackdrop();
  dialogContent.classList.add('grid', 'grid-cols-1');
  egoLevels.forEach((level) => {
    const levelContainer = document.createElement('div');
    levelContainer.className = 'ego-level-container';
    switch (level) {
      case 'Zayin':
        levelContainer.classList.add('border-purple-500');
        break;
      case 'Teth':
        levelContainer.classList.add('border-purple-600');
        break;
      case 'He':
        levelContainer.classList.add('border-purple-700');
        break;
      case 'Waw':
        levelContainer.classList.add('border-purple-800');
        break;
      case 'Aleph':
        levelContainer.classList.add('border-purple-900');
        break;
    }
    const levelTitle = document.createElement('p');
    levelTitle.className = 'dark:text-white m-2';
    levelTitle.innerText = level.toUpperCase();
    const allEgosAtThisLevel = allEgos.filter((e) => e.level === level);
    if (allEgosAtThisLevel.length > 0) {
      levelContainer.appendChild(levelTitle);
      allEgosAtThisLevel.forEach((ego) => {
        const button = document.createElement('button');
        button.classList.add('card', 'card--ego');
        button.classList.toggle('card--selected', selectedEgos.filter((e) => e.name === ego.name).length > 0);
        button.innerHTML = ego.name;
        button.addEventListener('click', () => {
          button.classList.toggle('card--selected');
          team.toggle_ego(sinnerName, ego.name);
          updateCalculatedElements();
        });
        levelContainer.appendChild(button);
      });
      dialogContent.appendChild(levelContainer);
    }
  });
  return dialog;
}

function generateInTeamCheckbox(sinner) {
  const [inTeam, sinnerName] = [sinner.in_team, sinner.name];
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = inTeam;
  checkbox.setAttribute('aria-label', `select ${sinnerName}`);
  checkbox.className = 'in-team-checkbox peer';
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
    let idDialog = generateIdSelector(sinner);
    idContainer.appendChild(idDialog);
    idContainer.querySelector('button').addEventListener('click', () => {
      idDialog.showModal();
    });

    // egos
    const egoContainer = sinnerContainers[i].querySelector('span.ego');
    let egoDialog = generateEgoSelector(sinner);
    egoContainer.appendChild(egoDialog);
    egoContainer.querySelector('button').addEventListener('click', () => {
      egoDialog.showModal();
    });

    // is sinner selected
    const isInTeamCheckboxContainer = sinnerContainers[i].querySelector('span.in-team-checkbox-container');
    isInTeamCheckboxContainer.prepend(generateInTeamCheckbox(sinner));
  });
  document.body.removeAttribute('style');
}

function updateCalculatedElements() {
  const updatedLocalStoredData = team.as_json_string();
  localStorage.setItem(
    'limbus-company-sin-calculator-e2896bbf50e0ad7507c11f4664baa14d0c9868104c0d109ddb1a59292d3221b19f2f7677b26',
    updatedLocalStoredData
  );
  const sinsContainer = document.getElementById('sins-container');
  const supportedSins = JSON.parse(team.sum_supported_sins());
  const requiredSins = JSON.parse(team.sum_required_sins());

  const updatedData = JSON.parse(updatedLocalStoredData);
  for (let sin in supportedSins) {
    sinsContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = `${supportedSins[sin]}/${requiredSins[sin]}`;
  }

  updatedData.sinners.forEach((sinner, i) => {
    const sinnerContainer = document.getElementById('sinner-container').querySelectorAll('div.sinner-element')[i];

    // selected id
    const selectedIdName = sinner.selected_identity.name;
    sinnerContainer.querySelector('button.identity-button').innerHTML = selectedIdName;
    sinnerContainer
      .querySelector('.dialog__content--identity')
      .querySelectorAll('button')
      .forEach((button) => {
        const selectedIdNoLongerSelected =
          button.classList.contains('card--selected') && button.innerHTML !== selectedIdName;
        const currentSelectedNotShownAsSelected =
          !button.classList.contains('card--selected') && button.innerHTML === selectedIdName;
        if (selectedIdNoLongerSelected) {
          button.classList.remove('card--selected');
        }
        if (currentSelectedNotShownAsSelected) {
          button.classList.add('card--selected');
        }
      });

    // selected egos
    const egoContainers = sinnerContainer.querySelectorAll('span.ego button span.ego-name');
    egoLevels.forEach((level, i) => {
      const selectedEgo = sinner.selected_egos.filter((e) => e.level === level);
      egoContainers[i].innerHTML = selectedEgo.length > 0 ? selectedEgo[0].name : '';
      egoContainers[i].title = selectedEgo.length > 0 ? selectedEgo[0].name : '';
    });
    sinnerContainer.querySelectorAll('.ego-level-container button.card').forEach((button) => {
      const isEgoSelected = sinner.selected_egos.filter((e) => e.name === button.innerHTML).length > 0;
      const selectedEgoNoLongerSelected = button.classList.contains('card--selected') && !isEgoSelected;
      const currentSelectedNotShownAsSelected = !button.classList.contains('card--selected') && isEgoSelected;
      if (selectedEgoNoLongerSelected) {
        button.classList.remove('card--selected');
      }
      if (currentSelectedNotShownAsSelected) {
        button.classList.add('card--selected');
      }
    });
  });
}

initialRender();
updateCalculatedElements();
