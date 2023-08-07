
// ===== Imports =====
use mongodb::Collection;
use bson::oid::ObjectId;
use futures::TryStreamExt;
// ===================

#[derive(Serialize, Deserialize, Debug)]
pub struct Project {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  id: Option<ObjectId>,
  title: String,
  description: String,
  tasks: Vec<ObjectId>,
}

impl Project {
  pub async fn get_users(coll: &Collection<Project>, filter: impl Into<Option<bson::Document>>) -> Vec<Project> {
    coll.find(filter, None).await.expect("Couldn't get Users")
      .try_collect::<Vec<Project>>()
      .await.expect("Couldn't parse documents (users collection)")
  }
}