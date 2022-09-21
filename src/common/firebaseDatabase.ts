import { getDatabase } from 'firebase/database';

import app from './firebaseApp';

const database = getDatabase(app);

export default database;
