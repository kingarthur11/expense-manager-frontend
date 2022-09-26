import React, { useState, useEffect } from "react";
import "./App.css";
import ModalComponent from "./modal";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import FormValidation, { validate } from "./FormValidation";

function Dashboard() {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState([]);
  const [paramsValue, setParamsValue] = useState({
    marchant: "",
    max: "",
    min: "",
    from: "",
    to: "",
  });
  const [newVal, setNewValue] = useState(false);
  const [inProgress, setInprogress] = useState(false);
  const [reinburse, setReinburse] = useState(false);

  const getData = async () => {
    let max, min;
    // let status = paramsValue.new_val ? paramsValue.new_val : paramsValue.in_progress ? paramsValue.in_progress : paramsValue.reinburse ? paramsValue.reinburse : ""
    if (isNaN(Number(paramsValue.max))) {
      max = 0;
    } else {
      max = paramsValue.max;
    }
    if (isNaN(Number(paramsValue.min))) {
      min = 0;
    } else {
      min = paramsValue.min;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/api/expense-manager?marchant=${
          paramsValue.marchant
        }&max=${max}&min=${min}&from=${paramsValue.from}&to=${
          paramsValue.to
        }&new_val=${paramsValue.new_val ? "new_val" : ""}&in_progress=${
          paramsValue.in_progress ? "in_progress" : ""
        }&reinburse=${paramsValue.reinburse ? "reinburse" : ""}`
      );
      const formData = await response.data;
      setFormData(formData);
      return { formData };
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;

    setParamsValue({
      ...paramsValue,
      [name]: value,
    });
  };

  const dateFormatter = (props) => {
    const newDate = new Date(props);
    return newDate.toDateString();
  };

  const handleModal = (value) => {
    setShow(value);
  };

  useEffect(() => {
    getData();
  }, [paramsValue]);

  useEffect(() => {
    let resultParams = {
      paramsValue,
    };
    console.log(resultParams);
  }, [paramsValue]);

  return (
    <div>
      <div className="nav-bar">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4>Expense Manager</h4>
            <div>
              <button className="py-2 px-4 bttn-info">Info</button>
              <button className="py-2 px-4">
              <Link  className="style-link" to={`login`}>Logout</Link></button>
            </div>
          </div>
        </div>
      </div>
      <div className="body-content">
        <div className="login-content pt-4">
          <div className="d-flex align-items-center justify-content-between">
            <p>Filter Expense</p>
            <p className="clear">Clear Filter</p>
          </div>
          <hr />
          <div>
            <div className="my-4">
              <label>From</label>
              <div className="position-relative">
                <input
                  onChange={handleChange}
                  name="from"
                  value={paramsValue.from}
                  className="w-100"
                  type="date"
                  placeholder=""
                />
                {/* <i className="date-arrow fa-regular fa-calendar-days position-absolute"></i> */}
              </div>
            </div>
            <div className="my-4">
              <label>To</label>
              <div className="position-relative">
                <input
                  onChange={handleChange}
                  name="to"
                  value={paramsValue.to}
                  className="w-100"
                  type="date"
                  placeholder=""
                />
                {/* <i className="date-arrow fa-regular fa-calendar-days position-absolute"></i> */}
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className=" w-100">
                <label>Min</label>
                <div className="position-relative">
                  <input
                    name="min"
                    value={paramsValue.min}
                    className="w-100 dollar-input"
                    placeholder="0.00"
                    type="number"
                    onChange={handleChange}
                  />
                  <p className="position-absolute dollar-icon">$</p>
                </div>
              </div>
              <div className="divider w-30"></div>
              <div className=" w-100">
                <label>Max</label>
                <div className="position-relative">
                  <input
                    onChange={handleChange}
                    name="max"
                    value={paramsValue.max}
                    className="w-100 dollar-input"
                    placeholder="0.00"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="my-4">
              <label>Merchant</label>
              <div className="selectdiv">
                <select
                  className="select-field w-100"
                  onChange={handleChange}
                  value={paramsValue.marchant}
                  name="marchant">
                  <option value=""></option>
                  <option value="taxi">Taxi</option>
                  <option value="rental_car">Rental Cars</option>
                  <option value="shuttle">Shuttle</option>
                  <option value="hotel">Hotel</option>
                </select>
                {/* <i className="select-arrow fa-sharp fa-solid fa-chevron-down position-absolute"></i> */}
              </div>
            </div>
            <div className="style-checkmark">
              <h4>Status</h4>
              <div className="d-flex align-items-center justify-content-start">
                <label class="container">
                  <input
                    type="checkbox"
                    onChange={(e) => setNewValue(!newVal)}
                  />
                  <span class="checkmark"></span>
                  New
                </label>
                <label class="container">
                  Reinburse
                  <input
                    type="checkbox"
                    onChange={(e) => setReinburse(!reinburse)}
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <label class="container">
                In progress
                <input
                  type="checkbox"
                  onChange={(e) => setInprogress(!inProgress)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div className="table-content position-relative">
          <div className="style-round">
            <div
              onClick={() => setShow(true)}
              className="round-plus position-absolute d-flex align-items-center justify-content-center">
              <i className="fa-solid fa-plus"></i>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    Date <i className="fa-solid fa-caret-down"></i>
                  </th>
                  <th scope="col">
                    <div className="d-flex align-items-center justify-content-center">
                      Merchant
                      <div className="icon">
                        <i className="fa-solid fa-caret-up d-block p-0 m-0"></i>
                        <i className="fa-solid fa-caret-down d-block p-0 m-0"></i>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex align-items-center justify-content-center">
                      Total
                      <div className="icon">
                        <i className="fa-solid fa-caret-up  d-block p-0 m-0"></i>
                        <i className="fa-solid fa-caret-down  d-block p-0 m-0"></i>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex align-items-center justify-content-center">
                      Status
                      <div className="icon">
                        <i className="fa-solid fa-caret-up  d-block p-0 m-0"></i>
                        <i className="fa-solid fa-caret-down  d-block p-0 m-0"></i>
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    <div className="d-flex align-items-center justify-content-center">
                      Comment
                      <div className="icon">
                        <i className="fa-solid fa-caret-up  d-block p-0 m-0"></i>
                        <i className="fa-solid fa-caret-down  d-block p-0 m-0"></i>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData &&
                  formData.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>{dateFormatter(item.created_at)}</td>
                        <td>
                          {item.marchant == "taxi"
                            ? "Taxi"
                            : item.marchant == "rental_car"
                            ? "Rental Cars"
                            : item.marchant == "shuttle"
                            ? "Shuttle"
                            : "Hotel"}
                        </td>
                        <td>{item.total}</td>
                        <td>
                          {" "}
                          {item.status == "new"
                            ? "New"
                            : item.marchant == "in_progress"
                            ? "In Progress"
                            : "Reinburse"}
                        </td>
                        <td>{item.comment}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="reimburse pt-4">
          <div>
            <p>To be reimburse</p>
            <hr />
          </div>
        </div>
      </div>
      <ModalComponent
        show={show}
        size={"lg"}
        handleClose={() => setShow(false)}>
        <InputForm handleModal={handleModal} getData={getData} />
      </ModalComponent>
    </div>
  );
}

export default Dashboard;

const InputForm = ({ getData, handleModal }) => {
  const { errors, values, handleChange, handleSubmit, isSubmitted } =
    FormValidation(validate);

  const [imgURL, setImgURL] = useState("");
  const [loading, setIsLoading] = useState(false);

  const addExpense = async (obj) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/expense-manager`,
        obj
      );
      const formData = await response.data;
      if (formData) {
        setIsLoading(false);
        handleModal(false);
        getData();
        // resetForm();
      }
      return { formData };
    } catch (error) {
      const message = error.response;
      setIsLoading(false);
      handleModal(false);
      getData();
      // resetForm();
      return { message };
    }
  };

  useEffect(() => {
    console.log(isSubmitted, errors);
    if (Object.keys(errors).length == 0 && isSubmitted) {
      console.log(values);
      addExpense(values);
    }
  }, [errors]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImgURL(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-side">
            <h3>Add Manager</h3>
            <div className="mt-4">
              <div className="d-flex justify-content-start align-items-center">
                <label>Merchant</label>
                {errors && errors.marchant ? (
                  <div className="form-circle form-circle-red"></div>
                ) : (
                  <div className="form-circle form-circle-blue"></div>
                )}
              </div>
              <div className="selectdiv">
                <select
                  className="select-field w-100"
                  onChange={handleChange}
                  value={values.marchant}
                  name="marchant">
                  <option value=""></option>
                  <option value="taxi">Taxi</option>
                  <option value="rental_car">Rental Cars</option>
                  <option value="shuttle">Shuttle</option>
                  <option value="hotel">Hotel</option>
                </select>
              </div>
              <div className="my-3">
                <div className="d-flex justify-content-start align-items-center">
                  <label>Total</label>
                  {errors && errors.total ? (
                    <div className="form-circle form-circle-red"></div>
                  ) : (
                    <div className="form-circle form-circle-blue"></div>
                  )}
                </div>
                <div className="position-relative">
                  <input
                    name="total"
                    value={values.total}
                    className="w-100 dollar-input"
                    placeholder="0.00"
                    type="number"
                    onChange={handleChange}
                  />
                  <p className="position-absolute dollar-icon">$</p>
                </div>
              </div>
              <div className="my-3">
                <div className="d-flex justify-content-start align-items-center">
                  <label>Date</label>
                  {errors && errors.date_applied ? (
                    <div className="form-circle form-circle-red"></div>
                  ) : (
                    <div className="form-circle form-circle-blue"></div>
                  )}
                </div>
                <div className="position-relative">
                  <input
                    name="date_applied"
                    className="w-100"
                    value={values.date_applied}
                    type="date"
                    placeholder=""
                    onChange={handleChange}
                    // {...register("date_applied", { required: true })}
                  />
                </div>
              </div>
              <div className="my-3">
                <div className="d-flex justify-content-start align-items-center">
                  <label>Status</label>
                  {errors && errors.status ? (
                    <div className="form-circle form-circle-red"></div>
                  ) : (
                    <div className="form-circle form-circle-blue"></div>
                  )}
                </div>
                <div className="position-relative">
                  <select
                    className="select-field w-100"
                    onChange={handleChange}
                    value={values.status}
                    name="status">
                    <option value=""></option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="reinburse">Reinburse</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-start align-items-center">
                  <label>Comment</label>
                  {errors && errors.comment ? (
                    <div className="form-circle form-circle-red"></div>
                  ) : (
                    <div className="form-circle form-circle-blue"></div>
                  )}
                </div>

                <div className="position-relative">
                  <textarea
                    name="comment"
                    onChange={handleChange}
                    className="w-100"
                    value={values.comment}
                    type="text"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="file-side">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <input
                  onChange={onImageChange}
                  type="file"
                  id="select-image"
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <label htmlFor="select-image">
                  <div className="file-button" variant="contained">
                    Select receipt
                  </div>
                </label>
              </div>

              <div className="file-text">
                <p>
                  <span>
                    <i className="fa-sharp fa-solid fa-arrow-up-from-bracket pr-4"></i>
                  </span>
                  Drop receipt here...
                </p>
              </div>
            </div>
            <img className="file-image" src={imgURL} alt="" />
          </div>
        </div>
        <div className="pt-3 d-flex justify-content-between align-items-center ">
          <div>
            {loading ? (
              <button className="opacity-50 loading-button">Loading..</button>
            ) : (
              <button type="submit" className="save-button">
                Save
              </button>
            )}

            <button
              onClick={() => handleModal(false)}
              className="cancel-button">
              Cancel
            </button>
          </div>
          <button onClick={() => handleModal(false)} className="delete-button">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
