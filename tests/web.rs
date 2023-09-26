//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::{assert, assert_eq};

use wasm_bindgen_test::*;

extern crate limbus_company_team_builder;
use limbus_company_team_builder::*;

// wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn should_sum_up_sins_supported() {
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
            "selected_egos": [],
            "in_team": false
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
            "selected_egos": [],
            "in_team": false
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
            "selected_egos": [],
            "in_team": false
          },
          {
            "name": "Ryōshū",
            "all_identies": [],
            "all_egos": [],
            "selected_identity": {
              "name": "LCB Sinner",
              "supported_sins": {
                "envy": 2,
                "gloom": 0,
                "gluttony": 3,
                "lust": 0,
                "pride": 1,
                "sloth": 0,
                "wrath": 0
              }
            },
            "selected_egos": [],
            "in_team": false
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
            "selected_egos": [],
            "in_team": false
          }
        ]
      }
      
    "#;
    let team = Team::load(data.to_owned());
    let actual = &team.sum_supported_sins();
    let expected = r#"
        {
            "envy": 4,
            "lust": 5,
            "gloom": 4,
            "pride": 6,
            "gluttony": 5,
            "sloth": 6,
            "wrath": 0
        }
    "#;
    assert_eq!(actual, expected);
}
