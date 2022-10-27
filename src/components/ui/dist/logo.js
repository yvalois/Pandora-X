"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var image_1 = require("@/components/ui/image");
var anchor_link_1 = require("@/components/ui/links/anchor-link");
var use_is_mounted_1 = require("@/lib/hooks/use-is-mounted");
var use_is_dark_mode_1 = require("@/lib/hooks/use-is-dark-mode");
var PandoraX_png_1 = require("@/assets/images/PandoraX.png");
var Logo = function (props) {
    var isMounted = use_is_mounted_1.useIsMounted();
    var isDarkMode = use_is_dark_mode_1.useIsDarkMode().isDarkMode;
    return (React.createElement(anchor_link_1["default"], __assign({ href: "/", className: "flex w-38 outline-none sm:w-38 4xl:w-45" }, props),
        React.createElement("span", { className: "relative flex overflow-hidden" },
            isMounted && isDarkMode && (React.createElement(image_1["default"], { src: PandoraX_png_1["default"], alt: "Criptic", priority: true })),
            isMounted && !isDarkMode && (React.createElement(image_1["default"], { src: PandoraX_png_1["default"], alt: "Criptic", priority: true })))));
};
exports["default"] = Logo;
