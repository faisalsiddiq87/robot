export class MovementService {
  readonly EAST = "EAST";

  readonly WEST = "WEST";

  readonly NORTH = "NORTH";

  readonly SOUTH = "SOUTH";

  commands: string[];

  table: any;

  points = { x: 0, y: 0, direction: "" };

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

  setNewLocationAxis(x: number, y: number) {
    this.points.x = x;

    this.points.y = y;
  }

  setDirection(direction: any) {
    this.points.direction = direction;
  }

  getCurrentLocation() {
    return this.points;
  }

  getDirections() {
    return [this.EAST, this.NORTH, this.WEST, this.SOUTH];
  }

  start() {
    const output = [];
    const allCommands = this.getCommands();
    if (allCommands.length) {
      for (const cmd of allCommands) {
        switch (cmd) {
          case "MOVE":
            this.move();
            break;
          case "LEFT":
            this.left();
            break;
          case "RIGHT":
            this.right();
            break;
          case "REPORT":
            if (this.report()) {
              output.push(this.report());
            }
            break;
          default:
            this.place(cmd);
            break;
        }
      }
    } else {
      output.push("No Commands were provided for Robot Movement");
    }

    return output.length ? output : ["No Report command given"];
  }

  place(cmd: string) {
    const parsedCommand = this.parsePlaceCommand(cmd);

    if (this.isAllowedToMove(parsedCommand.x, parsedCommand.y)) {
      this.setNewLocationAxis(parsedCommand.x, parsedCommand.y);
      this.setDirection(parsedCommand.direction);
    }
  }

  move() {
    const currentLocation = this.getCurrentLocation();
    let currentXAxis = currentLocation.x;
    let currentYAxis = currentLocation.y;
    const currentDirection = currentLocation.direction;

    if (currentDirection === "EAST") {
      currentXAxis += 1;
    } else if (currentDirection === "WEST") {
      currentXAxis -= 1;
    } else if (currentDirection === "NORTH") {
      currentYAxis += 1;
    } else {
      currentYAxis -= 1;
    }

    if (this.isAllowedToMove(currentXAxis, currentYAxis)) {
      this.setNewLocationAxis(currentXAxis, currentYAxis);
    }
  }

  left() {
    const currentLocation = this.getCurrentLocation();
    const currentDirection = currentLocation.direction;
    const directions = this.getDirections();
    const currentDirectionKey = directions.lastIndexOf(currentDirection);
    let newDirection = "";

    if (currentDirectionKey === 3) {
      newDirection = directions[0];
    } else {
      newDirection = directions[currentDirectionKey + 1];
    }

    this.setDirection(newDirection);
  }

  right() {
    const currentLocation = this.getCurrentLocation();
    const currentDirection = currentLocation.direction;
    const directions = this.getDirections();
    const currentDirectionKey = directions.lastIndexOf(currentDirection);
    let newDirection = "";

    if (currentDirectionKey === 0) {
      newDirection = directions[3];
    } else {
      newDirection = directions[currentDirectionKey - 1];
    }

    this.setDirection(newDirection);
  }

  report() {
    const currentLocation = this.getCurrentLocation();
    return currentLocation.direction ? `${currentLocation.x},${currentLocation.y},${currentLocation.direction}` : "";
  }

  isAllowedToMove(x: number, y: number) {
    return this.table.isValidLocationOnTable(x, y);
  }

  parsePlaceCommand(cmd: string) {
    const placeCmd = cmd.replace("PLACE", "").trim();
    const params = placeCmd.split(",");
    const xAxis = Number(params[0]);
    const yAxis = Number(params[1]);
    return { x: xAxis, y: yAxis, direction: params[2] };
  }
}
