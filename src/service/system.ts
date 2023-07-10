import { get } from '@/utils/request'

export const getLog = (params: any) => {
  return get('/log/getLog', { params })
    .then((res) => res)
    .catch((err) => {
      console.error(err)
    })
}

export const getSystemInfo = (params: any) => {
  return get('/system/getSystemInfo', { params })
    .then((res) => res)
    .catch((err) => {
      console.error(err)
    })
}
