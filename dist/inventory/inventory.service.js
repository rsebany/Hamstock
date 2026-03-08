"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../entities/product.entity");
let InventoryService = class InventoryService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    findAll() {
        return this.productsRepository.find();
    }
    findOne(id) {
        return this.productsRepository.findOne({ where: { id } });
    }
    async create(dto) {
        const product = this.productsRepository.create({
            ...dto,
            expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        });
        return this.productsRepository.save(product);
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        if (!existing) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        const toUpdate = {
            ...dto,
            expiryDate: dto.expiryDate !== undefined
                ? dto.expiryDate
                    ? new Date(dto.expiryDate)
                    : null
                : existing.expiryDate,
        };
        await this.productsRepository.update(id, toUpdate);
        const updated = await this.findOne(id);
        if (!updated) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return updated;
    }
    async remove(id) {
        const result = await this.productsRepository.delete(id);
        if (!result.affected) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map