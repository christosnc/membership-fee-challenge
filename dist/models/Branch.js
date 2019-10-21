"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var OrganisationUnit_1 = require("./OrganisationUnit");
var Branch = /** @class */ (function (_super) {
    __extends(Branch, _super);
    function Branch(name, parent, organisation_unit_config) {
        var _this = _super.call(this, name, organisation_unit_config) || this;
        _this.parent = parent;
        return _this;
    }
    return Branch;
}(OrganisationUnit_1.OrganisationUnit));
exports.Branch = Branch;
