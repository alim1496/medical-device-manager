import { createContext } from "react";

export interface DeviceProps {
  isModalOpen: boolean;
  brand: string;
  model: string;
  addModalOpen: boolean;
  updateModalOpen: Function;
  updateAddModalOpen: Function;
}

const DeviceContext = createContext<DeviceProps>({
  isModalOpen: false,
  addModalOpen: false,
  brand: "",
  model: "",
  updateModalOpen: () => {},
  updateAddModalOpen: () => {},
});

export const DeviceContextConsumer = DeviceContext.Consumer;
export const DeviceContextProvider = DeviceContext.Provider;
export default DeviceContext;
