import { createStackDriverLogger } from './stackdriver'

export const logger = ({
    getSetting
}) => {
    createStackDriverLogger({ getSetting })
}