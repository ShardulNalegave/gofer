
// ===== Imports =====
use mongodb::Client;
use mongodb::options::{ClientOptions};
use crate::{
  config::*,
};
// ===================

#[allow(dead_code)]
#[derive(Clone)]
pub struct DatabaseSession {
  client: Client,
  db: mongodb::Database,
}

impl DatabaseSession {
  pub async fn new() -> Self {
    let conf = get_config();
    let options = ClientOptions::parse(&conf.mongodb_uri)
      .await.expect("Couldn't parse MongoDB Connection string");
    let client = Client::with_options(options).expect("Could not connect to MongoDB");
    let db = client.database("gofer");

    Self { client, db }
  }

  pub fn collection<T>(&self, name: &str) -> mongodb::Collection<T> {
    self.db.collection::<T>(name)
  }
}
