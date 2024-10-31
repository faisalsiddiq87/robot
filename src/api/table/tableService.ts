export class TableService {
  xAxis: number;

  yAxis: number;

  constructor(x: number, y: number) {
    this.xAxis = x;

    this.yAxis = y;
  }

  getMaxXAXIS() {
    return this.xAxis;
  }

  getMaxYAXIS() {
    return this.yAxis;
  }

  setXAXIS(x: number) {
    this.xAxis = x;
  }

  setYAXIS(y: number) {
    this.yAxis = y;
  }

  isValidSquareTable() {
    let isSquare = false;
    const xAxis = this.getMaxXAXIS();
    const yAxis = this.getMaxYAXIS();

    if (Number(xAxis) && Number(yAxis) && xAxis === yAxis) {
      isSquare = true;
    }

    return isSquare;
  }

  isValidLocationOnTable(newXAxis: number, newYAxis: number) {
    let isValidMove = false;

    if (newXAxis <= this.getMaxXAXIS() && newYAxis <= this.getMaxYAXIS() && newXAxis >= 0 && newYAxis >= 0) {
      isValidMove = true;
    }

    return isValidMove;
  }
}
