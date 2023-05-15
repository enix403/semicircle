// #![allow(dead_code)]
// #![allow(unused)]

use std::ffi::OsStr;
use std::fs;
use std::io::Result;
use std::io::Write as _;
use std::path::{Path, PathBuf};

use proc_macro2::TokenStream;

use prost_build::{Method, Service};

use quote::{format_ident, quote};

fn core_protos_path() -> PathBuf {
    let manifest_dir = env!("CARGO_MANIFEST_DIR");

    let protos_path = Path::new(manifest_dir)
        .join("..") // <project_root>
        .join("app_core")
        .join("src")
        .join("protos")
        .canonicalize()
        .unwrap();

    protos_path
}

fn file_list<P: AsRef<Path>>(dir: P, ext: &str) -> Result<Vec<PathBuf>> {
    let mut res = vec![];
    for path in fs::read_dir(dir)? {
        let path = path?.path();
        let fext = path.extension().and_then(OsStr::to_str);

        match fext {
            Some(fext) if fext == ext => {
                res.push(path);
            }
            _ => (),
        };
    }
    Ok(res)
}

fn gen_proto_mod(root: &Path) -> Result<()> {
    let mut file = fs::OpenOptions::new()
        .write(true)
        .create(true)
        .open(root.join("mod.rs"))?;

    for filepath in file_list(root.join("out"), "rs")? {
        let filename = filepath.file_name().and_then(OsStr::to_str).unwrap();
        let defname = filepath.file_stem().and_then(OsStr::to_str).unwrap();

        write!(file, "#[path = \"out/{}\"]\n", filename)?;
        write!(file, "pub mod {};\n\n", defname)?;
    }

    file.flush()?;

    Ok(())
}

#[derive(Default)]
pub struct SimpleServiceGenerator;

impl SimpleServiceGenerator {
    pub fn new() -> Self {
        Default::default()
    }

    fn method_sig_tokens(&self, method: &Method) -> TokenStream {
        let name = format_ident!("{}", method.name);
        let input_type = format_ident!("{}", method.input_type);
        let output_type = format_ident!("{}", method.output_type);
        quote! {
            fn #name(&self, request: #input_type) -> ::app_common::ServiceResponse<'_, #output_type>
        }
    }

    fn generate_main_trait(&self, service: &Service, buf: &mut String) {
        buf.push_str("\n");
        service.comments.append_with_indent(0, buf);
        buf.push_str(&format!(
            "pub trait {} {{",
            service.name
        ));
        for method in service.methods.iter() {
            buf.push('\n');
            method.comments.append_with_indent(1, buf);
            buf.push_str(&format!("    {};\n", self.method_sig_tokens(method)));
        }
        buf.push_str("}\n");

        // println!("{}", buf);
    }
}

impl prost_build::ServiceGenerator for SimpleServiceGenerator {
    fn generate(&mut self, service: prost_build::Service, buf: &mut String) {
        self.generate_main_trait(&service, buf);
    }
}

fn main() -> Result<()> {
    let protos_path = core_protos_path();
    let out_folder = protos_path.join("out");

    fs::remove_dir_all(&out_folder).unwrap();
    fs::create_dir(&out_folder).unwrap();

    prost_build::Config::new()
        .service_generator(Box::new(SimpleServiceGenerator::new()))
        .out_dir(out_folder)
        .compile_protos(&file_list(&protos_path, "proto")?, &[protos_path.as_path()])?;

    gen_proto_mod(protos_path.as_ref())?;

    Ok(())
}
