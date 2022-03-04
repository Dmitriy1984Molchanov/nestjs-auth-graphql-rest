/* Tests for requests which require authentication */
import { user } from "./data";
import {
  cleanDB,
  closeTestApp,
  createTestApp,
  loginUserGql,
  registerUserGql,
} from "./helpers";
import { getUserProfileGql } from "./helpers";
const requests = [getUserProfileGql];

describe("Forbidden", () => {
  beforeAll(() => createTestApp());
  afterAll(() => closeTestApp());

  describe("without authentication", () => {
    test.each(requests)("%s", (request) =>
      request({ accessToken: "" })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].extensions.response).toEqual({
            statusCode: 401,
            message: "Unauthorized",
          });
        }),
    );
  });

  describe("after authentication with incorrect access token", () => {
    const accessToken = "incorrect";
    beforeAll(async () => {
      await registerUserGql(user);
      await loginUserGql(user);
    });

    afterAll(() => cleanDB());

    test.each(requests)("%s", (request) =>
      request({ accessToken })
        .expect(200)
        .expect((res) => {
          expect(res.body.errors[0].extensions.response).toEqual({
            statusCode: 401,
            message: "Unauthorized",
          });
        }),
    );
  });
});
