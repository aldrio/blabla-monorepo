{ pkgs ? import <nixpkgs> { }, nodejs ? pkgs.nodejs-slim-12_x }:

let
  # Specify runtime and build dependencies
  runtimeInputs = with pkgs; [ ];
  buildInputs = with pkgs; runtimeInputs ++ [ ];

  src = pkgs.lib.cleanSource ../..;
  project = pkgs.callPackage ../../yarn-project.nix { inherit nodejs; } src;

in project.overrideAttrs (oldAttrs: {

  name = "blabla-api";

  # Build
  buildInputs = with pkgs;
    [ makeWrapper ] ++ (oldAttrs.buildInputs or [ ]) ++ buildInputs;
  buildPhase = ''
    runHook preBuild

    # Install yarn dependencies
    yarn workspaces focus @blabla/api

    # Build
    cd packages/api
    yarn workspaces foreach -vRpt run build

    # Create minimal yarn package in `out` dir
    yarn prod-install --pack out
    rm out/.yarn/sdks -r

    runHook postBuild
  '';

  # Install
  installPhase = with pkgs; ''
    runHook preInstall

    mkdir -p "$out"/libexec "$out"/bin

    # Copy minimal yarn package from `yarn prod-install`
    mv "$PWD"/out "$out/libexec/$sourceRoot"

    cd "$out/libexec/$sourceRoot" || exit

    # Update the path to Yarn.
    export NIX_YARN_PATH="$(readlink -f '.yarn/releases/yarn-berry.cjs')"

    # Create executable to wrap yarn with runtime environment as an entrypoint
    makeWrapper "$out/libexec/$sourceRoot/.yarn/releases/yarn-berry.cjs" "$out/bin/api" \
      --run "cd $out/libexec/$sourceRoot" \
      --prefix : PATH ${lib.makeBinPath runtimeInputs}

    runHook postInstall
  '';
})
