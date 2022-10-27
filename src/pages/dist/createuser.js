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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var next_seo_1 = require("next-seo");
var _dashboard_1 = require("@/layouts/_dashboard");
var react_1 = require("react");
var NFTROL_1 = require("@/NFTROL");
// static data
var CreateUser = function () {
    var tiempoTranscurrido = Date.now();
    var hoy = new Date(tiempoTranscurrido);
    var NewUser = {
        Nombre: "",
        Correo: "",
        Address: "",
        Categoria: "Agente X",
        Rango: "peerx",
        Fecha: hoy.toLocaleDateString(),
        Rol: "usuario"
    };
    var _a = react_1.useState(NewUser), value = _a[0], setValue = _a[1];
    var ChangeInfo = function (Dato, valor) {
        if (Dato == "Nombre") {
            setValue(function (prevState) { return (__assign(__assign({}, prevState), { Nombre: valor })); });
        }
        else if (Dato == "Correo") {
            setValue(function (prevState) { return (__assign(__assign({}, prevState), { Correo: valor })); });
        }
        else if (Dato == "Address") {
            setValue(function (prevState) { return (__assign(__assign({}, prevState), { Address: valor })); });
        }
        else if (Dato == "Categoria") {
            setValue(function (prevState) { return (__assign(__assign({}, prevState), { Categoria: valor })); });
        }
        else {
            setValue(function (prevState) { return (__assign(__assign({}, prevState), { Rango: valor })); });
        }
    };
    function CrearUsuario() {
        return __awaiter(this, void 0, void 0, function () {
            var address, categoria, rango, txResult, a, b, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        address = value.Address;
                        categoria = value.Categoria;
                        rango = value.Rango;
                        return [4 /*yield*/, NFTROL_1.mint(address, categoria, rango)];
                    case 1:
                        txResult = _a.sent();
                        return [4 /*yield*/, NFTROL_1.getType(address)];
                    case 2:
                        a = _a.sent();
                        return [4 /*yield*/, NFTROL_1.getRange(address)];
                    case 3:
                        b = _a.sent();
                        console.log(a);
                        console.log(b);
                        console.log(txResult.status);
                        if (txResult.status === 1) {
                            fetch("http://localhost:8000/api/CrearUsuario", {
                                method: "POST",
                                body: JSON.stringify(value),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                                .then(function (res) { return res.json(); })
                                .then(function () {
                                alert("listo");
                                console.log(value);
                            })["catch"](function (error) { return console.error("Error:", error); });
                        }
                        else {
                            alert("Transaccion fracaso");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    ;
    return (React.createElement(React.Fragment, null,
        React.createElement(next_seo_1.NextSeo, { title: "Create new user", description: "Criptic - React Next Web3 NFT Crypto Dashboard Template" }),
        React.createElement("div", { className: "mx-auto w-full max-w-[1160px] text-sm md:pt-14 4xl:pt-24 justify-center self-center " },
            React.createElement("div", { className: "grid grid-cols-1 gap-6 xs:grid-cols-2 lg:grid-cols-3 w-full " },
                React.createElement("div", { className: "w-full max-w-xs ml-60 " },
                    React.createElement("form", { className: "bg-white dark:bg-dark  shadow-md rounded px-8 pt-6 pb-8 mb-4  " },
                        React.createElement("div", { className: "mb-4" },
                            React.createElement("label", { className: "block text-gray-700 dark:text-white text-sm font-bold mb-2" }, "Name"),
                            React.createElement("input", { onChange: function (e) { return ChangeInfo("Nombre", e.target.value); }, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", id: "username", type: "text", placeholder: "Name" })),
                        React.createElement("div", { className: "mb-6" },
                            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2 dark:text-white" }, "Correo"),
                            React.createElement("input", { onChange: function (e) { return ChangeInfo("Correo", e.target.value); }, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", type: "text", id: "Correo", placeholder: "Correo" })),
                        React.createElement("div", { className: "mb-6" },
                            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2 dark:text-white" }, "Address Wallet"),
                            React.createElement("input", { onChange: function (e) { return ChangeInfo("Address", e.target.value); }, className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", type: "text", id: "wallet", placeholder: "Address Wallet" })),
                        React.createElement("div", { className: "mb-6" },
                            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2 dark:text-white" }, "Categoria NFT"),
                            React.createElement("select", { onChange: function (e) { return ChangeInfo("Categoria", e.target.value); }, name: "select", className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", id: "wallet" },
                                React.createElement("option", { value: "Agente X" }, "Agente X "),
                                React.createElement("option", { value: "BlockMaker" }, "BlockMaker"))),
                        React.createElement("div", { className: "mb-6" },
                            React.createElement("label", { className: "block text-gray-700 text-sm font-bold mb-2 dark:text-white" }, "Rango NFT"),
                            React.createElement("select", { onChange: function (e) { return ChangeInfo("Rango", e.target.value); }, name: "select", className: "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline", id: "wallet" },
                                React.createElement("option", { value: "Peerx" }, "Peerx"),
                                React.createElement("option", { value: "BlockElite" }, "BlockElite"),
                                React.createElement("option", { value: "BlockMaster" }, "BlockMaster"),
                                React.createElement("option", { value: "BlockCreator" }, "BlockCreator"))),
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement("button", { onClick: function () { return CrearUsuario(); }, className: "bg-dark  text-white dark:text-dark dark:bg-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline", type: "button" }, "Crear Usuario"))))))));
};
CreateUser.getLayout = function getLayout(page) {
    return React.createElement(_dashboard_1["default"], null, page);
};
exports["default"] = CreateUser;
