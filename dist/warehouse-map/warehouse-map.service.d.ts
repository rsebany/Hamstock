export declare class WarehouseMapService {
    private map;
    initialize(rows: number, cols: number): void;
    setCell(row: number, col: number, value: number): void;
    getCell(row: number, col: number): number | null;
    getMap(): number[][];
}
