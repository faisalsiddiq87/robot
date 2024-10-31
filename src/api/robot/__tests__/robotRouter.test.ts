import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Robot } from "@/api/robot/robotModel";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("Robot API Endpoints", () => {
  describe("GET /robot/:fileName", () => {
    it("should be able to move the robot with valid commands input file", async () => {
      const fileName = "validCommands.txt";
      const response = await request(app).get(`/robot/${fileName}`);
      const responseBody: ServiceResponse<Robot> = response.body;
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("There are Valid Commands in given File");
      compareRobotResponse(responseBody.responseObject);
    });

    it("should not be able to move the robot with wrong input file", async () => {
      const fileName = "wrongFile.txt";
      const response = await request(app).get(`/robot/${fileName}`);
      const responseBody: ServiceResponse<Robot> = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("File Not Found");
    });

    it("should not be able to move the robot with empty input file", async () => {
      const fileName = "cmds.txt";
      const response = await request(app).get(`/robot/${fileName}`);
      const responseBody: ServiceResponse<Robot> = response.body;
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("No Valid Commands Found in given File");
    });
  });
});

function compareRobotResponse(responseRobot: any) {
  if (!responseRobot) {
    throw new Error("Invalid test data: responseRobot is undefined");
  }

  expect(responseRobot[0]).toEqual("2,2,WEST");
  expect(responseRobot[1]).toEqual("1,2,WEST");
  expect(responseRobot[2]).toEqual("3,5,NORTH");
}
