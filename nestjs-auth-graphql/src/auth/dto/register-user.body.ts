import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterUserBody {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @MinLength(5)
  @IsNotEmpty()
  fullname: string;
}
