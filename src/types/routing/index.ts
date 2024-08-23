import { UserEvent } from "../models";

export type RootStackParamList = {
  Home: any;
  Welcome: any;
  Onboarding: any;
  Login: any;
  Register: any;
  ForgotPassword: any;
  SetupAccount: any;
  Discover: any;
  Main: any;
  Search: any;
  Settings: any;
  ChangeEmail: any;
  ChangePassword: any;
  ViewAccount: any;
  Success: any;
  RegisterSuccess: {
    token: string;
  };
  Accounts: any;
  Budgets: any;
  Categories: any;
  Transactions: any;
  Events: any;
  EventDashboard: {
    event: UserEvent;
  };
};
