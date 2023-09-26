import { Team } from 'limbus-company-team-builder';

let team;

await fetch('starter-data.json')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    team = Team.load(JSON.stringify(data));
  });

  console.log(JSON.parse(team.as_json_string()));