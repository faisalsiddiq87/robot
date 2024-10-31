import { CommandService } from "@/api/command/commandService";
import { TableService } from "@/api/table/tableService";
import { env } from "@/common/utils/envConfig";

describe("commandService", () => {
  let commandServiceInstance: CommandService;
  const commandsData = [
    "PLACE 0,1,EAST",
    "PLACE 2,2,SOUTH",
    "RIGHT",
    "REPORT",
    "MOVE",
    "REPORT",
    "PLACE 3,5,NORTH",
    "PLACE 6,6,NORTH",
    "MOVE",
    "REPORT",
  ];

  const onlyValidCommands = [
    "PLACE 0,1,EAST",
    "PLACE 2,2,SOUTH",
    "RIGHT",
    "REPORT",
    "MOVE",
    "REPORT",
    "PLACE 3,5,NORTH",
    "MOVE",
    "REPORT",
  ];

  const havingPrePlaceommands = ["RIGHT", "REPORT", "MOVE", "REPORT", "PLACE 3,5,NORTH", "MOVE", "REPORT"];

  const validPrePlaceCommands = ["PLACE 3,5,NORTH", "MOVE", "REPORT"];

  beforeEach(() => {
    commandServiceInstance = new CommandService(commandsData, new TableService(env.MAX_X_AXIS, env.MAX_Y_AXIS));
  });

  describe("commandServiceStart", () => {
    it("should return only the valid commands", async () => {
      const result = commandServiceInstance.getAllValidCommands();
      expect(result).toMatchObject(onlyValidCommands);
    });

    it("should ignore all the commands before valid place command", async () => {
      commandServiceInstance.setCommands(havingPrePlaceommands);
      commandServiceInstance.ignoreAllPreCommandsTillPlaceCommand();
      const result = commandServiceInstance.getCommands();
      expect(result).toMatchObject(validPrePlaceCommands);
    });

    it("should remove all the bad commands from given set of command", async () => {
      commandServiceInstance.removeAllBadCommands();
      const result = commandServiceInstance.getCommands();
      expect(result).toMatchObject(onlyValidCommands);
    });
  });
});
