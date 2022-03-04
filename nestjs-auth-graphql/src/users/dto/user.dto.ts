import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { User } from "../entities/user.entity";

@Exclude()
export class UserDto {
  constructor(partial: Pick<User, "id" | "email" | "fullname">) {
    const { id, email, fullname } = partial;
    Object.assign(this, { id, email, fullname });
  }

  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  readonly fullname: string;
}
