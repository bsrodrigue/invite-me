import { UserAttributes } from "../models";

export type Session = {
  token?: string;
  profile?: UserAttributes;
};
