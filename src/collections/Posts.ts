import { CollectionAfterChangeHook, CollectionConfig } from 'payload/types';

const afterChangeHok:  CollectionAfterChangeHook = async ({
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
}) => {
  console.log('operation: ', operation);
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  if(operation === "create" && process.env.NODE_ENV === "production") {
    fetch('https://api.netlify.com/build_hooks/63b59429244f0503e449561f', {
      method: 'POST',
      body: JSON.stringify({})
    });
  }
}

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'slug', 'featured', 'status'],
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
      name: 'snippet',
      type: 'textarea'
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'featured',
      type: 'checkbox',
      
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
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

export default Posts;