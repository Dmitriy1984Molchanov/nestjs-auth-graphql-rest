import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { UsersModule } from "./users.module";
import { UsersResolver } from "./users.resolver";

describe("UsersResolver", () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UsersModule],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
