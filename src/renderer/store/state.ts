import { settings } from 'common/store'
import { State } from './types'

const state: State = {
  settings: settings.store,
  titlebar: {},
  activitybar: {},
  sidebar: {}
}

export default state
