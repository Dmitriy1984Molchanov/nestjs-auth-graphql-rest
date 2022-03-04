import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserObject {
  @Field(() => Int)
  readonly id: number;

  @Field()
  readonly email: string;

  @Field()
  readonly fullname: string;
}
