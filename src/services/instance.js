import ky from 'ky'

export const instance = ky.extend({
    prefixUrl: 'http://localhost:5000/api/',
    timeout: 600000
})

