import { FileService } from "@/api/file/fileService";

describe("fileService", () => {
  let fileServiceInstance: FileService;
  const validfileName = "validCommands.txt";
  const inValidFileName = "wrongFile.txt";
  const emptyCommandsFileName = "cmds.txt";

  beforeEach(() => {
    fileServiceInstance = new FileService(validfileName);
  });

  describe("fileServiceStart", () => {
    it("should return true for a valid file which exists on server", async () => {
      const result = fileServiceInstance.fileExists();
      expect(result).toEqual(true);
    });

    it("should return false for a file which does not exist on server", async () => {
      fileServiceInstance.setFile(inValidFileName);
      const result = fileServiceInstance.fileExists();
      expect(result).toEqual(false);
    });

    it("should expect data from a valid file having data", async () => {
      const result = await fileServiceInstance.parse();
      expect(result).toHaveLength(10);
    });

    it("should expect no data from a valid file with no data", async () => {
      fileServiceInstance.setFile(emptyCommandsFileName);
      const result = await fileServiceInstance.parse();
      expect(result).toHaveLength(1);
    });
  });
});
