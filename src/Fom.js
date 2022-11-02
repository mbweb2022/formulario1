import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Formulario.css";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
  Alert,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { get } from "./services/RestExecutor";
import i18next from "i18next";
import PageNotFound from "./components/PageNotFound";

export const Form = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState();
  const [todaysDate, setTodaysDate] = useState();
  const [data, setData] = useState([
    {
      identification: "1",
      firstName: "Jeremy",
      secondName: "Ismael",
      lastName: "León",
      secondLastName: "Garzón",
      birthday: "2001-03-21",
      email: "jeremisma2001@hotmail.com",
      phoneNumber: "0999999999",
      relationShip: "Familiar",
      city: "Quito",
      direction: "La carolina",
      gender: "F",
    },
    {
      identification: "2",
      firstName: "Darwin",
      secondName: "David",
      lastName: "Cacuango",
      secondLastName: "Criollo",
      birthday: "2002-02-25",
      email: "cacuangodarwin1999@gmail.com",
      phoneNumber: "0999999999",
      relationShip: "Esposo / Esposa",
      city: "Quito",
      direction: "La carolina",
      gender: "M",
    },
  ]);
  const [gender] = useState([
    {
      key: "M",
      value: "Male",
    },
    {
      key: "F",
      value: "Female",
    },
  ]);
  const [relationShipData] = useState([
    {
      key: "Father_Mother",
      value: "Padre / Madre",
    },
    {
      key: "Husband_Wife",
      value: "Esposo / Esposa",
    },
    {
      key: "Daughter_Son",
      value: "Hijo / Hija",
    },
    {
      key: "Relative",
      value: "Familiar",
    },
  ]);
  const [activePolice, isActivePolice] = useState(false);
  const [messageError, setMessageError] = useState();
  const [form, setForm] = useState({
    identification: "",
    firstName: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    birthday: "",
    email: "",
    relationShip: "",
    phoneNumber: "",
    direction: "",
    city: "",
    gender: "",
  });
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mbUser, setMbUser] = useState({});
  const [noDuplicated, setNoDuplicated] = useState(false);
  useEffect(() => {
    var date = new Date();
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var todaysDate = day + "/" + month + "/" + year;
    var hoy = year + "-" + month + "-" + day;
    console.log(hoy);
    setDate(todaysDate);
    callInformation(userId);

    setTodaysDate(hoy);
  }, []);

  let handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  let mostrarModalInsertar = () => {
    var longitud = data.length + 1;
    if (longitud <= 3) {
      setModalInsertar(true);
    } else {
      window.alert(t("maximumRegisters"));
    }
  };
  let ocultarModalInsertarr = () => {
    setModalInsertar(false);
  };
  let mostrarModalEditar = (e) => {
    setForm(e);
    setModalEditar(true);
  };
  let ocultarModalEditar = () => {
    setModalEditar(false);
  };
  let insertar = () => {
    var valorNuevo = {
      ...form,
    };
    const keysForm = Object.keys(valorNuevo);
    keysForm.forEach((element) => {
      if (!valorNuevo[element] || valorNuevo[element].length <= 0) {
        setIsValid(false);
      }
    });
    data.forEach((element) => {
      if (element.identification === valorNuevo.identification) {
        setNoDuplicated(false);
      }
    });
    if (isValid && noDuplicated) {
      let lista = data;
      lista.push(valorNuevo);
      //   setData(lista);
      setModalInsertar(false);
      setForm({
        id: "",
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        birthday: "",
        email: "",
        phoneNumber: "",
        relationShip: "",
        gender: "",
      });
    } else if (!noDuplicated) {
      window.confirm(t("registred"));
    }
  };
  let editar = (dato) => {
    const keysForm = Object.keys(dato);
    keysForm.forEach((element) => {
      if (!dato[element] || dato[element].length <= 0) {
        setIsValid(false);
      }
    });
    if (!isValid) {
      window.confirm(`Ingrese todos los campos requeridos`);
      return;
    }
    setModalEditar(false);
    let posicion = 0;
    let lista = data;
    lista.map((registro) => {
      if (dato.identification === registro.identification) {
        lista[posicion].firstName = dato.firstName;
        lista[posicion].secondName = dato.secondName;
        lista[posicion].lastName = dato.lastName;
        lista[posicion].secondLastName = dato.secondLastName;
        lista[posicion].birthday = dato.birthday;
        lista[posicion].email = dato.email;
        lista[posicion].phoneNumber = dato.phoneNumber;
        lista[posicion].relationShip = dato.relationShip;
        lista[posicion].city = dato.city;
        lista[posicion].direction = dato.direction;
        lista[posicion].gender = dato.gender;
      }
      posicion++;
      return lista;
    });
    setData(lista);
    setModalEditar(false);
    setForm({
      id: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      birthday: "",
      email: "",
      phoneNumber: "",
      relationShip: "",
      gender: "",
    });
  };

  let eliminar = (dato) => {
    var opcion = window.confirm(
      `¿Estás seguro de eliminar el siguiente registro?\nId: ${dato.id}\nPersonaje: ${dato.personaje}\nAnime: ${dato.anime}`
    );
    if (opcion) {
      var contador = 0;
      var lista = data;
      console.log(lista);
      lista.map((registro) => {
        if (registro.id === dato.id) {
          lista.splice(contador, 1);
        }
        contador++;
        return lista;
      });
      setData(lista);
    }
  };

  let useQuery = () => new URLSearchParams(window.location.search);
  let query = useQuery();
  let userId = query.get("mbt");

  let callInformation = async (mbt) => {
    console.log("ENTRA A RESPONSE con mbt", mbt);
    await get(userId, setMbUser, isActivePolice, setMessageError);
  };

  return (
    <>
      {!messageError ? (
        <Container>
          <Container>
            <div className="card card-4">
              <div className="card-heading"></div>
              <div className="headerInfo">
                <div className="headerInfoContent">
                  <Alert color="info"> Hoy es {date}</Alert>
                  <label className="headerInfoText">{t("info")}</label>
                </div>
              </div>
              <div className="card-body">
                <h2 className="title">{t("healthInsurance")}</h2>
                <form>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("identification")}</label>
                        <input
                          pattern="[0-9]{10}"
                          className="form-control"
                          type="text"
                          readOnly={modalEditar === true ? true : false}
                          required
                          maxLength={10}
                          name="identification"
                          onChange={handleChange}
                          value={form.identification}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("firstName")}</label>
                        <input
                          className="form-control"
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("secondName")}</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={form.secondName}
                          name="secondName"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("lastName")}</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          value={form.lastName}
                          name="lastName"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("secondLastName")}</label>
                        <input
                          className="form-control"
                          required
                          value={form.secondLastName}
                          type="text"
                          name="secondLastName"
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("birthdate")}</label>
                        <div className="input-group-icon">
                          <input
                            className="form-control"
                            value={form.birthday}
                            type="date"
                            required
                            name="birthday"
                            min="1920-01-01"
                            max={todaysDate}
                            onChange={handleChange}
                          />
                          <i className="zmdi zmdi-calendar-note input-icon js-btn-calendar"></i>
                        </div>
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("gender")}</label>
                        <tr>
                          <label className="radio-container">
                            {gender[1].value}
                            <input
                              type="radio"
                              name="gender"
                              required
                              value={form.gender}
                              id={form.gender}
                              checked={form.gender === "F" ? true : false}
                              onClick={() => {
                                setForm({ ...form, gender: gender[1].key });
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </tr>
                        <tr>
                          <label className="radio-container">
                            {gender[0].value}
                            <input
                              type="radio"
                              name="gender"
                              required
                              value={form.gender}
                              id={form.gender}
                              checked={form.gender === "M" ? true : false}
                              onClick={() => {
                                console.info("M");
                                setForm({ ...form, gender: gender[0].key });
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </tr>
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("email")}</label>
                        <input
                          className="form-control"
                          type="email"
                          required
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("direction")}</label>
                        <input
                          className="form-control"
                          type="text"
                          name="direction"
                          required
                          value={form.direction}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("relationShip")}</label>

                        <select
                          className="form-select"
                          required
                          aria-label="Default select example"
                          onChange={(e) => {
                            const item = relationShipData.filter(
                              (item) => item.key === e.target.value
                            );
                            if (item.length > 0) {
                              setForm({ ...form, relationShip: item[0].value });
                            }
                          }}
                        >
                          {modalEditar === false && (
                            <option value="" selected>
                              Selecciona el Parentesco
                            </option>
                          )}

                          {modalEditar === true && (
                            <option selected>{form.relationShip}</option>
                          )}
                          {relationShipData &&
                            relationShipData.map((item, index) => {
                              return (
                                <option value={item.key}>{item.value}</option>
                              );
                            })}
                        </select>
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("city")}</label>
                        <input
                          className="form-control"
                          type="text"
                          required
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="p-t-15 ">
                    {modalEditar === false ? (
                      <button
                        className="button button2"
                        onClick={(event) => {
                          insertar()
                          event.stopPropagation();
                          event.preventDefault()
                          console.log("NO HACE LA DIFERENCIA")
                          }}
                      >
                        Insertar uwu
                      </button>
                    ) : (
                      <div
                        style={{
                          width: "350px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          className="button button1"
                          onClick={() => {
                            editar(form);
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          className="button button3"
                          onClick={() => {
                            setModalEditar(false);
                            setForm({
                              identification: "",
                              firstName: "",
                              secondName: "",
                              lastName: "",
                              secondLastName: "",
                              birthday: "",
                              email: "",
                              phoneNumber: "",
                              relationShip: "",
                              direction: "",
                              city: "",
                              gender: "",
                            });
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                    <Alert color="warning">
                      Revisa los que los datos estén correctos sobre tus
                      familiares registrados al seguro de vida proporcionado por
                      MoneyBlinks, una vez que comprobaste que los datos están
                      correctos dale a "Registrar beneficiarios".
                    </Alert>
                    <button className="button button1">
                      Registrar beneficiarios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Container>
          <br />
          {/* <Button color="success" onClick={() => this.mostrarModalInsertar()}>
          Insertar nuevo personaje
        </Button> */}
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Identification</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Fecha de nacimiento</th>
                <th>Genero</th>
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Relationship</th>
                <th>Direction</th>
                <th>City</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((elemento) => (
                <tr>
                  <td>{elemento.identification}</td>
                  <td>{elemento.firstName}</td>
                  <td>{elemento.secondName}</td>
                  <td>{elemento.lastName}</td>
                  <td>{elemento.secondLastName}</td>
                  <td>{elemento.birthday}</td>
                  <td>{elemento.gender}</td>
                  <td>{elemento.email}</td>
                  <td>{elemento.phoneNumber}</td>
                  <td>{elemento.relationShip}</td>
                  <td>{elemento.direction}</td>
                  <td>{elemento.city}</td>
                  <td>
                    <button
                      className="boton button button2"
                      onClick={() => mostrarModalEditar(elemento)}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </button>
                    {"  "}
                    <button
                      className="boton button button3"
                      onClick={() => eliminar(elemento)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <br />
        </Container>
      ) : (
        <Container>
          <PageNotFound message={t(messageError)}/>
        </Container>
      )}
    </>
  );
};
