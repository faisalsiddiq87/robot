import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { GetRobotSchema, RobotSchema } from "@/api/robot/robotModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { robotController } from "./robotController";

export const robotRegistry = new OpenAPIRegistry();
export const robotRouter: Router = express.Router();

robotRegistry.register("Robot", RobotSchema);

robotRegistry.registerPath({
  method: "get",
  path: "/robot/{fileName}",
  tags: ["Robot"],
  request: { params: GetRobotSchema.shape.params },
  responses: createApiResponse(RobotSchema, "Success"),
});

robotRouter.get("/:fileName", validateRequest(GetRobotSchema), robotController.execute);
