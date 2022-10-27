"use strict";
exports.__esModule = true;
exports.menuItems = void 0;
var react_1 = require("react");
var classnames_1 = require("classnames");
var author_card_1 = require("@/components/ui/author-card");
var logo_1 = require("@/components/ui/logo");
var logo_icon_1 = require("@/components/ui/logo-icon");
var menu_icon_1 = require("@/components/ui/menu-icon");
var collapsible_menu_1 = require("@/components/ui/collapsible-menu");
var scrollbar_1 = require("@/components/ui/scrollbar");
var button_1 = require("@/components/ui/button");
var routes_1 = require("@/config/routes");
var context_1 = require("@/components/drawer-views/context");
var home_1 = require("@/components/icons/home");
var farm_1 = require("@/components/icons/farm");
var pool_1 = require("@/components/icons/pool");
var profile_1 = require("@/components/icons/profile");
var disk_1 = require("@/components/icons/disk");
var exchange_1 = require("@/components/icons/exchange");
var vote_icon_1 = require("@/components/icons/vote-icon");
var close_1 = require("@/components/icons/close");
var plus_circle_1 = require("@/components/icons/plus-circle");
var compass_1 = require("@/components/icons/compass");
//images
var author_jpg_1 = require("@/assets/images/author.jpg");
exports.menuItems = [
    {
        name: 'Home',
        icon: React.createElement(home_1.HomeIcon, null),
        href: routes_1["default"].home,
        dropdownItems: [
            {
                name: 'Modern',
                href: routes_1["default"].home
            },
            {
                name: 'Minimal',
                href: routes_1["default"].minimal
            },
            {
                name: 'Retro',
                href: routes_1["default"].retro
            },
            {
                name: 'Classic',
                href: routes_1["default"].classic
            },
        ]
    },
    {
        name: 'Farm',
        icon: React.createElement(farm_1.FarmIcon, null),
        href: routes_1["default"].farms
    },
    {
        name: 'Swap',
        icon: React.createElement(exchange_1.ExchangeIcon, null),
        href: routes_1["default"].swap
    },
    {
        name: 'Liquidity',
        icon: React.createElement(pool_1.PoolIcon, null),
        href: routes_1["default"].liquidity
    },
    {
        name: 'Explore NFTs',
        icon: React.createElement(compass_1.CompassIcon, null),
        href: routes_1["default"].search
    },
    {
        name: 'Create NFT',
        icon: React.createElement(plus_circle_1.PlusCircle, null),
        href: routes_1["default"].createNft
    },
    {
        name: 'NFT Details',
        icon: React.createElement(disk_1.DiskIcon, null),
        href: routes_1["default"].nftDetails
    },
    {
        name: 'Profile',
        icon: React.createElement(profile_1.ProfileIcon, null),
        href: routes_1["default"].profile
    },
    {
        name: 'Vote',
        icon: React.createElement(vote_icon_1.VoteIcon, null),
        href: routes_1["default"].vote,
        dropdownItems: [
            {
                name: 'Explore',
                href: routes_1["default"].vote
            },
            {
                name: 'Vote with pools',
                href: routes_1["default"].proposals
            },
            {
                name: 'Create proposal',
                href: routes_1["default"].createProposal
            },
        ]
    },
];
function Sidebar(_a) {
    var className = _a.className;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var closeDrawer = context_1.useDrawer().closeDrawer;
    return (React.createElement("aside", { className: classnames_1["default"](" " + (open
            ? 'border-0  shadow-expand xs:w-80 xl:w-72 2xl:w-80 '
            : 'w-24 border-dashed border-gray-200 ltr:border-r rtl:border-l 2xl:w-28') + " top-0 z-40 h-full w-full max-w-full  bg-body duration-200 ltr:left-0 rtl:right-0  dark:border-gray-700 dark:bg-dark xl:fixed  ", className) },
        React.createElement("div", { className: "relative flex h-24  items-center  overflow-hidden px-6 py-4 2xl:px-8 " + (open ? 'flex-start' : 'justify-center') },
            !open ? (React.createElement("div", { onClick: function () { return setOpen(!open); } },
                React.createElement(logo_icon_1["default"], null))) : (React.createElement(logo_1["default"], null)),
            open && (React.createElement("div", { className: " absolute right-5 top-[38px] h-5 w-5 cursor-pointer text-gray-50 rtl:xl:right-[230px] rtl:2xl:right-[260px] 3xl:top-[34px] 3xl:h-6 3xl:w-6\n             " + (!open && 'rotate-180'), onClick: function () { return setOpen(!open); } },
                React.createElement(menu_icon_1["default"], null))),
            React.createElement("div", { className: "md:hidden" },
                React.createElement(button_1["default"], { title: "Close", color: "white", shape: "circle", variant: "transparent", size: "small", onClick: closeDrawer },
                    React.createElement(close_1.Close, { className: "h-auto w-2.5" })))),
        React.createElement(scrollbar_1["default"], { style: { height: 'calc(100% - 96px)' } },
            React.createElement("div", { className: "px-6 pb-5 2xl:px-8" }, !open ? (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "mt-5 2xl:mt-8", onClick: function () { return setOpen(!open); } }, exports.menuItems.map(function (item, index) { return (React.createElement(collapsible_menu_1.MenuItem, { key: index, href: "", icon: item.icon })); })),
                React.createElement("div", { className: " mt-28 cursor-pointer", onClick: function () { return setOpen(!open); } },
                    React.createElement(author_card_1["default"], { image: author_jpg_1["default"] })))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "mt-5 2xl:mt-8" }, exports.menuItems.map(function (item, index) { return (React.createElement(collapsible_menu_1.MenuItem, { key: index, name: item.name, href: item.href, icon: item.icon, dropdownItems: item.dropdownItems })); })),
                React.createElement("div", { className: "mt-28 min-h-[80px] " },
                    React.createElement(author_card_1["default"], { image: author_jpg_1["default"], name: "Root", role: "admin" }))))))));
}
exports["default"] = Sidebar;
