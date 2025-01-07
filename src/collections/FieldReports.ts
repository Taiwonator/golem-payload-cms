import { CollectionAfterChangeHook, CollectionConfig } from 'payload/types';

const afterChangeHok:  CollectionAfterChangeHook = async ({
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
}) => {
  console.log('operation: ', operation);
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  if(operation === "create") {
    try {
      await fetch('https://api.netlify.com/build_hooks/63b59429244f0503e449561f', {
        method: 'POST',
        body: JSON.stringify({})
      });
    } catch (error) {
      console.error('Error triggering Netlify build hook:', error);
    }
  }
  console.log('done');
}

const FieldReports: CollectionConfig = {
  slug: 'FieldReports',
  admin: {
    defaultColumns: ['title', 'slug', 'status'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      required: true
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText'
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      }
    }
  ],
  hooks: {
    afterChange: [afterChangeHok]
  }
}

export default FieldReports;