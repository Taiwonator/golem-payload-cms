import { CollectionConfig } from 'payload/types';

const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    defaultColumns: ['question', 'answer'],
    useAsTitle: 'question',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
    },
    {
      name: 'answer',
      type: 'richText',
    },
  ],
}

export default FAQs;