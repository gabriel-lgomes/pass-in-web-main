import { UsersInterface } from "./users";

export interface newData
  extends Omit<UsersInterface, "id" | "createdAt" | "checkedInAt"> {
  name: string;
  email: string;
}
