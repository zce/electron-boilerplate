import os from 'os'
import config from './config'

export function getMachineAddresses () {
  let addresses = []
  const networkInterfaces = os.networkInterfaces()
  Object.keys(networkInterfaces).forEach(key => {
    const infos = networkInterfaces[key]
    if (!(infos && infos.length)) return
    addresses = addresses.concat(
      infos
        .filter(i => !i.internal && i.family === 'IPv4'/* && i.netmask === '255.255.255.0' */)
        .map(i => i.address)
    )
  })
  return addresses
}

export function getLocalAreaAddress () {
  return getMachineAddresses().find(a => a)
}

export function getStamp (count = config.stamp_length) {
  let stamp = ''
  // const chars = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //随机数
  const chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  for (let i = 0; i < count; i++) {
    stamp += chars[Math.floor(Math.random() * chars.length)]
  }
  return stamp.toUpperCase()
}

export function formatDate (source, format) {
  const o = {
    'M+': source.getMonth() + 1, // 月份
    'd+': source.getDate(), // 日
    'H+': source.getHours(), // 小时
    'm+': source.getMinutes(), // 分
    's+': source.getSeconds(), // 秒
    'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
    'f+': source.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return format
}
