export declare class ShelfPayloadDto {
    distance: number;
    status: string;
    alert: boolean;
}
export declare class WarehouseUpdateDto {
    Shelf1: ShelfPayloadDto;
    Shelf2: ShelfPayloadDto;
    Shelf3: ShelfPayloadDto;
    Shelf4: ShelfPayloadDto;
}
