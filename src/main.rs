
pub mod config;
pub mod database;
pub mod models;

// ===== Imports =====
#[macro_use] extern crate log;
#[macro_use] extern crate serde;
use crate::{
  config::*,
  database::{DatabaseSession},
};
// ===================

#[tokio::main]
async fn main() {
  pretty_env_logger::init();

  let conf = get_config();

  let db = DatabaseSession::new().await;
  info!("Initialised new Database session (MongoDB)");
}
