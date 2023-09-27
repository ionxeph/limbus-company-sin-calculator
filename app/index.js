import './styles.css';
import { Team } from 'limbus-company-team-builder';
import * as starterData from './starter-data.json';

let team = Team.load(JSON.stringify(starterData));

let teamData = JSON.parse(team.as_json_string());
console.log(teamData);

const sinnerElements = document
  .getElementById('sinner-container')
  .querySelectorAll('div.sinner-element');
teamData.sinners.forEach((sinner, i) => {
  sinnerElements[
    i
  ].innerHTML = `${sinner.name}: ${sinner.selected_identity.name}`;
});

const supportedSinContainer = document.getElementById(
  'supported-sins-container'
);
let supportedSins = JSON.parse(team.sum_supported_sins());
console.log(supportedSins);

for (let sin in supportedSins) {
  supportedSinContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = supportedSins[sin];
}
