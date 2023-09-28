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
  ].innerHTML = `${sinner.name}</br>${sinner.selected_identity.name}`;
});

const sinsContainer = document.getElementById('sins-container');
let supportedSins = JSON.parse(team.sum_supported_sins());
let requiredSins = JSON.parse(team.sum_required_sins());
for (let sin in supportedSins) {
  sinsContainer.querySelector(`span.${sin}-sin-counter`).innerHTML = `${requiredSins[sin]}/${supportedSins[sin]}`;
}