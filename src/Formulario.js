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
    id: 1,
    firstName: "Jeremy",
    secondName: "Ismael",
    lastName: "León",
    secondLastName: "Garzón",
    birthday: "21/03/2022",
    email: "jeremisma2001@hotmail.com",
    phoneNumber: "0999999999",
    gender: "F",
  },
  {
    id: 2,
    firstName: "Darwin",
    secondName: "David",
    lastName: "Cacuango",
    secondLastName: "Criollo",
    birthday: "25/02/2002",
    email: "cacuangodarwin1999@gmail.com",
    phoneNumber: "0999999999",
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
class Formulario extends React.Component {
  state = {
    data: data,
    gender: gender,
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
    console.log(this.state.form);
  };
  mostrarModalInsertar = () => {
    var longitud = this.state.data.length + 1;
    console.log(longitud);
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
    console.log(e);
    this.setState({
      modalEditar: true,
      form: e,
    });
  };
  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  insertar = () => {
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
    });
  };

  editar = (dato) => {
    console.log(dato);

    this.setState({ modalEditar: false });
    var posicion = 0;
    var lista = this.state.data;
    lista.map((registro) => {
      if (dato.id === registro.id) {
        lista[posicion].firstName = dato.firstName;
        lista[posicion].secondName = dato.secondName;
        lista[posicion].lastName = dato.lastName;
        lista[posicion].secondLastName = dato.secondLastName;
        lista[posicion].birthday = dato.birthday;
        lista[posicion].email = dato.email;
        lista[posicion].phoneNumber = dato.phoneNumber;
        lista[posicion].gender = dato.gender;
      }
      posicion++;
      return lista;
    });

    this.setState({ data: lista });
  };

  useQuery = () => new URLSearchParams(window.location.search);
  query = this.useQuery();
  userId = this.query.get('userId')


  eliminar = (dato) => {
    var opcion = window.confirm(
      `¿Estás seguro de eliminar el siguiente registro?\nId: ${dato.id}\nPersonaje: ${dato.personaje}\nAnime: ${dato.anime}`
    );
    if (opcion) {
      var contador = 0;
      var lista = this.state.data;
      console.log(lista);
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
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var todaysDate = day + "/" + month + "/" + year;
    this.setState({
      date: todaysDate,
    });
  };
  render() {
    const { t } = this.props;

    return (
      <>
        <Container>
          {/* <Container className="container">
            <img
              src="https://www.moneyblinks.com/assets/images/logo.png"
              className="img-thumbnail"
              alt="..."
            />
          </Container> */}
          {/* <Container>
            <div>
              <h3>Insertar Personaje</h3>
            </div>
            <br />

            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
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
            <br />

            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </Container> */}

          <Container>
            <div className="card card-4">
              <div className="card-heading"></div>
              <div className="headerInfo">
                <div className="headerInfoContent">
                  <Alert color="info"> Hoy es {this.state.date}, SU USER ID ES {this.userId} </Alert>
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
                          readOnly
                          name="identification"
                          value={
                            this.state.modalEditar === true
                              ? this.state.form.id
                              : this.state.data.length + 1
                          }
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
                              checked={
                                this.state.form.gender === "F" ? "checked" : ""
                              }
                              onSelect={() => {
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    gender: this.state.gender[1].value,
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
                              checked={
                                this.state.form.gender === "M" ? "checked" : ""
                              }
                              onSelect={() => {
                                console.info("M");
                                this.setState({
                                  form: {
                                    ...this.state.form,
                                    gender: this.state.gender[0].value,
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

                  <div className="p-t-15 ">
                    {this.state.modalEditar === false ? (
                      <Button color="primary" onClick={() => this.insertar()}>
                        Insertar
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        onClick={() => {
                          this.editar(this.state.form);
                        }}
                      >
                        Editar
                      </Button>
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
                <th>Id</th>
                <th>Primer Nombre</th>
                <th>Segundo Nombre</th>
                <th>Primer Apellido</th>
                <th>Segundo Apellido</th>
                <th>Fecha de nacimiento</th>
                <th>Genero</th>
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id}</td>
                  <td>{elemento.firstName}</td>
                  <td>{elemento.secondName}</td>
                  <td>{elemento.lastName}</td>
                  <td>{elemento.secondLastName}</td>
                  <td>{elemento.birthday}</td>
                  <td>{elemento.email}</td>
                  <td>{elemento.phoneNumber}</td>
                  <td>{elemento.gender}</td>
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
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
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
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
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
              Editar
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
