import { useState } from "react";

type ConfirmAction = () => void;

const useConfirm = () => {
  const [isConfirmVisible, setIsConfirmVisible] = useState<boolean>(false);
  const [confirmMessage, setConfirmMessage] = useState<string>('');
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);

  const showConfirm = (message: string, action: ConfirmAction) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setIsConfirmVisible(true);
  };

  const handleConfirm = () => {
    if (confirmAction) confirmAction();
    setIsConfirmVisible(false);
  };

  const handleCancel = () => {
    setIsConfirmVisible(false);
  };

  return {
    isConfirmVisible,
    confirmMessage,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};

export default useConfirm;
