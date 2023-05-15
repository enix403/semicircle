use std::{future::Future, pin::Pin};

pub type ServiceResponse<'a, O> = Pin<Box<dyn Future<Output = O> + 'a>>;
