extern crate serde;
extern crate wasm_bindgen;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

extern crate web_sys;
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}

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
        let mut summed = Sins::default();
        for sinner in self.sinners.iter().filter(|sinner| sinner.in_team) {
            summed = summed.sum_sins(sinner.get_supported_sins());
        }
        serde_json::to_string(&summed).unwrap_or_else(|_| String::from("{}"))
    }

    pub fn sum_required_sins(&self) -> String {
        let mut summed = Sins::default();
        for sinner in self.sinners.iter().filter(|sinner| sinner.in_team) {
            summed = summed.sum_sins(&sinner.get_required_sins());
        }
        serde_json::to_string(&summed).unwrap_or_else(|_| String::from("{}"))
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

impl Sinner {
    fn get_supported_sins(&self) -> &Sins {
        &self.selected_identity.supported_sins
    }

    fn get_required_sins(&self) -> Sins {
        let mut summed = Sins::default();
        for ego in self.selected_egos.iter() {
            summed = summed.sum_sins(&ego.sin_cost);
        }
        summed
    }
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

impl Sins {
    fn to_arr(&self) -> [u8; 7] {
        // always in alphabetic order
        [
            self.envy,
            self.gloom,
            self.gluttony,
            self.lust,
            self.pride,
            self.sloth,
            self.wrath,
        ]
    }

    fn sum_sins(&self, other: &Sins) -> Sins {
        let self_sins = self.to_arr();
        let other_sins = other.to_arr();
        let summed = self_sins
            .iter()
            .enumerate()
            .map(|(i, &x)| x + other_sins[i])
            .collect::<Vec<u8>>();
        Sins {
            envy: summed[0],
            gloom: summed[1],
            gluttony: summed[2],
            lust: summed[3],
            pride: summed[4],
            sloth: summed[5],
            wrath: summed[6],
        }
    }
}

#[derive(Debug, Default, Serialize, Deserialize)]
pub struct Ego {
    pub name: String,
    pub sin_cost: Sins,
    pub level: EgoLevel,
}

#[derive(Debug, Default, Serialize, Deserialize)]
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
