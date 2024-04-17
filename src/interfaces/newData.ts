import { UsersInterface } from "./users";

export interface newData
  extends Omit<UsersInterface, "createdAt" | "checkedInAt"> {
  id: number;
  name: string;
  email: string;
}
