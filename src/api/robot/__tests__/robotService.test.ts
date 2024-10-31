import { RobotService } from "@/api/robot/robotService";
import { StatusCodes } from "http-status-codes";

describe("robotService", () => {
  let robotServiceInstance: RobotService;

  const mockMoves = ["2,2,WEST", "1,2,WEST", "3,5,NORTH"];

  beforeEach(() => {
    robotServiceInstance = new RobotService();
  });

  describe("robotServiceStart", () => {
    it("should move the robot for valid commands", async () => {
      const fileName = "validCommands.txt";
      const result = await robotServiceInstance.start(fileName);
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("There are Valid Commands in given File");
      expect(result.responseObject).toEqual(mockMoves);
    });

    it("should not move the robot for wrong input command file", async () => {
      const fileName = "wrongFile.txt";
      const result = await robotServiceInstance.start(fileName);
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("File Not Found");
      expect(result.responseObject).toEqual([]);
    });

    it("should not move the robot for empty input command file", async () => {
      const fileName = "cmds.txt";
      const result = await robotServiceInstance.start(fileName);
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("No Valid Commands Found in given File");
      expect(result.responseObject).toEqual([]);
    });
  });
});
