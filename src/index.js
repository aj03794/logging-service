import { q as queueCreator } from './queue'
import { redis } from './pubsub/redis'
import { getSetting } from './settings'
import { logger } from './logger'

const { publisherCreator, subscriberCreator } = redis({
	host: process.env[2] === 'dev' ? '127.0.0.1' : 'main.local'
})

Promise.all([
	publisherCreator(),
	subscriberCreator(),
    queueCreator(),
])
.then(([
	{ publish },
	{ subscribe },
	{ enqueue },
]) => {
	return logger({
		getSetting,
		subscribe,
		enqueue,
		publish
	})
})
