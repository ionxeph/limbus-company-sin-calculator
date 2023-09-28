//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::assert_eq;

use wasm_bindgen_test::*;

extern crate limbus_company_team_builder;
use limbus_company_team_builder::*;

#[cfg(test)]
fn set_up_test_team() -> Team {
    let data = r#"
    {
      "sinners": [
        {
          "name": "Yi Sang",
          "all_identities": [
            {
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
            {
              "name": "Seven Association South Section 6",
              "supported_sins": {
                "envy": 0,
                "gloom": 3,
                "gluttony": 2,
                "lust": 0,
                "pride": 0,
                "sloth": 1,
                "wrath": 0
              }
            },
            {
              "name": "Blade Lineage Salsu",
              "supported_sins": {
                "envy": 1,
                "gloom": 0,
                "gluttony": 0,
                "lust": 0,
                "pride": 3,
                "sloth": 0,
                "wrath": 2
              }
            },
            {
              "name": "Effloresced E.G.O::Spicebush",
              "supported_sins": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 3,
                "lust": 0,
                "pride": 1,
                "sloth": 2,
                "wrath": 0
              }
            },
            {
              "name": "Molar Office Fixer",
              "supported_sins": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 0,
                "lust": 3,
                "pride": 0,
                "sloth": 2,
                "wrath": 1
              }
            }
          ],
          "all_egos": [
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
            },
            {
              "name": "4th Match Flame",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 1,
                "lust": 0,
                "pride": 0,
                "sloth": 1,
                "wrath": 5
              },
              "level": "Teth"
            },
            {
              "name": "Wishing Cairn",
              "sin_cost": {
                "envy": 0,
                "gloom": 1,
                "gluttony": 0,
                "lust": 0,
                "pride": 0,
                "sloth": 4,
                "wrath": 0
              },
              "level": "Teth"
            },
            {
              "name": "Dimension Shredder",
              "sin_cost": {
                "envy": 0,
                "gloom": 0,
                "gluttony": 3,
                "lust": 0,
                "pride": 0,
                "sloth": 3,
                "wrath": 0
              },
              "level": "He"
            },
            {
              "name": "Sunshower",
              "sin_cost": {
                "envy": 0,
                "gloom": 2,
                "gluttony": 2,
                "lust": 0,
                "pride": 2,
                "sloth": 4,
                "wrath": 0
              },
              "level": "He"
            }
          ],
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
          "all_identities": [],
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
          "all_identities": [],
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
          "all_identities": [],
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
          "all_identities": [],
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

#[wasm_bindgen_test]
fn should_toggle_sinner_selection() {
    let mut team = set_up_test_team();
    team.toggle_sinner_selection(String::from("Yi Sang"));
    assert!(team.as_json_string().find("\"in_team\":false").is_some());
    team.toggle_sinner_selection(String::from("Yi Sang"));
    assert!(team.as_json_string().find("\"in_team\":false").is_none());
}

#[wasm_bindgen_test]
fn should_change_selected_id() {
    let mut team = set_up_test_team();
    team.change_selected_id(
        String::from("Yi Sang"),
        String::from("Seven Association South Section 6"),
    );
    assert!(team
        .as_json_string()
        .find("\"selected_identity\":{\"name\":\"Seven Association South Section 6\"")
        .is_some());
}

#[wasm_bindgen_test]
fn should_change_selected_egos() {
    let mut team = set_up_test_team();
    // if selecting an EGO already selected, remove it
    team.toggle_ego(String::from("Yi Sang"), String::from("Crow’s Eye View"));
    assert!(team
        .as_json_string()
        .find(r#""selected_egos":[{"name": "Crow’s Eye View""#)
        .is_none());

    // if selecting an EGO whose level isn't filled, add it to selected_egos
    team.toggle_ego(String::from("Yi Sang"), String::from("4th Match Flame"));
    assert!(team
        .as_json_string()
        .find(r#""selected_egos":[{"name": "4th Match Flame""#)
        .is_some());

    // if selecting an EGO whose level is filled, swap it in selected_egos
    team.toggle_ego(String::from("Yi Sang"), String::from("Wishing Cairn"));
    assert!(team
        .as_json_string()
        .find(r#""selected_egos":[{"name": "Wishing Cairn""#)
        .is_some());
}
