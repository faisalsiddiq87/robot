export const matchPattern = (pattern: string, cmd: string) => {
  const re = new RegExp(pattern);
  return re.test(cmd);
};
