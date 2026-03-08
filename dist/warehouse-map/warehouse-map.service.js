"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseMapService = void 0;
const common_1 = require("@nestjs/common");
let WarehouseMapService = class WarehouseMapService {
    constructor() {
        this.map = [];
    }
    initialize(rows, cols) {
        this.map = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    }
    setCell(row, col, value) {
        if (!this.map[row]) {
            return;
        }
        if (col < 0 || col >= this.map[row].length) {
            return;
        }
        this.map[row][col] = value;
    }
    getCell(row, col) {
        if (!this.map[row]) {
            return null;
        }
        if (col < 0 || col >= this.map[row].length) {
            return null;
        }
        return this.map[row][col];
    }
    getMap() {
        return this.map;
    }
};
exports.WarehouseMapService = WarehouseMapService;
exports.WarehouseMapService = WarehouseMapService = __decorate([
    (0, common_1.Injectable)()
], WarehouseMapService);
//# sourceMappingURL=warehouse-map.service.js.map