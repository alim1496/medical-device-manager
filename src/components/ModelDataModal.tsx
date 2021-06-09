import React, { FC, useContext, useEffect, useState } from "react";
import DeviceContext from "../utils/DeviceContext";
import "../assets/styles/model.scss";
import { config } from "../utils/Api";
import axios from "axios";

interface DataItem {
  Id: number;
  DataType: string;
  Brand: string;
  Model: string;
  Name: string;
  DisplayName: string;
  Description: string;
  ProtocolOrder: number;
}

const ModelDataModal: FC = () => {
  const { isModalOpen, brand, model } = useContext(DeviceContext);
  const [items, setItems] = useState<DataItem[]>([]);

  useEffect(() => {
    if (isModalOpen && brand !== "" && model !== "") {
      axios
        .get(
          `http://163.47.115.230:30000/api/overview/modeldata/${brand}/${model}`,
          config
        )
        .then(({ data }) => {
          setItems(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isModalOpen]);

  return (
    <div className={`model-modal-container ${isModalOpen ? "show" : "hide"}`}>
      {items &&
        items.map((item, index) => (
          <div key={index}>
            <span>{item.DataType}</span>
          </div>
        ))}
    </div>
  );
};

export default ModelDataModal;
