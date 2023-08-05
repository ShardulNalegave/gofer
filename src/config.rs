
// ===== Imports =====
use std::env::var;
use std::sync::Mutex;
// ===================

lazy_static! {
  pub static ref GOFER_CONFIG_DIRECTORY: String = var("GOFER_CONFIG_DIR")
    .expect("Couldn't get Gofer Config directory (env variable: GOFER_CONFIG_DIR)");

  pub static ref GOFER_CONFIG: Mutex<Config> = Mutex::new(Config::load());
}

#[derive(Serialize, Deserialize)]
pub struct Config {
  pub port: u16,
  pub host: String,
  pub mongodb_uri: String,
  pub mongodb_database: String,
}

impl Config {
  pub fn load() -> Self {
    let config_file_path = (*GOFER_CONFIG_DIRECTORY).clone() + "config.json";
    let config_str = std::fs::read_to_string(config_file_path).expect("Couldn't read Gofer config file");

    serde_json::from_str(&config_str)
      .expect("Couldn't parse Gofer config file")
  }
}