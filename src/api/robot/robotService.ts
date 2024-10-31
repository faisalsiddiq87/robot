import { CommandService } from "@/api/command/commandService";
import { FileService } from "@/api/file/fileService";
import { MovementService } from "@/api/movement/movementService";
import { TableService } from "@/api/table/tableService";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export class RobotService {
  async start(fileName: string) {
    try {
      const table = new TableService(env.MAX_X_AXIS, env.MAX_Y_AXIS);
      if (table.isValidSquareTable()) {
        const file = new FileService(fileName);
        if (file.fileExists()) {
          const commands = await file.parse();
          const allCommands = new CommandService(commands, table);
          const validCommands = allCommands.getAllValidCommands();
          if (validCommands.length) {
            const move = new MovementService(validCommands, table);
            const output = move.start();
            return ServiceResponse.success("There are Valid Commands in given File", output, StatusCodes.OK);
          } else {
            return ServiceResponse.failure("No Valid Commands Found in given File", [], StatusCodes.NOT_FOUND);
          }
        } else {
          return ServiceResponse.failure("File Not Found", [], StatusCodes.NOT_FOUND);
        }
      } else {
        return ServiceResponse.failure("No Valid Square Table Found for Robot Movement", [], StatusCodes.NOT_FOUND);
      }
    } catch (ex) {
      const errorMessage = `Error while processing robotic movement: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while moving the robot.",
        [],
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const robotService = new RobotService();
