
{pkgs}: {

  channel = "stable-24.11"; # or "unstable"

  packages = [
    pkgs.nodejs_20
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = {};
 
  services.firebase.emulators = {
  
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };
  idx = {
  
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
