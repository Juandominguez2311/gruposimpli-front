import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Skeleton } from "@mui/material";
import axios from "axios";
import CustomInput from "../Custom/CustomImput";
import FormBTN from "../Custom/FormBTN";
import FooterComponent from "../FooterComponent/FooterComponent";
import NavbarComponent from "../NavBarComponent/NavBarComponent";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dealerId: "65fd9c4a138cde32210b97c7",
    productId: id
  });
  const [invalid, setInvalid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    dealerId: false,
  });
  const [emailValid, setEmailValid] = useState(false);

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/vehicle/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    getSingleProduct();
    window.scroll(0, 0);
  }, [id]);

  function isFormValid() {
    return (
      state.firstName.trim() !== "" &&
      state.lastName.trim() !== "" &&
      state.email.trim() !== "" &&
      state.phone.trim() !== ""
    );
  }

  function isEmailValid() {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const result = emailPattern.test(state.email);
    setEmailValid(result);
    return result;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    if (name === "email") {
      setEmailValid(isEmailValid());
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setInvalid({
      firstName: state.firstName.trim() === "",
      lastName: state.lastName.trim() === "",
      email: !emailValid,
      phone: state.phone.trim() === ""
    });

    if (!emailValid) {
      alert("The email is not valid.");
      return;
    }

    if (isFormValid()) {
      setLoading(true);
      axios.post("http://localhost:3000/api/lead/", state)
        .then(() => {
          setLoading(false);
          alert("Information request successfully submitted");
        })
        .catch(error => {
          console.error("Error submitting form:", error);
          setLoading(false);
        });
    }
  };
  const { img, name, price, model } = product;

  return (
    <Container>
      {loading ? (
        <Skeleton variant="rectangular" width={800} height={400} />
      ) : (
        <>
          <Grid container spacing={2} className="main-content">
            <Grid item xs={12} md={6}>
              <div className="product-image">
                <div className="detail-img-box">
                  <img src={img} alt="Product" className="detail-img" />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="product-details">
                <h1 className="text-5xl">Personalizá tu {name}</h1>
                <p className="text-xl">{model}</p>
                <h1 className="text-3xl">USD {price}</h1>
                <h3 className="text-lg">
                  Este valor se corresponde con la cotización y el medio de pago qué
                  estás solicitando.
                </h3>
                <h4 className="text-xl">$22.430.000 Precio de referencia</h4>
                <br />
              </div>
              <div className="flex justify-end">
                <div className="flex flex-col h-[900px]">
                  <form className="w-[600px] py-12 flex flex-col items-right gap-4">
                    <div className="flex flex-col gap-2 py-4 w-full">
                      <div className="flex flex-row gap-2 py-4 w-full">
                        <CustomInput
                          big
                          placeholder="First Name"
                          id="firstName"
                          type="text"
                          value={state.firstName}
                          name="firstName"
                          onChange={handleChange}
                          invalid={invalid.firstName} />
                        <CustomInput
                          big
                          placeholder="Last Name"
                          id="lastName"
                          type="text"
                          value={state.lastName}
                          name="lastName"
                          onChange={handleChange}
                          invalid={invalid.lastName} />
                      </div>
                      <CustomInput
                        big
                        placeholder="Email"
                        id="email"
                        type="text"
                        value={state.email}
                        name="email"
                        onChange={handleChange}
                        invalid={invalid.email} />
                      <CustomInput
                        big
                        placeholder="Phone"
                        id="phone"
                        type="number"
                        value={state.phone}
                        name="phone"
                        onChange={handleChange}
                        invalid={invalid.phone} />
                    </div>
                    <FormBTN label="Submit" onClick={onSubmit} disabled={loading} />
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;
