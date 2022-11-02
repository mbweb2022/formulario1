import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Formulario.css";

import { Table, Container, FormGroup, Alert } from "reactstrap";
import { useTranslation } from "react-i18next";
import { get, post } from "./services/RestExecutor";
import i18next from "i18next";
import PageNotFound from "./components/PageNotFound";
import { Success } from "./components/Succes";

export const Form = () => {
  const [t, i18n] = useTranslation("global");
  const [date, setDate] = useState();
  const [todaysDate, setTodaysDate] = useState();
  const [data, setData] = useState([]);
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
  const [completed, isCompleted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [messageError, setMessageError] = useState();
  const [form, setForm] = useState({
    // identification: "1171234354",
    // firstName: "Darwin",
    // secondName: "David",
    // lastName: "Cacuango",
    // secondLastName: "Criollo",
    // birthday: "2002-02-25",
    // email: "cacuangodarwin1999@gmail.com",
    // phoneNumber: "0999999999",
    // relationShip: "Esposo / Esposa",
    // city: "Quito",
    // direction: "La carolina",
    // gender: "M",
  });
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  let isValid = useRef(true);
  const [mbUser, setMbUser] = useState({});
  let noDuplicated = useRef(true);
  useEffect(() => {
    var date = new Date();
    var day = String(date.getDate()).padStart(2, "0");
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var year = date.getFullYear();
    var todaysDate = day + "/" + month + "/" + year;
    var hoy = year + "-" + month + "-" + day;
    //console.log(hoy);
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
  let fillData = async (valor) => {
    let array = [];
    valor.forEach((element) => {
      //console.log("-----------", element);
      array.push({
        firstName: element.firstName,
        secondName: element.secondName,
        lastName: element.lastName,
        secondLastName: element.secondLastName,
        identification: element.identification,
        email: element.email,
        birthDate: element.birthday,
        code: mbUser.code.id.S,
        codeDate: todaysDate,
        address: element.direction,
        gender: element.gender,
        city: element.city,
        relationShip: element.relationShip,
        phoneNumber: element.phoneNumber,
      });
    });
    let envio = {
      data: {
        code: mbUser.code.id.S,
        insured: {
          identification: mbUser.mbUser.identificationNumber.S,
        },
        beneficiaries: array,
      },
    };
    await post(userId, envio, isCompleted, isActivePolice, setMessageError);
    //console.log("envio: ", envio);
  };

  let mostrarModalEditar = (e) => {
    setForm(e);
    setModalEditar(true);
  };

  let insertar = () => {
    //console.log("insertando");
    var valorNuevo = {
      ...form,
    };
    console.log("Formulario:", valorNuevo);
    const keysForm = Object.keys(valorNuevo);
    keysForm.forEach((element) => {
      if (!valorNuevo[element] || valorNuevo[element].length <= 0) {
        console.log("--------------------------------", valorNuevo[element]);
        isValid.current = false;
      }
    });
    data.forEach((element) => {
      if (element.identification === valorNuevo.identification) {
        noDuplicated.current = false;
      }
    });
    // //console.log(
    //   "isValid:",
    //   isValid.current,
    //   " noDuplicated: ",
    //   noDuplicated.current
    // );
    if (isValid.current && noDuplicated.current) {
      let lista = data;
      lista.push(valorNuevo);
      //console.log(lista);
      setData(lista);
      setModalInsertar(false);
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
        city: "",
        direction: "",
        gender: "",
      });
      isValid.current = true;
      noDuplicated.current = true;
    } else if (noDuplicated.current === false) {
      window.confirm(t("registred"));
    }
  };
  let editar = (dato) => {
    const keysForm = Object.keys(dato);
    keysForm.forEach((element) => {
      if (!dato[element] || dato[element].length <= 0) {
        isValid.current = false;
      }
    });
    if (!isValid.current) {
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
      identification: "",
      firstName: "",
      secondName: "",
      lastName: "",
      secondLastName: "",
      birthday: "",
      email: "",
      phoneNumber: "",
      relationShip: "",
      city: "",
      direction: "",
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
      //console.log(lista);
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
    //console.log("ENTRA A RESPONSE con mbt", mbt);
    await get(userId, setMbUser, isActivePolice, setMessageError);
    console.log(mbUser);
    setFullName(mbUser.mbUser.fullName.S);
  };
  return (
    <>
      {completed ? (
        <Success />
      ) : (
        <>
          {!messageError ? (
            <Container>
              <Container>
                <div className="card card-4">
                  <div className="card-heading"></div>
                  <div className="headerInfo">
                    <div className="headerInfoContent">
                      <Alert color="info">
                        {" "}
                        {t("todays")} {date}. {t("accessInfo")} {fullName}
                      </Alert>
                      <label className="headerInfoText">{t("info")}</label>
                    </div>
                  </div>
                  <div className="card-body">
                    <h2 className="title">{t("healthInsurance")}</h2>
                    <form>
                      <div className="row row-space">
                        <div className="col-2">
                          <FormGroup>
                            <label className="label">
                              {t("identification")}
                            </label>
                            <input
                              pattern="[0-9]{10}"
                              className="form-control"
                              type="text"
                              readOnly={modalEditar === true ? true : false}
                              required
                              disabled={data.length >= 3 ? true : false}
                              maxLength={10}
                              name="identification"
                              onChange={handleChange}
                              value={form.identification}
                            />
                          </FormGroup>
                        </div>
                        <div className="col-2">
                          <FormGroup>
                            <label className="label">{t("phoneNumber")}</label>
                            <input
                              pattern="[0-9]{10}"
                              className="form-control"
                              type="text"
                              readOnly={modalEditar === true ? true : false}
                              required
                              disabled={data.length >= 3 ? true : false}
                              maxLength={10}
                              name="phoneNumber"
                              onChange={handleChange}
                              value={form.phoneNumber}
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
                              disabled={data.length >= 3 ? true : false}
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
                              disabled={data.length >= 3 ? true : false}
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
                              disabled={data.length >= 3 ? true : false}
                              required
                              value={form.lastName}
                              name="lastName"
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </div>
                        <div className="col-2">
                          <FormGroup>
                            <label className="label">
                              {t("secondLastName")}
                            </label>
                            <input
                              className="form-control"
                              required
                              disabled={data.length >= 3 ? true : false}
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
                                disabled={data.length >= 3 ? true : false}
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
                                  disabled={data.length >= 3 ? true : false}
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
                                  disabled={data.length >= 3 ? true : false}
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
                              disabled={data.length >= 3 ? true : false}
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
                              disabled={data.length >= 3 ? true : false}
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
                              disabled={data.length >= 3 ? true : false}
                              defaultChecked={form.relationShip}
                              aria-label="Default select example"
                              onChange={(e) => {
                                const item = relationShipData.filter(
                                  (item) => item.key === e.target.value
                                );
                                if (item.length > 0) {
                                  setForm({
                                    ...form,
                                    relationShip: item[0].value,
                                  });
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
                                    <option value={item.key}>
                                      {item.value}
                                    </option>
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
                              disabled={data.length >= 3 ? true : false}
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
                              event.stopPropagation();
                              event.nativeEvent.stopImmediatePropagation();
                              event.preventDefault();
                              insertar();
                            }}
                            onTouchCancel
                          >
                            Insertar
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
                                  city: "",
                                  direction: "",
                                  gender: "",
                                });
                              }}
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                        {data.length >= 1 ? (
                          <>
                            <Alert color="warning">
                              Revisa los que los datos estén correctos sobre tu
                              familiar registrados al seguro de vida
                              proporcionado por MoneyBlinks, una vez que
                              comprobaste que los datos están correctos dale a
                              "Registrar beneficiarios".
                            </Alert>
                            <button
                              className="button button1"
                              onClick={(event) => {
                                event.stopPropagation();
                                event.nativeEvent.stopImmediatePropagation();
                                event.preventDefault();
                                fillData(data);
                              }}
                            >
                              Registrar beneficiarios
                            </button>
                          </>
                        ) : (
                          <></>
                        )}
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
              {data.length !== 0 ? (
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
              ) : (
                <></>
              )}
              <br />
              <br />
            </Container>
          ) : (
            <Container>
              <PageNotFound message={t(messageError)} />
            </Container>
          )}
        </>
      )}
    </>
  );
};
