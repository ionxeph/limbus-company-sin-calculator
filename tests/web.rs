//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::{assert, assert_eq};

use wasm_bindgen_test::*;

extern crate limbus_company_team_builder;
use limbus_company_team_builder::*;

// wasm_bindgen_test_configure!(run_in_browser);

#[cfg(test)]
fn set_up_test_team() -> Team {
    let data = r#"
    {
      "sinners": [
        {
          "name": "Yi Sang",
          "all_identies": [],
          "all_egos": [],
          "selected_identity": {
            "name": "LCB Sinner",
            "supported_sins": {
              "envy": 2,
              "gloom": 3,
              "gluttony": 0,
              "lust": 0,
              "pride": 0,
              "sloth": 1,
              "wrath": 0
            }
          },
          "selected_egos": [
            {
              "name": "Crow’s Eye View",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 0,
                "lust": 0,
                "pride": 0,
                "sloth": 3,
                "wrath": 1
              },
              "level": "Zayin"
            }
          ],
          "in_team": true
        },
        {
          "name": "Faust",
          "all_identies": [],
          "all_egos": [],
          "selected_identity": {
            "name": "LCB Sinner",
            "supported_sins": {
              "envy": 0,
              "gloom": 0,
              "gluttony": 1,
              "lust": 0,
              "pride": 3,
              "sloth": 2,
              "wrath": 0
            }
          },
          "selected_egos": [
            {
              "name": "Representation Emitter",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 2,
                "lust": 0,
                "pride": 4,
                "sloth": 0,
                "wrath": 0
              },
              "level": "Zayin"
            }
          ],
          "in_team": true
        },
        {
          "name": "Don Quixote",
          "all_identies": [],
          "all_egos": [],
          "selected_identity": {
            "name": "LCB Sinner",
            "supported_sins": {
              "envy": 2,
              "gloom": 0,
              "gluttony": 1,
              "lust": 3,
              "pride": 0,
              "sloth": 0,
              "wrath": 0
            }
          },
          "selected_egos": [
            {
              "name": "La Sangre de Sancho",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 0,
                "lust": 2,
                "pride": 2,
                "sloth": 0,
                "wrath": 0
              },
              "level": "Zayin"
            }
          ],
          "in_team": true
        },
        {
          "name": "Ryōshū",
          "all_identies": [],
          "all_egos": [],
          "selected_identity": {
            "name": "LCB Sinner",
            "supported_sins": {
              "envy": 0,
              "gloom": 0,
              "gluttony": 3,
              "lust": 2,
              "pride": 1,
              "sloth": 0,
              "wrath": 0
            }
          },
          "selected_egos": [
            {
              "name": "Forest for the Flames",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 0,
                "lust": 2,
                "pride": 0,
                "sloth": 0,
                "wrath": 2
              },
              "level": "Zayin"
            }
          ],
          "in_team": true
        },
        {
          "name": "Meursault",
          "all_identies": [],
          "all_egos": [],
          "selected_identity": {
            "name": "LCB Sinner",
            "supported_sins": {
              "envy": 0,
              "gloom": 1,
              "gluttony": 0,
              "lust": 0,
              "pride": 2,
              "sloth": 3,
              "wrath": 0
            }
          },
          "selected_egos": [
            {
              "name": "Chains of Others",
              "sin_cost": {
                "envy": 2,
                "gloom": 1,
                "gluttony": 0,
                "lust": 0,
                "pride": 0,
                "sloth": 1,
                "wrath": 0
              },
              "level": "Zayin"
            }
          ],
          "in_team": true
        }
      ]
    }
    
  "#;
    Team::load(data.to_owned())
}

#[wasm_bindgen_test]
fn should_sum_up_sins_supported() {
    let team = set_up_test_team();
    let actual = &team.sum_supported_sins();
    let expected =
        "{\"wrath\":0,\"lust\":5,\"sloth\":6,\"gluttony\":5,\"gloom\":4,\"pride\":6,\"envy\":4}";
    assert_eq!(actual, expected);
}

#[wasm_bindgen_test]
fn should_sum_up_sins_required() {
    let team = set_up_test_team();
    let actual = &team.sum_required_sins();
    let expected =
        "{\"wrath\":3,\"lust\":4,\"sloth\":4,\"gluttony\":2,\"gloom\":1,\"pride\":6,\"envy\":2}";
    assert_eq!(actual, expected);
}
