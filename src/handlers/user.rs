
// ===== Imports =====
use warp::{Rejection, Reply, reply};
use crate::{
  database::DatabaseSession,
  models::User,
};
// ===================

pub async fn get_users(db: DatabaseSession) -> Result<impl Reply, Rejection> {
  let users = User::get_users(&db.collection::<User>("users"), None).await;
  Ok(reply::json(&users))
}