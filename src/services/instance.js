import ky from 'ky'

const baseUrl = 'http://localhost:5002/api/'

export const instance = ky.extend({
    prefixUrl: baseUrl,
    timeout: 600000
})

