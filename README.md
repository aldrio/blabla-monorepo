> # Blabla Monorepo
>
> This is an example monorepo for the "Blabla" organization using Yarn v2 workspaces and Nix.
>
> ## Requirements
>
> - Manage dev environment with nix for easy native dependencies
>
>   We can develop on our host systems and deploy using the same reproducible set of dependencies. This minimizes surprises while maximizing ease of use
>
> - Support multiple apps and multiple libraries
> - Linting, formatting rules, tests
> - Easy to use CI/CD integration
> - Easy to package applications to Docker with Nix

# Blabla

![Tests](https://github.com/aldrio/blabla-monorepo/workflows/Tests/badge.svg)

## Dependencies

To start developing in this repository you need only two things installed

- [Docker](https://www.docker.com/)

  Docker is used for

  - Building releases

  - Simulating infrastructure

    External services can be simulated and managed by docker-compose while developing.

- [Nix](https://nixos.org/)

  Nix is a package manager itself so any further dependencies are managed through nix automatically. You should familiarize a bit with nix yourself but the highlights as they relate to this project are:

  - Contained

    Dependencies managed through nix won't contaminate the rest of your system. You can also garbage collect or completely remove dependencies easily.

  - Reproducable

    This is good for keeping the development and production environments as similar as possible.

### Helpful extras

- [direnv](https://direnv.net/)

  direnv isn't necessary but this repo has a `.envrc` file that is used by direnv to enter the nix shell automatically (and the option of adding further local modifications to `.envrc.local`).

## Developing

> ### Note on yarn v2
>
> This monorepo uses yarn v2 which isn't natively supported by most IDE's yet. Check out https://yarnpkg.com/getting-started/editor-sdks to see what you need to do. (For example running `yarn pnpify --sdk vscode` if you use vscode)

1. Enter the development environment by running

   ```console
   $ nix-shell
   ```

   > [Use direnv](#helpful-extras) to have this command run automatically every time you're working in this directory

1. Install yarn dependencies and bootstrap the local packages

   ```console
   $ # Install dependencies
   $ yarn install

   $ # Bootstrap the local packages by doing an initial build of everything
   $ yarn all:build
   ```

1. Start the dev processes

   ```console
   $ # Runs "yarn run dev" in every workspace
   $ yarn all:dev
   ```

   The convention in this project is to define a development script named "`dev`" that watches the source, recompiles, and restarts processes. `yarn all:dev` runs the `dev` script in every workspace that has one defined.

## Testing

```console
$ yarn all:test
$ # Individual workspace:
$ yarn workspace @blabla/api run test
```

## Building

```console
$ yarn all:test
$ # Individual workspace:
$ yarn workspace @blabla/api run test
```
