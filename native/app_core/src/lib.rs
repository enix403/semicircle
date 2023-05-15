#![allow(unused_imports)]
#![allow(dead_code)]

mod error;
mod prelude;

pub mod protos;

use prost::Message;

use crate::prelude::*;
use protos::echo::*;

fn unwrap_or_exit<T>(result: Result<T>) -> T {
    match result {
        Ok(value) => value,
        Err(error) => {
            let error_string = format!("{:?}", error);

            eprintln!(
                "{}: {}",
                "error",
                error_string.trim_start_matches("error: ")
            );
            std::process::exit(1);
        }
    }
}

pub struct SemiCircle;

impl SemiCircle {
    pub fn new() -> Self {
        Self
    }

    pub fn init(&mut self) {

    }
}

impl Drop for SemiCircle {
    fn drop(&mut self) {}
}

pub mod commands {
    use super::*;

    pub struct EchoService;

    impl protos::echo::Echo for EchoService {
        fn do_echo(&self, request: EchoRequest) -> app_common::ServiceResponse<'_, EchoResponse> {
            Box::pin(async move {
                EchoResponse {
                    pong: request.ping.clone(),
                }
            })
        }
    }
}
