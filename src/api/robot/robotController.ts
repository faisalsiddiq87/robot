import { robotService } from "@/api/robot/robotService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";

class RobotController {
  public execute: RequestHandler = async (req: Request, res: Response) => {
    const fileName = req.params.fileName;
    const serviceResponse = await robotService.start(fileName);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const robotController = new RobotController();
