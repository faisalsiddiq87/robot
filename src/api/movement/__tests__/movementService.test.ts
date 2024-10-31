import { MovementService } from "@/api/movement/movementService";
import { TableService } from "@/api/table/tableService";
import { env } from "@/common/utils/envConfig";

describe("MovementService", () => {
  let movementServiceInstance: MovementService;

  const commandsDataSet01 = ["PLACE 0,1,EAST", "PLACE 2,2,SOUTH", "RIGHT", "REPORT"];

  const commandsDataSet02 = ["PLACE 0,1,EAST", "PLACE 2,2,SOUTH", "RIGHT"];

  const commandsDataSet03 = [...commandsDataSet01, "MOVE", "MOVE", "LEFT", "REPORT"];

  const matchDataSet01Response = ["2,2,WEST"];

  const matchDataSet02Response = ["No Report command given"];

  const matchDataSet03Response = ["2,2,WEST", "0,2,SOUTH"];

  beforeEach(() => {
    movementServiceInstance = new MovementService(commandsDataSet01, new TableService(env.MAX_X_AXIS, env.MAX_Y_AXIS));
  });

  describe("movementServiceStart", () => {
    it("should place the robot on table and report the correct location for dataSet 01", async () => {
      const result = movementServiceInstance.start();
      expect(result).toMatchObject(matchDataSet01Response);
    });

    it("should place the robot on table and match the output for dataSet 02", async () => {
      movementServiceInstance.setCommands(commandsDataSet02);
      const result = movementServiceInstance.start();
      expect(result).toMatchObject(matchDataSet02Response);
    });

    it("should place the robot on table and report the correct location for dataSet 03", async () => {
      movementServiceInstance.setCommands(commandsDataSet03);
      const result = movementServiceInstance.start();
      expect(result).toMatchObject(matchDataSet03Response);
    });
  });
});
