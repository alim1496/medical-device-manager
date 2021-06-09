import { createContext } from "react";

export interface DeviceProps {
  isModalOpen: boolean;
  brand: string;
  model: string;
  updateModalOpen: Function;
}

const DeviceContext = createContext<DeviceProps>({
  isModalOpen: false,
  brand: "",
  model: "",
  updateModalOpen: () => {},
});

export const DeviceContextConsumer = DeviceContext.Consumer;
export const DeviceContextProvider = DeviceContext.Provider;
export default DeviceContext;
