export const createSubscriptions = ({
    subscribe,
    filterGcpMsgs
}) => new Promise((resolve, reject) => {

    subscribe({
        channel: 'logging'
    })
    .then(({ allMsgs, filterMsgs }) => {
        const redisSubscription = filterMsgs(msg => {
            console.log('redis msg', msg)
            if (msg && msg.data && JSON.parse(msg.data[1])) {
                const data = JSON.parse(msg.data[1])
                if (data && data.level && data.log) {
                    return true
                }
                return false
            }
            return false
        })

        return resolve({
            redisSubscription
        })
    })
})