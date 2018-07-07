import Logging from '@google-cloud/logging'
import { resolve as resolvePath } from 'path'
import { homedir } from 'os'

export const createStackDriverLogger = ({
    getSetting
}) => new Promise((resolve, reject) => {

    const gcpCreds = getSetting('googleApplicationCredentials')
    const keyFilename = resolvePath(homedir(), 'gcp-creds', gcpCreds)

    console.log('keyFilename', keyFilename)
    const logging = new Logging({
            keyFilename
    })

    const logName = 'smart-home-monitoring-system'

    // Selects the log to write to
    const log = logging.log(logName);

    // The data to write to the log
    const text = 'Hello, world!';
    // The metadata associated with the entry
    const metadata = {resource: {type: 'global'}};
    // Prepares a log entry
    const entry = log.entry(metadata, text)

    // Writes the log entry
    log
        .write(entry)
        .then(() => {
            console.log(`Logged: ${text}`)
        })
        .catch(err => {
            console.error('ERROR:', err)
        })
    
}) 