use std::io;

use std::fmt::Display;

pub type Result<T> = core::result::Result<T, self::Error>;

#[derive(Debug)]
pub enum Error {
    Generic(String),

    // Surreal(surrealdb::Error),

    JsonSerde(serde_json::Error),

    IO(io::Error)
}

/*
impl From<surrealdb::Error> for self::Error {
    fn from(value: surrealdb::Error) -> Self {
        Self::Surreal(value)
    }
}

impl From<surrealdb::error::Db> for self::Error {
    fn from(value: surrealdb::error::Db) -> Self {
        Self::Surreal(value.into())
    }
}
*/

impl From<serde_json::Error> for self::Error {
    fn from(value: serde_json::Error) -> Self {
        Self::JsonSerde(value)
    }
}

impl From<io::Error> for self::Error {
    fn from(value: io::Error) -> Self {
        Self::IO(value)
    }
}

impl Display for self::Error {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "app_core::Error: {:?}", self)
    }
}

impl std::error::Error for self::Error {}