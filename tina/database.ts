import { createLocalDatabase } from '@tinacms/datalayer'

// Using local database for the demo — content is read from the filesystem.
// For production editing (write-back to GitHub), swap this for createDatabase()
// with GitHubProvider + an Upstash Redis adapter.
export default createLocalDatabase()
