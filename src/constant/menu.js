import {
    UserCheck,
    Server,
    Home
} from 'react-feather';

export const MENUITEMS = [ 
    {
        title: 'Jobs', icon: UserCheck, role: 'user', type: 'sub', path: '/jobs', badgeType: 'primary', active: false, children: [
            {path: '/jobs/activeJobs', title: 'Active Jobs', type: 'link'},
            {path: '/jobs/pendingJobs', title: 'Pending Jobs', type: 'link'}
        ]
    },
    {
        title: 'Company', icon: Home, role: 'user', type: 'sub', path: '/company', active: false, children:[
            {path: '/company/activeCompany', title: 'Active Company', type: 'link'},
            {path: '/company/pendingCompany', title: 'Pending Company', type: 'link'}
        ]
    },
    {
        title: 'Masters', icon: Server, key:"master", type: 'sub', path: '/master', active: false, children: [
            { path: '/master/industry', title: 'industry', type: 'link' },
        ]
    },
]
