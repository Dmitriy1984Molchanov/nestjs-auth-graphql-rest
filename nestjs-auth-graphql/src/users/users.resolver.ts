import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { GqlCurrentUser } from "../auth/decorator/gql-current-user.decorator";
import { GqlJwtAuthGuard } from "../auth/guards/gql-jwt-auth.guard";
import { UserObject } from "./dto/user.object";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => UserObject)
  me(@GqlCurrentUser() user: User) {
    return user;
  }
}
