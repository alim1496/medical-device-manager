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
  const { isModalOpen, brand, model, updateModalOpen } = useContext(
    DeviceContext
  );
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<DataItem[]>([]);

  useEffect(() => {
    if (isModalOpen && brand !== "" && model !== "") {
      setLoading(true);
      axios
        .get(
          `http://163.47.115.230:30000/api/overview/modeldata/${brand}/${model}`,
          config
        )
        .then(({ data }) => {
          setLoading(false);
          setItems(data);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setItems([]);
    updateModalOpen(false);
  };

  return (
    <div className={`main-modal ${isModalOpen ? "show" : "hide"}`}>
      <a
        aria-label="Close"
        className="modal-overlay"
        href="#"
        onClick={closeModal}
      />
      <div className={`model-modal-container`}>
        <p>
          <b>{model} Data List</b>
        </p>
        {loading && <div className="main-loader" />}
        {!loading && items && items.length === 0 && (
          <p>This model does not have any data</p>
        )}
        {!loading &&
          items &&
          items.map((item, index) => (
            <>
              <div key={index} className="single-item">
                <span>
                  <b>Data Type&nbsp;</b>
                  {item.DataType}
                </span>
                <span>
                  <b>Name&nbsp;</b>
                  {item.Name}
                </span>
                <span>
                  <b>Display Name&nbsp;</b>
                  {item.DisplayName}
                </span>
                <span>
                  <b>Description&nbsp;</b>
                  {item.Description}
                </span>
                <span>
                  <b>Protocol Order&nbsp;</b>
                  {item.ProtocolOrder !== null
                    ? item.ProtocolOrder
                    : "Not Found"}
                </span>
              </div>
              <hr />
            </>
          ))}
        {!loading && (
          <button type="button" onClick={closeModal} className="close-btn">
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default ModelDataModal;
