{ pkgs ? import <nixpkgs> { }, nodejs ? pkgs.nodejs-12_x }:
let
  ## Import subprojects
  api = import ./packages/api/default.nix {
    inherit pkgs;
    inherit nodejs;
  };
in pkgs.mkShell {
  # Workspace dependencies
  buildInputs = with pkgs; [ git nodejs yarn nixfmt ];

  # Subproject dependencies
  inputsFrom = [
    # List subprojects
    api
  ];
}
