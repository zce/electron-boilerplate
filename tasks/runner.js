const exec = require('child_process').exec

const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const END = '\x1b[0m'

let isElectronOpen = false

const format = (command, data, color) => `${color}${command}${END} ${data.toString().trim().replace(/\n/g, '\n' + repeat(' ', command.length + 2))}\n`

const repeat = (str, times) => new Array(times + 1).join(str)

const children = []

function run (command, color, name) {
  let child = exec(command)

  child.stdout.on('data', data => {
    console.log(format(name, data, color))

    /**
     * Start electron after VALID build
     * (prevents electron from opening a blank window that requires refreshing)
     *
     * NOTE: needs more testing for stability
     */
    if (/VALID/g.test(data.toString().trim().replace(/\n/g, '\n' + repeat(' ', command.length + 2))) && !isElectronOpen) {
      console.log(`${BLUE}Starting electron...\n${END}`)
      run('npm run boot', BLUE, 'electron')
      isElectronOpen = true
    }
  })

  child.stderr.on('data', data => console.error(format(name, data, color)))
  child.on('exit', code => exit(code))

  children.push(child)
}

function exit (code) {
  children.forEach(child => child.kill())
  process.exit(code)
}

console.log(`${YELLOW}Starting webpack-dev-server...\n${END}`)
run(`npm run watch`, YELLOW, 'webpack')
