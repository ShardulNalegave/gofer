
// ===== Imports =====
// ===================

#[derive(Serialize, Deserialize, Debug)]
pub struct Config {
  pub port: u16,
  pub host: [u8; 4],
  pub mongodb_uri: String,
  pub mongodb_database: String,
}

impl Default for Config {
  fn default() -> Self {
    Self {
      port: 8080,
      host: [0, 0, 0, 0],
      mongodb_database: "gofer".to_string(),
      mongodb_uri: "mongodb://127.0.0.1:27017/".to_string(),
    }
  }
}

pub fn get_config() -> Config {
  confy::load("gofer", "config").expect("Couldn't read config file")
}

pub fn store_config(conf: Config) {
  confy::store("gofer", "config", conf).expect("Couldn't update config file");
}