import { ReactNode } from 'react';
import { ExpandingView } from '../ExpandingView';

interface CenteringViewProps {
  children: ReactNode;
  backgroundColor?: string;
}

export default function CenteringView({ children, backgroundColor = "initial" }: CenteringViewProps) {

  return (
    <ExpandingView style={{ justifyContent: "center", alignItems: "center", backgroundColor, }}>
      {children}
    </ExpandingView>
  );
}
