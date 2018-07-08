export const createStackDriverLogger = ({
    logging
}) => ({
    level,
    log
}) => () => new Promise((resolve, reject) => {

    console.log(log)

    const logName = 'smart-home-monitoring-system'
    const gcpLog = logging.log(logName)
    const metadata = { resource: { type: 'global' } }
    const entry = gcpLog.entry(metadata, JSON.stringify(log) )  

    gcpLog['error'](entry)
        .then(() => console.log('Successfully posted log'))
        .catch(err => {
            console.error('ERROR:', err)
        })

    resolve()
    
}) 