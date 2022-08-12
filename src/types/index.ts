import { IncomingUploadType } from 'payload/dist/uploads/types';
import { CollectionConfig } from 'payload/types';

interface IncomingUploadTypeS3 extends IncomingUploadType {
    s3: {
        bucket: string,
        prefix: string | ((doc: Record<string, unknown>) => string),
        commandInput: {
            ACL: string
        }
    }
}

type UploadType = IncomingUploadTypeS3 | boolean


export interface S3CollectionConfig extends CollectionConfig {
    upload: UploadType
}