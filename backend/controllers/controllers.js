const  Staff =  require ("../Models/Staff");
const mongoose = require('mongoose');

//Function to fetch all the records
const getRecords = async (req,res) => {
    try {
      const records = await Staff.find();

        res.status(200).json(records);
       
    } catch (error) {
      console.error('Failed to get records:', error);
      res.status(400).json({
        "message" : "There was an error fetching the document"
      });
    }
  };
  
  //Function to fetch a single record
  const getSingleRecord = async (req, res) => {
    const {parameter} = req.query;
    try {
      
      const recordStaffname = await Staff.findOne({staffname : parameter});

        if(recordStaffname){
          return res.status(200).json(recordStaffname);
        }
  
        const recordRoomNumber = await Staff.findOne({roomnumber : parameter});


         if(recordRoomNumber){
          return res.status(200).json(recordRoomNumber);
        }

        const recordMaintainenceNumber =  await Staff.findOne({maintainencenumber : parameter});
        
        if(recordMaintainenceNumber){
          return res.status(200).json(recordMaintainenceNumber);
        }  
        
       
        const recordStaffsection =  await Staff.findOne({staffsection : parameter});

          if(recordStaffsection){
          return res.status(200).json(recordStaffsection);
        }  


        if(!recordStaffsection){
          return res.status(400).json({message: "Record not found"});
        }
           
    } catch (error) {
      res.status(400).json({
        message: 'There was an error fetching the document, please try again'
      });
    }
  };

  //Function to delete a single record
const deleteRecord = async (req, res) => {
  try {
  const { parameter } = req.query;
    
  const isValid = mongoose.isValidObjectId(parameter);

  if(!isValid){
    return res.json(400).json({
      message: "can not find id"
    });
  }

  await Staff.findByIdAndDelete(parameter);
  res.status(200).json({
  message: "Record deleted successfully",
  });
  } catch (error) {
  console.error('Failed to delete record:', error);
  res.status(400).json({
  message: "There was an error deleting the record",
  });
  }
  };


  // Function to edit a single record
const editRecord = async (req, res) => {
  try {
    const { parameter } = req.query;
    
    const isValid = mongoose.isValidObjectId(parameter);

    if (!isValid) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }
    
    const newData = req.body;

    console.log(
      newData
    );
    
    const updatedRecord = await Staff.findByIdAndUpdate(parameter, newData, { new: true });
    
    if (!updatedRecord) {
      return res.status(404).json({
        message: "Record not found",
      });
    }
    
    res.status(200).json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    console.error('Failed to edit record:', error);
    res.status(400).json({
      message: "There was an error editing the record",
    });
  }
};


// Function to add a new record
const addRecord = async (req, res) => {
  try {
    const  newData  = req.body; // Assuming the new data is provided in the request body

    const createdRecord = await Staff.create(newData);
     console.log(
      newData
    );

    res.status(201).json({
      message: "Record added successfully",
      record: createdRecord,
    });
  } catch (error) {
    console.error('Failed to add record:', error);
    res.status(400).json({
      message: "There was an error adding the record",
    });
  }
};


module.exports = {
    getSingleRecord,
    getRecords,
    deleteRecord,
    editRecord,
    addRecord
}

