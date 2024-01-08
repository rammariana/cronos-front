const API_URL = "https://cronos-api-2kqh.onrender.com";
// functions

///user/:id/tasks

export const getUserData = async (endpoint) => {
  const url = `${API_URL}/${endpoint}`;
  try {
    const response = await fetch(url);
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const getTaskData = async (endpoint) => {
  const url = `${API_URL}/${endpoint}`;
  //console.log(url);
  try {
    const response = await fetch(url);
    const res = await response.json();
    //console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const addData = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const res = await response.json();
    //console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const addAudio = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const formData = new FormData();
  //formData.append("audio", data, { filename: "audio.wav" }); 
  formData.set('audio', data)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  };
  console.log(url);
  try {
    const response = await fetch(url, options);
    console.log(response, formData);
    const res = await response.json();
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const putData = async (endpoint, data) => {
  const url = `${API_URL}/${endpoint}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, options);
    const res = await response.json();
    //console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
export const deleteData = async (endpoint) => {
  const url = `${API_URL}/${endpoint}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, options);
    const res = await response.json();
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
