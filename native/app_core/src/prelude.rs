/// Should contain the minimal stuff required by most modules

pub use crate::error::Result;

// Wrapper type for new-type pattern
pub struct W<T>(pub T);

// Alias for std::format! macro
pub use std::format as f;