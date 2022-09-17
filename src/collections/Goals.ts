import { CollectionConfig } from 'payload/types';

const Goals: CollectionConfig = {
  slug: 'goals',
  admin: {
    defaultColumns: ['text'],
    useAsTitle: 'text',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    }
  ],
}

export default Goals;