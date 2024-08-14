import { ReactNode } from "react";
import { ExpandingView } from "../ExpandingView";
import { WrapView } from "../WrapView";

type AuthFormProps = {
  children?: ReactNode;
};

export default function AuthForm({ children }: AuthFormProps) {

  return (
    <ExpandingView>
      <WrapView>
        {children}
      </WrapView>
    </ExpandingView>
  )
}
