const uuidv5 = require('uuid/v5')

const MY_NAMESPACE = '6a153f4d-79e3-4372-a174-497b0bba818f'
console.log(uuidv5('Hello, World!', MY_NAMESPACE))