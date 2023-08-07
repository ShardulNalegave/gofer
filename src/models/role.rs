
// ===== Imports =====
use mongodb::Collection;
use bson::oid::ObjectId;
use futures::TryStreamExt;
// ===================

#[derive(Serialize, Deserialize, Debug)]
pub struct Role {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  id: Option<ObjectId>,
  title: String,
  rights: Vec<String>,
}

impl Role {
  pub async fn get_users(coll: &Collection<Role>, filter: impl Into<Option<bson::Document>>) -> Vec<Role> {
    coll.find(filter, None).await.expect("Couldn't get Users")
      .try_collect::<Vec<Role>>()
      .await.expect("Couldn't parse documents (users collection)")
  }
}