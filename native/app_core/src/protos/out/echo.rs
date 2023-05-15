/// The request for an `Echo.Echo` call.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct EchoRequest {
    /// The data to be echoed back.
    /// bytes data = 1;
    #[prost(string, tag = "1")]
    pub ping: ::prost::alloc::string::String,
}
/// The response for an `Echo.Echo` call.
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct EchoResponse {
    /// The echoed back data from `EchoRequest.data`.
    /// bytes data = 1;
    #[prost(string, tag = "2")]
    pub pong: ::prost::alloc::string::String,
}
/// The Echo service. This service returns back the same data that it is given.
pub trait Echo {
    /// Echoes back the data sent, unmodified.
    fn do_echo(
        &self,
        request: EchoRequest,
    ) -> ::app_common::ServiceResponse<'_, EchoResponse>;
}
/// The Echo service. This service returns back the same data that it is given.
pub trait EchoAnother {
    /// Echoes back the data sent, unmodified.
    fn do_another_echo(
        &self,
        request: EchoRequest,
    ) -> ::app_common::ServiceResponse<'_, EchoResponse>;
}
