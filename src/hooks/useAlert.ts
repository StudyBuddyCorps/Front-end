import { useState } from "react";

const useAlert = () => {
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  return {
    isAlertVisible,
    alertMessage,
    showAlert,
    hideAlert,
  };
};

export default useAlert;