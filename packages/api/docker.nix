{ pkgs ? import <nixpkgs> { }, nodejs ? pkgs.nodejs-slim-12_x }:

let
  blabla-api = import ./default.nix {
    inherit pkgs;
    inherit nodejs;
  };

in pkgs.dockerTools.buildImage {
  name = "blabla/api";
  tag = "latest";

  contents = [ nodejs blabla-api ];
  runAsRoot = "mkdir -m 0777 /tmp";
  config = {
    Entrypoint = [ "/bin/api" ];
    WorkingDir = "/libexec/source";
    Cmd = [ "run" "start" ];
  };
}
