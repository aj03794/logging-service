import { q as queueCreator } from './queue'
import { redis } from './pubsub/redis'
import { slack as slackCreator } from './slack'
import { getSetting } from './settings'
import { logger } from './logger'

const { publisherCreator, subscriberCreator } = redis({
	host: process.env[2] === 'dev' ? '127.0.0.1' : 'main.local'
})

Promise.all([
	// publisherCreator(),
	// subscriberCreator(),
    // queueCreator(),
    // loggerCreator({ getSetting })
])
.then(([
	// { publish },
	// { subscribe },
	// { enqueue },
]) => {
	// const slack = slackCreator({ publish })
	return logger({
		getSetting
	})
})
