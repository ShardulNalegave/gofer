
// ===== Imports =====
use bson::oid::ObjectId;
use bson::doc;
use mongodb::Client;
use mongodb::options::{ClientOptions};
use futures::TryStreamExt;
use crate::{
  config::*,
};
// ===================

#[allow(dead_code)]
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

  pub async fn get_users(&self) -> Vec<UserModel> {
    let users_cursor = self.db.collection::<UserModel>("users")
      .find(None, None)
      .await.expect("Couldn't fetch users");
    let users = users_cursor.try_collect::<Vec<UserModel>>()
      .await.expect("Couldn't parse documents");

    users
  }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct UserModel {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  id: Option<ObjectId>,
  name: String,
  email: String,
  roles: Vec<String>,
}