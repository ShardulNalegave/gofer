
// ===== Imports =====
use bson::oid::ObjectId;
use mongodb::Collection;
use futures::TryStreamExt;
// ===================

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct User {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  id: Option<ObjectId>,
  name: String,
  email: String,
  roles: Vec<String>,
}

impl User {
  pub async fn get_users(coll: &Collection<User>, filter: impl Into<Option<bson::Document>>) -> Vec<User> {
    coll.find(filter, None).await.expect("Couldn't get Users")
      .try_collect::<Vec<User>>()
      .await.expect("Couldn't parse documents (users collection)")
  }
}