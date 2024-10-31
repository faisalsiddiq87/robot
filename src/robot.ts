import process from "node:process";
import { robotService } from "@/api/robot/robotService";

async function start(args: any) {
  if (args[2] !== undefined) {
    const result = await robotService.start(args[2]);
    parseAndLogResponse(result);
  } else {
    console.log("FileName is not provided");
  }
}

function parseAndLogResponse(response: any) {
  if (response.success === true) {
    console.log(response.responseObject.join("\n"));
  } else {
    console.log(response.message);
  }
}

const args = process.argv;

const result = start(args);
