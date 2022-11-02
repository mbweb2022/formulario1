const URL = "https://rjhi2d01ca.execute-api.us-east-1.amazonaws.com/production";
const type = "medical";

export const get = async (
  data,
  successFunction,
  errorFunction,
  setMessageError
) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      mbt: data,
      type: type,
    },
  };
  let bodyResponse;
  let result;
  try {
    const response = await fetch(URL, options);
    bodyResponse = await response.json();
    result = bodyResponse.result;
    if (bodyResponse) {
      if (response.status === 200) {
        if (result) {
          console.log("RETRONA del get" + JSON.stringify(bodyResponse.data));

          successFunction(bodyResponse.data);
        }
      } else {
        if (
          bodyResponse.messages != null &&
          bodyResponse.messages[0].message != null &&
          bodyResponse.messages[0].message.length > 0
        ) {
          console.log(bodyResponse);
          console.log(bodyResponse.messages[0].message);
          setMessageError(bodyResponse.messages[0].message);
          //   if (bodyResponse.messages[0].message === "ACTIVE_POLICY") {
          //     errorFunction(true);
          //   }
        } else {
          console.log("Código de error 406 ");
        }
      }
    }
  } catch (e) {
    console.log("Error en petición get", e);
  }
};

export const post = async (
  auth,
  data,
  successFunction,
  errorFunction,
  setMessageError
) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),

    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      mbt: auth,
      type: type,
    },
  };
  let bodyResponse;
  let result;
  try {
    const response = await fetch(URL, options);
    bodyResponse = await response.json();
    result = bodyResponse.result;
    if (bodyResponse) {
      if (response.status === 200) {
        if (result) {

          successFunction(true);
        }
      } else {
        if (
          bodyResponse.messages != null &&
          bodyResponse.messages[0].message != null &&
          bodyResponse.messages[0].message.length > 0
        ) {
          console.log(bodyResponse);
          console.log(bodyResponse.messages[0].message);
          setMessageError(bodyResponse.messages[0].message);
        } else {
          console.log("Código de error 406 ");
        }
      }
    }
  } catch (e) {
    console.log("Error en petición get", e);
  }
};
