import fs from "fs";
import { env } from "@/common/utils/envConfig";

export class FileService {
  fileName: string;

  data: string[];

  constructor(file: string) {
    this.fileName = file;
    this.data = [];
  }

  getFile() {
    return `${process.cwd()}/${env.FILES_DIRECTORY}/${this.fileName}`;
  }

  setFile(file: string) {
    this.fileName = file;
  }

  setData(fileData: string[]) {
    this.data = fileData;
  }

  getData() {
    return this.data;
  }

  fileExists() {
    let fileExists = false;
    if (fs.existsSync(this.getFile())) {
      fileExists = true;
    }

    return fileExists;
  }

  async parse() {
    const fileData = fs.readFileSync(this.getFile(), "utf8").toString().split("\r\n");
    this.setData(fileData);
    return this.getData();
  }
}
