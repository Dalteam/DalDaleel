

const BASE_URL = "http://localhost:5000/";


//Frontend functions for getting all records
const getRecords = async() => {
  try{
    
    const url = `${BASE_URL}records`
    const response = await fetch(url);
    const responseJson = await response.json();

    if(response.ok) {
        return responseJson;
    }

  } catch (error){
    console.log(error);
    alert("something went wrong, please try again");
  }
}


//Frontend functions for getting a single record
const getSingleRecord = async(query) => {
  if(query === ""){
    return;
  }
    const url = `${BASE_URL}record?parameter=${query}`;
    try{
    
        const response = await fetch(url);
        const responseJson = await response.json();
    
        if(response.ok) {
            return responseJson;
        }
    
      } catch (error){
        console.log(error);
        alert("something went wrong, please try again");
      }
}

//Function for editing the record
const editRecord = async (updatedData,recordId ) => {
  try {
    const url = `${BASE_URL}record?parameter=${recordId}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const responseJson = await response.json();

    if (response.ok) {
      alert('successfully edited the record');
      return responseJson;
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, please try again");
  }
};

//Function for deleting the record
const deleteRecord = async (recordId) => {
  try {
    const url = `${BASE_URL}record?parameter=${recordId}`;

    const response = await fetch(url, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Successfully deleted the record');
      return true;
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, please try again");
  }
};

//Create a new record
const createRecord = async (recordData) => {
  try {
    const url = `${BASE_URL}record`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recordData)
    });

    const responseJson = await response.json();

    if (response.ok) {
      alert('Successfully created the record');
      return responseJson;
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong, please try again");
  }
};


export {getRecords ,getSingleRecord , editRecord,deleteRecord , createRecord}