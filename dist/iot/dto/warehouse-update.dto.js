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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseUpdateDto = exports.ShelfPayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ShelfPayloadDto {
}
exports.ShelfPayloadDto = ShelfPayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Measured distance from sensor to product (cm)' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ShelfPayloadDto.prototype, "distance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Shelf occupancy status, e.g. PRODUCT PRESENT or EMPTY',
        example: 'PRODUCT PRESENT',
    }),
    __metadata("design:type", String)
], ShelfPayloadDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Whether this shelf is in alert state',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ShelfPayloadDto.prototype, "alert", void 0);
class WarehouseUpdateDto {
}
exports.WarehouseUpdateDto = WarehouseUpdateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShelfPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShelfPayloadDto),
    __metadata("design:type", ShelfPayloadDto)
], WarehouseUpdateDto.prototype, "Shelf1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShelfPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShelfPayloadDto),
    __metadata("design:type", ShelfPayloadDto)
], WarehouseUpdateDto.prototype, "Shelf2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShelfPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShelfPayloadDto),
    __metadata("design:type", ShelfPayloadDto)
], WarehouseUpdateDto.prototype, "Shelf3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ShelfPayloadDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ShelfPayloadDto),
    __metadata("design:type", ShelfPayloadDto)
], WarehouseUpdateDto.prototype, "Shelf4", void 0);
//# sourceMappingURL=warehouse-update.dto.js.map