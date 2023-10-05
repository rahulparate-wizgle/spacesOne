import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'bx bx-home',
    link: '/dashboard',
  },
  {
    id: 5,
    label: 'Master Venues',
    icon: 'bx bxs-share-alt',
    link: '/location'

  },
  {
    id: 2,
    label: 'Venues',
    icon: 'bx bx-building-house',
    link: '/venues'

  },
  {
    id: 2,
    label: 'Calender',
    icon: 'bx bx-calender',
    link: '/calender'

  },
  {
    id: 3,
    label: 'Enquiries',
    icon: 'bx bx-bookmarks',
    link: '/enquiries'

  },
  {
    id: 4,
    label: 'Users',
    icon: 'bx bx-user',
    link: '/users-list/list',
  },
  // {
  //     id: 5,
  //     label: 'Messages',
  //     icon: 'bx bx-chat',
  //     link: '/messages'

  // },

  {
    id: 6,
    label: 'Configurations',
    icon: 'bx bx-cog',
    link: '/venue-rules/list',

    subItems: [
      {
        id: 61,
        label: 'Rules',
        icon: 'bx bx-link-alt',
        link: '/venue-rules/list',
      },
      {
        id: 62,
        label: 'Amenities',
        icon: 'bx bx-bath',
        link: '/venue-amenities/list'

      },
      {
        id: 63,
        label: 'Attributes',
        icon: 'bx bx-slider-alt',
        link: '/venue-attributes/list',
      },
      {
        id: 64,
        label: 'House Standard',
        icon: 'bx bx-slider-alt',
        link: '/house-standard/list',
      },
      {
        id: 65,
        label: 'Safety Rules',
        icon: 'bx bx-slider-alt',
        link: '/safety-rules/list',
      },

      {
        id: 66,
        label: 'Additional Benefits',
        icon: 'bx bx-slider-alt',
        link: '/additional-benefits/list',
      },
      {
        id: 67,
        label: 'Venue Types',
        icon: 'bx bx-slider-alt',
        link: '/venue-types/venuetype-list',
      },
      {
        id: 68,
        label: 'Event Types',
        icon: 'bx bx-slider-alt',
        link: '/event-type/list',
      },
    ]
  },

  {
    id: 8,
    label: 'Help & Support',
    icon: 'bx bx-support',
    link: '/Help & Support'

  },
  {
    id: 1,
    label: 'Terms & Conditions',
    icon: 'bx bx-receipt',
    link: '/Terms & Conditions '

  },
  {
    id: 1,
    label: 'Privacy Policy',
    icon: 'bx bx-check-shield',
    link: '/Privacy Policy '

  },
];

export const ADMIN_MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'bx bx-home',
    link: '/dashboard',
  },
  {
    id: 2,
    label: 'Master Venues',
    icon: 'bx bxs-share-alt',
    link: '/location'

  },
  {
    id: 2,
    label: 'Venues',
    icon: 'bx bx-building-house',
    link: '/venues'

  },
  {
    id: 2,
    label: 'Calendar',
    icon: 'bx bx-calendar',
    link: '/calender'

  },
  {
    id: 3,
    label: 'Enquiries',
    icon: 'bx bx-bookmarks',
    link: '/enquiries'

  },
  {
    id: 4,
    label: 'Users',
    icon: 'bx bx-user',
    link: '/users-list/list',
  },
  // {
  //     id: 5,
  //     label: 'Messages',
  //     icon: 'bx bx-chat',
  //     link: '/messages'

  // },


  // {
  //     id: 7,
  //     label: 'Blog',
  //     icon: 'bx bx-news',
  //     link: '/blog-content/list'

  // },
  {
    id: 8,
    label: 'Help & Support',
    icon: 'bx bx-support',
    link: '/Help & Support'

  }
];

export const MANAGER_MENU: MenuItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    icon: 'bx bx-home',
    link: '/dashboard',
  },
  {
    id: 2,
    label: 'Venues',
    icon: 'bx bx-building-house',
    link: '/venues'

  },
  {
    id: 2,
    label: 'Calendar',
    icon: 'bx bx-calendar',
    link: '/calender'

  },
  {
    id: 3,
    label: 'Enquiries',
    icon: 'bx bx-bookmarks',
    link: '/enquiries'

  },
  {
    id: 3,
    label: 'Messages',
    icon: 'bx bx-chat',
    link: '/messages'

  },
  {
    id: 4,
    label: 'Users',
    icon: 'bx bx-user',
    link: '/users-list/list',
  },

  {
    id: 8,
    label: 'Help & Support',
    icon: 'bx bx-support',
    link: '/Help & Support'

  }
];

