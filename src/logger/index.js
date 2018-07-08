import Logging from '@google-cloud/logging'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'

import { createSubscriptions } from './subscriptions'

import { createStackDriverLogger } from './stackdriver'

export const logger = ({
    getSetting,
    subscribe,
    enqueue
}) => {

    const gcpCreds = getSetting('googleApplicationCredentials')
    const keyFilename = resolvePath(homedir(), 'gcp-creds', gcpCreds)

    const logging = new Logging({
            keyFilename
    })

    const stackDriverLogger = createStackDriverLogger({ logging })

    createSubscriptions({
        subscribe
    })
    .then(({
        redisSubscription
    }) => {
        redisSubscription.subscribe(msg => {
            const { level, log } = JSON.parse(msg.data[1])
            enqueue(stackDriverLogger({ level, log }))
        })
    })

}