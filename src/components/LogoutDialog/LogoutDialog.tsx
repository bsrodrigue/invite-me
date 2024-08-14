import { useState } from 'react';
import { Text } from 'react-native'
import { useSession } from '../../providers';

interface LogoutDialogProps {
  isVisible: boolean;
  onDismissDialog: () => void;
}

export default function LogoutDialog({ isVisible, onDismissDialog }: LogoutDialogProps) {
  const [_state, _setState] = useState(null);
  const { stopSession } = useSession();

  return (
    <></>
  )

}
