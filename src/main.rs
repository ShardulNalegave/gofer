
pub mod config;
pub mod database;

// ===== Imports =====
#[macro_use] extern crate log;
#[macro_use] extern crate serde;
use warp::Filter;
use crate::{
  config::*,
  database::DatabaseSession,
};
// ===================

#[tokio::main]
async fn main() {
  pretty_env_logger::init();

  let conf = get_config();

  let db = DatabaseSession::new().await;
  info!("Initialised new Database session (MongoDB)");

  for user in db.get_users().await {
    println!("{:?}", user);
  }

  let routes = warp::any().map(|| "Hello, World!");

  info!("Listening at {}:{}", conf.host.map(|x| x.to_string()).join("."), conf.port);
  warp::serve(routes).run((conf.host, conf.port)).await;
}
