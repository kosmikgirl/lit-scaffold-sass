import ConfigManager from 'seng-config';
import {config, environment} from './config';

const configManager = new ConfigManager();

configManager.init(config, environment);

export {configManager};
