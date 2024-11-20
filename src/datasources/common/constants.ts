import { ReactComponent as AppIcon } from './../../assest/images/app.svg';
import { ReactComponent as HomeIcon } from './../../assest/images/home.svg';
import { ReactComponent as CharacterIcon } from './../../assest/images/user.svg';
import { ReactComponent as ShipsIcon } from './../../assest/images/reports.svg';

export const rocketcolumns =  [
    {
        accessorKey: 'id',
        header: 'Id'
    },
    {
        accessorKey: 'active',
        header: 'Status'
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },

    {
        accessorKey: 'first_flight',
        header: 'Flight Date'
    },
    {
        accessorKey: 'success_rate_pct',
        header: 'Success Rate'
    }
];

type shipColumnsKeyTypes = 'accessorKey' | 'header' | 'enableSorting'

type objType = Record<shipColumnsKeyTypes, string | boolean>

export const shipColumns: objType[] =  [
    {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: false
    },
    {
        accessorKey: 'type',
        header: 'Type',
        enableSorting: false // enable sorting for this column
    },
    {
        accessorKey: 'imo',
        header: 'IMO',
        enableSorting: false
    },
    {
        accessorKey: 'active',
        header: 'Active',
        enableSorting: false
    }
];


export const pageCountList = [10, 20, 30, 40, 50];

export const sidenavbarlist = [
    {
        id:'applogo',
        type:'logo',
        name:'',
        path: '/home',
        Icon: AppIcon
    },
    {
        id:'homelogo',
        type:'sublogo',
        name:'Home',
        path: '/home',
        Icon: HomeIcon
    },
    {
        id:'userlogo',
        type:'sublogo',
        name:'Character',
        path: '/characters',
        Icon: CharacterIcon
    },
    {
        id:'reportslogo',
        type:'sublogo',
        name:'Ships',
        path: '/ships',
        Icon: ShipsIcon
    }
]