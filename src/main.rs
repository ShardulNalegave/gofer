
pub mod config;
pub mod database;
pub mod models;
pub mod handlers;

// ===== Imports =====
#[macro_use] extern crate log;
#[macro_use] extern crate serde;
use warp::Filter;
use crate::{
  config::*,
  database::{DatabaseSession, filter_with_db},
};
// ===================

#[tokio::main]
async fn main() {
  pretty_env_logger::init();

  let conf = get_config();

  let db = DatabaseSession::new().await;
  info!("Initialised new Database session (MongoDB)");

  let user_routes = warp::path("users")
    .and(warp::get())
    .and(filter_with_db(db.clone()))
    .and_then(handlers::user::get_users);

  info!("Listening at {}:{}", conf.host.map(|x| x.to_string()).join("."), conf.port);
  warp::serve(user_routes).run((conf.host, conf.port)).await;
}
