import { S3CollectionConfig } from "../types"

const Media: S3CollectionConfig = {
    slug: 'media',
    upload: {
        staticURL: '/assets',
        staticDir: 'assets',
        disableLocalStorage: true,
        s3: {
          bucket: 'golem-uploads-bucket',
          prefix: 'images',
          commandInput: {
            ACL: 'public-read',  
          },
        },
        adminThumbnail: ({ doc }) => `https://golem-uploads-bucket.s3.eu-west-2.amazonaws.com/images/${doc.filename}`,
      },
      hooks: {
        beforeChange: [
          async ({ data, req, operation, originalDoc }) => {
            if(!data.filename) return { ...originalDoc, ...data }
          }
        ],
        afterRead: [
          async ({ doc }) => {
            doc.url = `https://golem-uploads-bucket.s3.eu-west-2.amazonaws.com/images/${doc.filename}`
          }
        ]
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          access: {
            create: () => false,
            update: () => false,
          },
          admin: {
            disabled: false,
          },
        },
        {
          name: 'alt',
          type: 'text',
        }
      ],
}

export default Media