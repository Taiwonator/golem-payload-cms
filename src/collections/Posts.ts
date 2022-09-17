import { CollectionConfig } from 'payload/types';

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
      type: 'text'
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
}

export default Posts;