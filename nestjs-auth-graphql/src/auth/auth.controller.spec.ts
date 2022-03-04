import { createTestingModule } from "test/helpers";
import { AuthController } from "./auth.controller";

describe.only("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module = await createTestingModule();
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
