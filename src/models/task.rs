
// ===== Imports =====
use mongodb::Collection;
use bson::oid::ObjectId;
use futures::TryStreamExt;
// ===================

#[derive(Serialize, Deserialize, Debug)]
pub struct Task {
  #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
  id: Option<ObjectId>,
  title: String,
  description: String,
  project: ObjectId,
}

impl Task {
  pub async fn get_users(coll: &Collection<Task>, filter: impl Into<Option<bson::Document>>) -> Vec<Task> {
    coll.find(filter, None).await.expect("Couldn't get Users")
      .try_collect::<Vec<Task>>()
      .await.expect("Couldn't parse documents (users collection)")
  }
}