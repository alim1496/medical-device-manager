import React, { FC, useContext, useEffect, useState } from "react";
import DeviceContext from "../utils/DeviceContext";
import "../assets/styles/model.scss";
import { config } from "../utils/Api";
import axios from "axios";

interface Device {
  Id: number;
  TypeId: number;
  BrandId: string;
  Name: string;
  Comment: string;
  Description: string;
}

const AddDataModal: FC = () => {
  const [options, setOptions] = useState([]);
  const { addModalOpen, updateAddModalOpen } = useContext(DeviceContext);
  const [BrandId, setBrandId] = useState("");
  const [Name, setName] = useState("");
  const [TypeId, setTypeId] = useState(0);
  const [Comment, setComment] = useState("");
  const [Description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://163.47.115.230:30000/api/devicetype", config)
      .then(({ data }) => setOptions(data[0]))
      .catch((err) => console.log(err));
  }, [addModalOpen]);

  const postData = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const data = { Name, BrandId, TypeId, Comment, Description };
    console.log(data);
    axios
      .post("http://163.47.115.230:30000/api/devicemodel", data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    updateAddModalOpen(false);
  };

  return (
    <div className={`main-modal ${addModalOpen ? "show" : "hide"}`}>
      <a
        aria-label="Close"
        className="modal-overlay"
        href="#"
        onClick={closeModal}
      />
      <div className="model-modal-container data-modal">
        <h3>Add a model</h3>

        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              id="name"
              placeholder="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              name="brand"
              id="brand"
              placeholder="brand"
              type="text"
              onChange={(e) => setBrandId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="select-type"
              onChange={(e) => setTypeId(parseInt(e.target.value))}
            >
              {options &&
                options.map(({ Id, Description }, index) => (
                  <>
                    <option>Choose a type</option>
                    <option key={index} value={Id}>
                      {Description}
                    </option>
                  </>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <input
              name="comment"
              id="comment"
              placeholder="comment"
              type="text"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              id="description"
              placeholder="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="btn-holder">
            <span onClick={closeModal}>Cancel</span>
            <button type="submit" className="add-btn" onClick={postData}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDataModal;
