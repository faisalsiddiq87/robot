export class CommandService {
  commands: string[];

  table: any;

  constructor(commands: string[], tableInstance: any) {
    this.commands = commands;
    this.table = tableInstance;
  }

  getCommands() {
    return this.commands;
  }

  setCommands(commands: string[]) {
    this.commands = commands;
  }

  getAllValidCommands() {
    this.ignoreAllPreCommandsTillPlaceCommand();

    this.removeAllBadCommands();

    return this.getCommands();
  }

  ignoreAllPreCommandsTillPlaceCommand() {
    let getFirstValidPlaceCommandKey = -1;
    const allCommands = this.getCommands();

    //Find the first valid PLACE Command index
    for (const el of allCommands) {
      if (getFirstValidPlaceCommandKey === -1 && this.isValidPlaceCommand(el)) {
        getFirstValidPlaceCommandKey = allCommands.indexOf(el);
      }
    }

    //Remove ALL Commands before the first valid PLACE command
    if (getFirstValidPlaceCommandKey > -1) {
      const indexedCommands = allCommands.slice(getFirstValidPlaceCommandKey);
      this.setCommands(indexedCommands);
    } else {
      this.setCommands([]);
    }
  }

  removeAllBadCommands() {
    const validCommands = [];
    const allCommands = this.getCommands();

    for (const cmd of allCommands) {
      if (
        this.isValidPlaceCommand(cmd) ||
        this.isValidMoveCommand(cmd) ||
        this.isValidLeftCommand(cmd) ||
        this.isValidRightCommand(cmd) ||
        this.isValidReportCommand(cmd)
      ) {
        validCommands.push(cmd);
      }
    }

    this.setCommands(validCommands);
  }

  isValidPlaceCommand(cmd: string) {
    return /^PLACE\s+\d+,\d+,(NORTH|SOUTH|EAST|WEST)$/.test(cmd) && this.verifyPlaceCordinates(cmd);
  }

  verifyPlaceCordinates(cmd: string) {
    let hasValidPlaceCoordinates = false;
    const placeCmd = cmd.replace("PLACE", "").trim();
    const params = placeCmd.split(",");
    const xAxis = Number(params[0]);
    const yAxis = Number(params[1]);

    if (this.isValidLocationOnTable(xAxis, yAxis)) {
      hasValidPlaceCoordinates = true;
    }

    return hasValidPlaceCoordinates;
  }

  isValidLocationOnTable(x: number, y: number) {
    return this.table.isValidLocationOnTable(x, y);
  }

  isValidMoveCommand(cmd: string) {
    return /^MOVE$/.test(cmd);
  }

  isValidLeftCommand(cmd: string) {
    return /^LEFT$/.test(cmd);
  }

  isValidRightCommand(cmd: string) {
    return /^RIGHT$/.test(cmd);
  }

  isValidReportCommand(cmd: string) {
    return /^REPORT$/.test(cmd);
  }
}
