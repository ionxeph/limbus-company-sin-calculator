mod utils;
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Default)]
pub struct Team {
    sinners: Vec<Sinner>,
}

#[wasm_bindgen]
impl Team {
    pub fn new() -> Team {
        Team::default()
    }
    pub fn hello(&self) -> String {
        String::from("hello")
    }
}

#[derive(Debug, Default)]
pub struct Sinner {
    // TODO: add support for available_identities and available_egos
    name: String,
    all_identies: Vec<Identity>, // all ids in the game
    all_egos: Vec<Identity>,
    selected_identity: Identity,
    selected_egos: Vec<Ego>,
}

#[derive(Debug, Default)]
pub struct Identity {
    name: String,
    supported_sins: Sins,
}

#[derive(Debug, Default)]
pub struct Sins {
    wrath: u8,
    lust: u8,
    sloth: u8,
    gluttony: u8,
    gloom: u8,
    pride: u8,
    envy: u8,
}

#[derive(Debug, Default)]
pub struct Ego {
    sin_cost: Sins,
    level: EgoLevel,
}

#[derive(Debug, Default)]
pub enum EgoLevel {
    #[default]
    Zayin,
    Teth,
    He,
    Waw,
    Aleph,
}
