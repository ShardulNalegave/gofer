
pub mod config;
pub mod database;

// ===== Imports =====
#[macro_use] extern crate serde;
#[macro_use] extern crate lazy_static;
use crate::{
  database::DatabaseSession,
};
// ===================

#[tokio::main]
async fn main() {
  let db = DatabaseSession::new().await;
  for user in db.get_users().await {
    println!("{:?}", user);
  }
}
