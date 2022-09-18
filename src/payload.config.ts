import { buildConfig } from 'payload/config';
import s3Upload from 'modified-payload-s3-upload';
import path from 'path';
import Posts from './collections/Posts';
import Users from './collections/Users';
import Media from './collections/Media';
import FieldReports from './collections/FieldReports';
import FAQs from './collections/FAQs';
import Projects from './collections/Projects';
import Goals from './collections/Goals';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
  admin: {
    user: Users.slug,
  },
  collections: [
    Media,
    Posts,
    Users,
    FieldReports,
    FAQs,
    Projects,
    Goals
  ],
  upload: {
    limits: {
      fileSize: 1000000, // 1MB, written in bytes
    }
  },
  plugins: [
    s3Upload({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
});
