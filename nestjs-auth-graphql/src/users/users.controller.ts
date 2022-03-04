import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { CurrentUser } from "../auth/decorator/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  @ApiOkResponse({
    description: "Returns the logged-in user.",
    type: UserDto,
  })
  getProfile(@CurrentUser() user: User) {
    return new UserDto(user);
  }
}
