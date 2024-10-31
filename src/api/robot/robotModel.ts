import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Robot = z.infer<typeof RobotSchema>;

export const RobotSchema = z.object({
  fileName: z.string(),
});

export const GetRobotSchema = z.object({
  params: z.object({ fileName: commonValidations.fileName }),
});
