import { buildConfig } from 'payload/config';
import s3Upload from 'modified-payload-s3-upload';
import path from 'path';
import Categories from './collections/Categories';
import Posts from './collections/Posts';
import Tags from './collections/Tags';
import Users from './collections/Users';
import Media from './collections/Media';
import FieldReports from './collections/FieldReports';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_BASE_DNS,
  admin: {
    user: Users.slug,
  },
  collections: [
    Categories,
    Media,
    Posts,
    Tags,
    Users,
    FieldReports
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
