mod utils;
extern crate serde;
extern crate wasm_bindgen;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Team {
    sinners: Vec<Sinner>,
}

#[wasm_bindgen]
impl Team {
    pub fn new() -> Team {
        Team::default()
    }

    pub fn load(json: String) -> Team {
        serde_json::from_str(&json).unwrap_or_else(|_| Team::new())
    }

    pub fn as_json_string(&self) -> String {
        serde_json::to_string(self).unwrap_or_else(|_| String::from("{}"))
    }

    pub fn sum_supported_sins(&self) -> String {
        String::new()
    }
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Sinner {
    // TODO: add support for available_identities and available_egos
    pub name: SinnerName,
    pub all_identies: Vec<Identity>, // all ids in the game
    pub all_egos: Vec<Identity>,
    pub selected_identity: Identity,
    pub selected_egos: Vec<Ego>,
    pub in_team: bool,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Identity {
    pub name: String,
    pub supported_sins: Sins,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Sins {
    pub wrath: u8,
    pub lust: u8,
    pub sloth: u8,
    pub gluttony: u8,
    pub gloom: u8,
    pub pride: u8,
    pub envy: u8,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Ego {
    pub sin_cost: Sins,
    pub level: EgoLevel,
}

#[derive(Debug, Default, Serialize, Deserialize)]
#[serde(untagged)]
pub enum EgoLevel {
    #[default]
    Zayin,
    Teth,
    He,
    Waw,
    Aleph,
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub enum SinnerName {
    #[default]
    #[serde(rename = "Yi Sang")]
    YiSang,
    Faust,
    #[serde(rename = "Don Quixote")]
    DonQuixote,
    Ryōshū,
    Meursault,
    #[serde(rename = "Hong Lu")]
    HongLu,
    Heathcliff,
    Ishmael,
    Rodion,
    Sinclair,
    Outis,
    Gregor,
}
