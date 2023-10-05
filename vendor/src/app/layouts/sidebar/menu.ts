import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 7,
                label: 'MENUITEMS.DASHBOARDS.LIST.JOBS',
                link: '/dashboard',
                parentId: 2,
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.FILEMANAGER.BADGE',
                },
            },
        ]
    },
    {
        id: 8,
        isLayout: true
    },
    {
        id: 9,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },
    {
        id: 10,
        label: 'MENUITEMS.CALENDAR.TEXT',
        icon: 'bx-calendar',
        link: '/dashboard',
    },
    {
        id: 11,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: '/dashboard',
        
    },
    {
        id: 12,
        label: 'MENUITEMS.FILEMANAGER.TEXT',
        icon: 'bx-file',
        link: '/dashboard',
    },
    {
        id: 13,
        label: 'MENUITEMS.ECOMMERCE.TEXT',
        icon: 'bx-store',
        subItems: [
            {
                id: 14,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTS',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 15,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 16,
                label: 'MENUITEMS.ECOMMERCE.LIST.ORDERS',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 17,
                label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 18,
                label: 'MENUITEMS.ECOMMERCE.LIST.CART',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 19,
                label: 'MENUITEMS.ECOMMERCE.LIST.CHECKOUT',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 20,
                label: 'MENUITEMS.ECOMMERCE.LIST.SHOPS',
                link: '/dashboard',
                parentId: 13
            },
            {
                id: 21,
                label: 'MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT',
                link: '/dashboard',
                parentId: 13
            },
        ]
    },
    {
        id: 22,
        label: 'MENUITEMS.CRYPTO.TEXT',
        icon: 'bx-bitcoin',
        subItems: [
            {
                id: 23,
                label: 'MENUITEMS.CRYPTO.LIST.WALLET',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 24,
                label: 'MENUITEMS.CRYPTO.LIST.BUY/SELL',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 25,
                label: 'MENUITEMS.CRYPTO.LIST.EXCHANGE',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 26,
                label: 'MENUITEMS.CRYPTO.LIST.LENDING',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 27,
                label: 'MENUITEMS.CRYPTO.LIST.ORDERS',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 28,
                label: 'MENUITEMS.CRYPTO.LIST.KYCAPPLICATION',
                link: '/dashboard',
                parentId: 22
            },
            {
                id: 29,
                label: 'MENUITEMS.CRYPTO.LIST.ICOLANDING',
                link: '/dashboard',
                parentId: 22
            }
        ]
    },
    {
        id: 30,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '/dashboard',
                parentId: 30
            },
            {
                id: 32,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '/dashboard',
                parentId: 30
            },
            {
                id: 33,
                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 30,
                subItems: [
                    {
                        id:34,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC',
                        link: '/dashboard',
                        parentId:30 
                    },
                    {
                        id:35,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT',
                        link: '/dashboard',
                        parentId:30
                    },
                    {
                        id:36,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING',
                        link: '/dashboard',
                        parentId:30
                    }
                ]
            }
        ]
    },
    {
        id: 37,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 38,
                label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                link: '/dashboard',
                parentId: 37
            },
            {
                id: 39,
                label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                link: '/dashboard',
                parentId: 37
            },
        ]
    },
    {
        id: 40,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 41,
                label: 'MENUITEMS.PROJECTS.LIST.GRID',
                link: '/dashboard',
                parentId: 40
            },
            {
                id: 42,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
                link: '/dashboard',
                parentId: 40
            },
            {
                id: 43,
                label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
                link: '/dashboard',
                parentId: 40
            },
            {
                id: 44,
                label: 'MENUITEMS.PROJECTS.LIST.CREATE',
                link: '/dashboard',
                parentId: 40
            }
        ]
    },
    {
        id: 45,
        label: 'MENUITEMS.TASKS.TEXT',
        icon: 'bx-task',
        subItems: [
            {
                id: 46,
                label: 'MENUITEMS.TASKS.LIST.TASKLIST',
                link: '/dashboard',
                parentId: 45
            },
            {
                id: 47,
                label: 'MENUITEMS.TASKS.LIST.KANBAN',
                link: '/dashboard',
                parentId: 45
            },
            {
                id: 48,
                label: 'MENUITEMS.TASKS.LIST.CREATETASK',
                link: '/dashboard',
                parentId: 45
            }
        ]
    },
    {
        id: 49,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/dashboard',
                parentId: 49
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/dashboard',
                parentId: 49
            },
            {
                id: 52,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/dashboard',
                parentId: 49
            }
        ]
    },
    {
        id: 53,
        label: 'MENUITEMS.BLOG.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 54,
                label: 'MENUITEMS.BLOG.LIST.BLOGLIST',
                link: '/dashboard',
                parentId: 53
            },
            {
                id: 55,
                label: 'MENUITEMS.BLOG.LIST.BLOGGRID',
                link: '/dashboard',
                parentId: 53
            },
            {
                id: 56,
                label: 'MENUITEMS.BLOG.LIST.DETAIL',
                link: '/dashboard',
                parentId: 53
            },
        ]
    },
    {
        id: 57,
        label: 'MENUITEMS.JOBS.TEXT',
        icon: 'bx-briefcase-alt',
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.JOBS.LIST.JOBLIST',
                link: '/dashboard',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.JOBS.LIST.JOBGRID',
                link: '/dashboard',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.JOBS.LIST.APPLYJOB',
                link: '/dashboard',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.JOBS.LIST.JOBDETAILS',
                link: '/dashboard',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.JOBS.LIST.JOBCATEGORIES',
                link: '/dashboard',
                parentId: 57
            },
            {
                id: 63,
                label: 'MENUITEMS.JOBS.LIST.CANDIDATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 57,
                subItems: [
                    {
                        id:64,
                        label: 'MENUITEMS.JOBS.LIST.CANDIDATE.LIST.LIST',
                        link: '/dashboard',
                        parentId:57 
                    },
                    {
                        id:65,
                        label: 'MENUITEMS.JOBS.LIST.CANDIDATE.LIST.OVERVIEW',
                        link: '/dashboard',
                        parentId:57
                    }
                ]
            }
        ]
    },
    {
        id: 66,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 67,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'bx-user-circle',
        subItems: [
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 71,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 72,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 73,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 74,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 75,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 76,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 77,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 78,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 79,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 80,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: '/dashboard',
                parentId: 67
            },
            {
                id: 81,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2',
                link: '/dashboard',
                parentId: 67
            }
        ]
    },
    {
        id: 82,
        label: 'MENUITEMS.UTILITY.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 83,
                label: 'MENUITEMS.UTILITY.LIST.STARTER',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 84,
                label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 85,
                label: 'Coming Soon',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 86,
                label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 87,
                label: 'MENUITEMS.UTILITY.LIST.FAQS',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 88,
                label: 'MENUITEMS.UTILITY.LIST.PRICING',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 89,
                label: 'MENUITEMS.UTILITY.LIST.ERROR404',
                link: '/dashboard',
                parentId: 82
            },
            {
                id: 90,
                label: 'MENUITEMS.UTILITY.LIST.ERROR500',
                link: '/dashboard',
                parentId: 82
            },
        ]
    },
    {
        id: 91,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    {
        id: 92,
        label: 'MENUITEMS.UIELEMENTS.TEXT',
        icon: 'bx-tone',
        subItems: [
            {
                id: 93,
                label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 94,
                label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 95,
                label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 96,
                label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 97,
                label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 98,
                label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 99,
                label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 100,
                label: 'MENUITEMS.UIELEMENTS.LIST.LIGHTBOX',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 101,
                label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 102,
                label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 103,
                label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 104,
                label: 'MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 105,
                label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 106,
                label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 107,
                label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 108,
                label: 'MENUITEMS.UIELEMENTS.LIST.TOASTS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 109,
                label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 110,
                label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 111,
                label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 112,
                label: 'MENUITEMS.UIELEMENTS.LIST.RATING',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 113,
                label: 'MENUITEMS.UIELEMENTS.LIST.NOTIFICATION',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 114,
                label: 'MENUITEMS.UIELEMENTS.LIST.UTILITIES',
                link: '/dashboard',
                parentId: 92
            },
            {
                id: 115,
                label: 'MENUITEMS.UIELEMENTS.LIST.CROPPER',
                link: '/dashboard',
                parentId: 92
            },
        ]
    },
    {
        id: 116,
        label: 'MENUITEMS.FORMS.TEXT',
        icon: 'bxs-eraser',
        badge: {
            variant: 'danger',
            text: 'MENUITEMS.FORMS.BADGE',
        },
        subItems: [
            {
                id: 117,
                label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 118,
                label: 'MENUITEMS.FORMS.LIST.LAYOUTS',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 119,
                label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 120,
                label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 121,
                label: 'MENUITEMS.FORMS.LIST.EDITOR',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 122,
                label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 123,
                label: 'MENUITEMS.FORMS.LIST.REPEATER',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 124,
                label: 'MENUITEMS.FORMS.LIST.WIZARD',
                link: '/dashboard',
                parentId: 116
            },
            {
                id: 125,
                label: 'MENUITEMS.FORMS.LIST.MASK',
                link: '/dashboard',
                parentId: 116
            }
        ]
    },
    {
        id: 126,
        icon: 'bx-list-ul',
        label: 'MENUITEMS.TABLES.TEXT',
        subItems: [
            {
                id: 127,
                label: 'MENUITEMS.TABLES.LIST.BASIC',
                link: '/dashboard',
                parentId: 126
            },
            {
                id: 128,
                label: 'MENUITEMS.TABLES.LIST.DataTables',
                link: '/dashboard',
                parentId: 126
            },
            {
                id: 129,
                label: 'MENUITEMS.TABLES.LIST.EditTableTables',
                link: '/dashboard',
                parentId: 126
            }
        ]
    },
    {
        id: 130,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.CHARTS.TEXT',
        subItems: [
            {
                id: 131,
                label: 'MENUITEMS.CHARTS.LIST.APEX',
                link: '/dashboard',
                parentId: 130
            },
            {
                id: 132,
                label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
                link: '/dashboard',
                parentId: 131
            },
            {
                id: 133,
                label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
                link: '/dashboard',
                parentId: 131
            },
            {
                id: 134,
                label: 'MENUITEMS.CHARTS.LIST.ECHART',
                link: '/dashboard',
                parentId: 131
            }
        ]
    },
    {
        id: 135,
        label: 'MENUITEMS.ICONS.TEXT',
        icon: 'bx-aperture',
        subItems: [
            {
                id: 136,
                label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                link: '/dashboard',
                parentId: 135
            },
            {
                id: 137,
                label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                link: '/dashboard',
                parentId: 135
            },
            {
                id: 138,
                label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
                link: '/dashboard',
                parentId: 135
            },
            {
                id: 139,
                label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                link: '/dashboard',
                parentId: 135
            },
        ]
    },
    {
        id: 140,
        label: 'MENUITEMS.MAPS.TEXT',
        icon: 'bx-map',
        subItems: [
            {
                id: 141,
                label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                link: '/dashboard',
                parentId: 140
            },
            {
                id: 142,
                label: 'MENUITEMS.MAPS.LIST.LEAFLETMAP',
                link: '/dashboard',
                parentId: 140
            }
        ]
    },
    {
        id: 143,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'bx-share-alt',
        subItems: [
            {
                id: 144,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                link: '/dashboard',
                parentId: 143
            },
            {
                id: 145,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                parentId: 143,
                subItems: [
                    {
                        id: 146,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 145,
                    },
                    {
                        id: 147,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId:145,
                    }
                ]
            },
        ]
    }
];

