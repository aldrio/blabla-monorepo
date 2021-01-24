const inShell = (cmd) => `nix-shell --pure --run "${cmd}"`
const all = (args) => args.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': inShell(all(['echo Running pre-commit'])),
    'post-checkout': inShell(all(['echo Running post-checkout'])),
  },
}
