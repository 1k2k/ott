import Maps from 'views/Maps/Maps';

const appRoutes = [
    { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    { redirect: true, path:"/", to:"/maps", name: "Dashboard" }
];

export default appRoutes;
