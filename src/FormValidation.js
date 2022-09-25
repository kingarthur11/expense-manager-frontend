import React, { useState, useEffect } from "react";
import axios from "axios";

const FormValidation = ( ) => {
  const [values, setValues] = useState({
    comment: "",
    marchant: "",
    status: "",
    total: "",
    date_applied: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  // const handleModal = (value) => {
  //   setShow(value);
  // };

  const resetForm = () => {
    setValues({
      comment: "",
      marchant: "",
      status: "",
      total: "",
      date_applied: "",
    });
  };

  const addExpense = async (obj) => {
    try {
      setIsLoading(true);
      setShow(true)
      const response = await axios.post(
        `http://localhost:8000/api/expense-manager`,
        obj
      );
      const formData = await response.data;
      if (formData) {
        setIsLoading(false);
        setShow(false)
        // getData();
        resetForm();
      }
      return { formData };
    } catch (error) {
      const message = error.response;
      setIsLoading(false);
      setShow(false)
      resetForm();
      return { message };
    }
  };

  const handleChange = (e) => {
    e.persist();
    let name = e.target.name;
    let value = e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(values));
    console.log(values)
    setIsSubmitted(true);
  };

  // useEffect(() => {
  //   console.log(isSubmitted, errors)
  //   if (Object.keys(errors).length == 0 && isSubmitted) {
  //     console.log(values);
  //     addExpense(values);
  //   }
  // }, [errors]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    loading,
    show,
    isSubmitted
  };
};

export default FormValidation;

export const validate = (values) => {
  const errors = {};
  console.log(values);
  if (values.comment.length <= 3) {
    errors.comment = "comment";
  }
  if (values.status == "") {
    errors.status = "status";
  }
  if (values.total.length == "") {
    errors.total = "total";
  }
  if (values.marchant == "") {
    errors.marchant = "marchant";
  }
  if (values.date_applied == "") {
    errors.date_applied = "date_applied";
  }

  return errors;
};
