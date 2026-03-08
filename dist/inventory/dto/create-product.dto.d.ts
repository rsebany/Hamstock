export declare class CreateProductDto {
    name: string;
    sku: string;
    quantity?: number;
    expiryDate?: string | null;
    category?: string | null;
    minTemp?: number | null;
    maxTemp?: number | null;
    minHumidity?: number | null;
}
