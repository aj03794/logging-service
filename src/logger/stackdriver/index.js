export const createStackDriverLogger = ({
    logging
}) => ({
    level,
    log
}) => () => new Promise((resolve, reject) => {

    console.log(log)

    // TODO remove this hardcoding
    const logName = 'smart-home-monitoring-system'
    const gcpLog = logging.log(logName)
    // TODO find out what about resources in GCP docs
    const metadata = { resource: { type: 'global' } }
    const entry = gcpLog.entry(metadata, JSON.stringify(log) )  

    gcpLog[level](entry)
        .then(() => console.log('Successfully posted log'))
        .catch(err => {
            console.error('ERROR:', err)
        })

    resolve()
    
}) 