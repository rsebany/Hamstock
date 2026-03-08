import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehouseMapService {
  // Represents the warehouse as a 2D matrix (floors/sections can be mapped as needed)
  private map: number[][] = [];

  initialize(rows: number, cols: number): void {
    this.map = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0),
    );
  }

  setCell(row: number, col: number, value: number): void {
    if (!this.map[row]) {
      return;
    }
    if (col < 0 || col >= this.map[row].length) {
      return;
    }
    this.map[row][col] = value;
  }

  getCell(row: number, col: number): number | null {
    if (!this.map[row]) {
      return null;
    }
    if (col < 0 || col >= this.map[row].length) {
      return null;
    }
    return this.map[row][col];
  }

  getMap(): number[][] {
    return this.map;
  }
}

