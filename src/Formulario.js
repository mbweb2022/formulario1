import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "react-bootstrap/Image";
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
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const data = [
  {
    identification: "1",
    firstName: "Jeremy",
    secondName: "Ismael",
    lastName: "León",
    secondLastName: "Garzón",
    birthday: "21/03/2022",
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
    birthday: "25/02/2002",
    email: "cacuangodarwin1999@gmail.com",
    phoneNumber: "0999999999",
    relationShip: "Esposo / Esposa",
    city: "Quito",
    direction: "La carolina",
    gender: "M",
  },
];
const gender = [
  {
    key: "M",
    value: "Male",
  },
  {
    key: "F",
    value: "Female",
  },
];
const relationShipData = [
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
];
class Formulario extends React.Component {
  state = {
    data: data,
    gender: gender,
    form: {
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
    },
    modalInsertar: false,
    modalEditar: false,
    date: "",
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  mostrarModalInsertar = () => {
    var longitud = this.state.data.length + 1;

    if (longitud <= 3) {
      this.setState({ modalInsertar: true });
    } else {
      window.alert("No es posible añadir otro registro");
    }
  };
  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };
  mostrarModalEditar = (e) => {
    this.setState({
      modalEditar: true,
      form: e,
    });
  };
  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
    let isValid = true;
    let noDucplicated = true;
    var valorNuevo = {
      ...this.state.form,
    };

    const keysForm = Object.keys(valorNuevo);
    keysForm.forEach((element) => {
      if (!valorNuevo[element] || valorNuevo[element].length <= 0) {
        isValid = false;
      }
    });
    this.state.data.forEach((element) => {
      if (element.identification === valorNuevo.identification) {
        noDucplicated = false;
      }
    });
    if (isValid && noDucplicated) {
      var lista = this.state.data;
      lista.push(valorNuevo);
      this.setState({ data: lista, modalInsertar: false });
      this.setState({
        form: {
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
        },
      });
    } else if (noDucplicated) {
      window.confirm(`Este registro ya se ha agregado a la lista`);
    } else {
      window.confirm(`Ingrese todos los campos requeridos`);
    }

    /*
    var valorNuevo = {
      ...this.state.form,
    };

    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
    this.setState({
      form: {
        id: "",
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        birthday: "",
        email: "",
        phoneNumber: "",
        gender: "",
      },
    });*/
  };

  editar = (dato) => {
    let isValid = true;
    const keysForm = Object.keys(dato);
    keysForm.forEach((element) => {
      if (!dato[element] || dato[element].length <= 0) {
        isValid = false;
      }
    });
    if(!isValid){
      window.confirm(`Ingrese todos los campos requeridos`);
      return;
    }

    this.setState({ modalEditar: false });
    var posicion = 0;
    var lista = this.state.data;
  

   
  

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

    this.setState({ data: lista });
    this.setState({
      modalEditar: false,
      form: {
        identification: "",
        firstName: "",
        secondName: "",
        lastName: "",
        secondLastName: "",
        birthday: "",
        email: "",
        relationShip: "",
        phoneNumber: "",
        city: "",
        direction: "",
        gender: "",
      },
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      `¿Estás seguro de eliminar el siguiente registro?\nId: ${dato.id}\nPersonaje: ${dato.personaje}\nAnime: ${dato.anime}`
    );
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;

      lista.map((registro) => {
        if (registro.id === dato.id) {
          lista.splice(contador, 1);
        }
        contador++;
        return lista;
      });
      this.setState({ data: lista });
    }
  };

  componentDidMount = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var todaysDate = day + "/" + month + "/" + year;

    this.setState({
      date: todaysDate,
    });
  };

  render() {
    const { t } = this.props;
    // this.componentDidMount();
    return (
      <>
        <Container>
          <Container>
            <div className="card card-4">
              <div className="card-heading"></div>
              <div className="headerInfo">
                <div className="headerInfoContent">
                  <Alert color="info"> Hoy es {this.state.date}</Alert>
                  <label className="headerInfoText">
                    En esta sección podras registrar hasta tres(3) beneficiarios
                    a tu seguro de salud médico proporcionado por MoneyBlinks.
                    Recuerda que debes ingresar todos los datos solicitados y
                    validar que estén correctos. El plazo del seguro dependerá
                    de la fecha en que te registres.
                  </label>
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
                          className="form-control"
                          type="text"
                          readOnly={
                            this.state.modalEditar === true ? true : false
                          }
                          onChange={this.handleChange}
                          name="identification"
                          value={this.state.form.identification}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("phoneNumber")}</label>
                        <input
                          className="form-control"
                          type="text"
                          name="phoneNumber"
                          value={this.state.form.phoneNumber}
                          onChange={this.handleChange}
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
                          value={this.state.form.firstName}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("secondName")}</label>
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.form.secondName}
                          name="secondName"
                          onChange={this.handleChange}
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
                          value={this.state.form.lastName}
                          name="lastName"
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("secondLastName")}</label>
                        <input
                          className="form-control"
                          value={this.state.form.secondLastName}
                          type="text"
                          name="secondLastName"
                          onChange={this.handleChange}
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
                            value={this.state.form.birthday}
                            type="text"
                            name="birthday"
                            onChange={this.handleChange}
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
                            {this.state.gender[1].value}
                            <input
                              type="radio"
                              name="gender"
                              value={this.state.form.gender}
                              id={this.state.form.gender}
                              checked={
                                this.state.form.gender === "F" ? true : false
                              }
                              onClick={() => {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    gender: this.state.gender[1].key,
                                  },
                                });
                              }}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </tr>

                        <tr>
                          <label className="radio-container">
                            {this.state.gender[0].value}
                            <input
                              type="radio"
                              name="gender"
                              value={this.state.form.gender}
                              id={this.state.form.gender}
                              checked={
                                this.state.form.gender === "M" ? true : false
                              }
                              onClick={() => {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    gender: this.state.gender[0].key,
                                  },
                                });
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
                          name="email"
                          value={this.state.form.email}
                          onChange={this.handleChange}
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
                          value={this.state.form.direction}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                  <div className="row row-space">
                    <div className="col-2">
                      <FormGroup>
                        <label className="label">{t("relationShip")}</label>
                        
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                           
                            const item=relationShipData.filter(item => item.key== e.target.value);
                            if(item.length>0){
                              this.setState({
                                form: {
                                  ...this.state.form,
                                  ["relationShip"]: item[0].value,
                                },
                              });
                            }
                            //this.handleChange(e);
                          
                        
                          }}
                        >
                          {this.state.modalEditar === false && (
                            <option selected>Selecciona el Parentesco</option>
                          )}
                   
                          {this.state.modalEditar === true && (
                            <option selected>{this.state.form.relationShip}</option>
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
                          name="city"
                          value={this.state.form.city}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  <div className="p-t-15 ">
                    {this.state.modalEditar === false ? (
                      <Button color="primary" onClick={() => this.insertar()}>
                        Insertar
                      </Button>
                    ) : (
                      <div
                        style={{
                          width: "350px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          color="primary"
                          onClick={() => {
                            this.editar(this.state.form);
                          }}
                        >
                          Guardar
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => {
                            this.setState({
                              modalEditar: false,
                              form: {
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
                              },
                            });
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}

                    <Alert color="warning">
                      Revisa los que los datos estén correctos sobre tus
                      familiares registrados al seguro de vida proporcionado por
                      MoneyBlinks, una vez que comprobaste que los datos están
                      correctos dale a "Registrar beneficiarios".
                    </Alert>
                    <Button color="success">Registrar beneficiarios</Button>
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
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Genero</th>
                <th>Relationship</th>
                <th>Direction</th>
                <th>City</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.identification}</td>
                  <td>{elemento.firstName}</td>
                  <td>{elemento.secondName}</td>
                  <td>{elemento.lastName}</td>
                  <td>{elemento.secondLastName}</td>
                  <td>{elemento.birthday}</td>
                  <td>{elemento.email}</td>
                  <td>{elemento.phoneNumber}</td>
                  <td>{elemento.gender}</td>
                  <td>{elemento.relationShip}</td>
                  <td>{elemento.direction}</td>
                  <td>{elemento.city}</td>

                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalEditar(elemento)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    {"  "}
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(elemento)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br />
          <br />
        </Container>

        {/* Modal para INSERTAR LA INFORMACIÓN */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Personaje</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Identification:</label>

              <input
                className="form-control"
                readonly
                type="text"
                value={this.state.data.identification}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal para EDITAR LA INFORMACIÓN */}
        <Modal>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Identification:</label>

              <input
                className="form-control"
                readonly
                type="text"
                value={this.state.form.identification}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.editar(this.state.form);
              }}
            >
              Guardar
            </Button>
            <Button color="danger" onClick={() => this.ocultarModalEditar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default withTranslation()(Formulario);
//export default Formulario;
