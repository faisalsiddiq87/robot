import { TableService } from "@/api/table/tableService";
import { env } from "@/common/utils/envConfig";

describe("tableService", () => {
  let tableServiceInstance: TableService;
  const testXAxis = 3;
  const testYAxis = 6;

  beforeEach(() => {
    tableServiceInstance = new TableService(env.MAX_X_AXIS, env.MAX_Y_AXIS);
  });

  describe("tableServiceStart", () => {
    it("should return true for a valid square table coordinates", async () => {
      const result = tableServiceInstance.isValidSquareTable();
      expect(result).toEqual(true);
    });

    it("should return true for valid coordinates location on valid square table", async () => {
      const result = tableServiceInstance.isValidLocationOnTable(3, 3);
      expect(result).toEqual(true);
    });

    it("should return false for wrong coordinates location on valid square table", async () => {
      const result = tableServiceInstance.isValidLocationOnTable(6, 6);
      expect(result).toEqual(false);
    });

    it("should return false for inValid square table coordinates", async () => {
      tableServiceInstance.setXAXIS(testXAxis);
      tableServiceInstance.setYAXIS(testYAxis);
      const result = tableServiceInstance.isValidSquareTable();
      expect(result).toEqual(false);
    });
  });
});
