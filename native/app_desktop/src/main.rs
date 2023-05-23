#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    println!("Hello, app_desktop");
    tauri::Builder::default()
        //.manage(core_app)
        .run(tauri::generate_context!("./tauri.config.json"))
        .expect("error while running tauri application");
}

