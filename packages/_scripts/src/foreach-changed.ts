import childProcess from 'child_process'

type Workspace = {
  location: string
  name: string
  workspaceDependencies: string[]
}

// Parse arguments
let commit = 'HEAD'
if (process.argv.length >= 4 && process.argv[2] === '--branch') {
  commit = process.argv[3]
  process.argv.splice(2, 2)
}

// Get list of workspaces
const workspaces: Workspace[] = childProcess
  .execFileSync('yarn', ['workspaces', 'list', '--json', '--verbose'])
  .toString()
  .split('\n')
  .filter((s) => !!s)
  .map((s) => JSON.parse(s))

// Get list of changed dirs from git
const changedDirs = childProcess
  .execFileSync('git', ['diff', commit, '--name-only'])
  .toString()
  .split('\n')
  .filter((s) => !!s)

// Find workspaces with changed dirs
const changedWorkspaces = workspaces.filter(
  ({ location }) =>
    !!changedDirs.find((d) => d.startsWith(location)) ||
    (location === '.' &&
      // If the changedDir doesnt match any package then resolve true for root
      !!changedDirs.find(
        (d) => !workspaces.find(({ location }) => d.startsWith(location))
      ))
)

if (changedWorkspaces.length === 0) {
  console.log('No workspaces have changed')
  process.exit(0)
}

// Run for changed dependencies and workspaces dependent on them
function recursivelyGetDependents(location: string): string[] {
  return workspaces
    .filter(({ workspaceDependencies }) =>
      workspaceDependencies.includes(location)
    )
    .flatMap(({ location }) => [
      location,
      ...recursivelyGetDependents(location),
    ])
}

const workspacesLocationsToRun = changedWorkspaces
  .map((w) => w.location)
  .flatMap((l) => [l, ...recursivelyGetDependents(l)])

// Convert to workspace names and run
const workspacesToRun = Array.from(
  new Set(
    workspacesLocationsToRun.map(
      (location) => workspaces.find((w) => w.location === location)?.name || ''
    )
  )
)

// Run yarn workspaces command with included workspaces
const args = process.argv.slice(2)

console.log(
  `Running \`${args.join(' ')}\` in these workspaces:\n\t${workspacesToRun.join(
    '\n\t'
  )}`
)
childProcess.execFileSync(
  'yarn',
  [
    'workspaces',
    'foreach',
    '--verbose',
    ...workspacesToRun.map((w) => ['--include', w]).flat(),
    ...args,
  ],
  { stdio: 'inherit' }
)
