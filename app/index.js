import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as rawData from './data.json';

// TODO: work on light mode styling
let team = Team.load(JSON.stringify(rawData));
const egoLevels = ['Zayin', 'Teth', 'He', 'Waw', 'Aleph'];
const initialData = JSON.parse(team.as_json_string());

function createDialogWithBackdrop() {
  const dialog = document.createElement('dialog');
  dialog.classList.add('dialog');

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

    button.classList.add('identity-card');
    button.classList.toggle('identity-card--selected', id.name === selected.name);

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
  // TODO: more proper styling later
  dialogContent.classList.add('grid');
  dialogContent.classList.add('grid-cols-1');
  egoLevels.forEach((level) => {
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
  const sinsContainer = document.getElementById('sins-container');
  const supportedSins = JSON.parse(team.sum_supported_sins());
  const requiredSins = JSON.parse(team.sum_required_sins());
  const updatedData = JSON.parse(team.as_json_string());
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
          button.classList.contains('identity-card--selected') && button.innerHTML !== selectedIdName;
        const currentSelectedNotShownAsSelected =
          !button.classList.contains('identity-card--selected') && button.innerHTML === selectedIdName;
        if (selectedIdNoLongerSelected) {
          button.classList.remove('identity-card--selected');
        }
        if (currentSelectedNotShownAsSelected) {
          button.classList.add('identity-card--selected');
        }
      });

    // selected egos
    const egoContainers = sinnerContainer.querySelectorAll('span.ego button span.ego-name');
    egoLevels.forEach((level, i) => {
      const selectedEgo = sinner.selected_egos.filter((e) => e.level === level);
      egoContainers[i].innerHTML = selectedEgo.length > 0 ? selectedEgo[0].name : '';
      egoContainers[i].title = selectedEgo.length > 0 ? selectedEgo[0].name : '';
    });
  });
}

initialRender();
updateCalculatedElements();
