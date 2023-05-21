import { TextField, Button, Box } from "@mui/material";

import './AddingForm.scss'
import { addNewItem, editItem } from "../../../helper/FirebaseFunctions";
import { Item } from "../../../models/types";


const AddingForm = (props: { addingFormStatus: string, setAddingFormStatus: Function, editInputs: string[], setEditInputs: Function, wardrobeData: Item[], idOfEditingItem: string }) => {

  const { addingFormStatus, setAddingFormStatus, editInputs, setEditInputs, wardrobeData, idOfEditingItem } = props;

  const handleInputChange = (text: string, inpudIndex: number) => {
    const newInputs = [...editInputs];
    newInputs[inpudIndex] = text;
    setEditInputs(newInputs);
  }

  const cancelEditing = () => {
    const newInputs = ['', '', '', '', '']
    setEditInputs(newInputs)
    setAddingFormStatus("none");
  };

  function saveItem() {
    if (editInputs[0] !== '' && editInputs[1] !== '' && editInputs[2] !== '' && editInputs[3] !== '' && editInputs[4] !== '') {
      const newItem = {
        id: '',
        name: editInputs[0],
        color: editInputs[1],
        size: editInputs[2],
        purpose: editInputs[3],
        picture: editInputs[4],
      }
      addNewItem(newItem)
      cancelEditing()
    } else {
      window.alert("All fields must be filled!");
    }
  }

  function saveEditedItem() {
    if (editInputs[0] !== '' && editInputs[1] !== '' && editInputs[2] !== '' && editInputs[3] !== '' && editInputs[4] !== '') {
      const newItem = {
        id: '',
        name: editInputs[0],
        color: editInputs[1],
        size: editInputs[2],
        purpose: editInputs[3],
        picture: editInputs[4],
      }
      editItem(idOfEditingItem, newItem);
      cancelEditing()
    } else {
      window.alert("All fields must be filled!");
    }
  }

  return (
    <Box
      className={
        addingFormStatus === "add" || addingFormStatus === "edit"
          ? "modal-window"
          : "modal-window off"
      }
    >
      <Box className="modal-window-content">
        <TextField
          onChange={(e) => handleInputChange(e.target.value, 0)}
          id="outlined-basic"
          label="Item name"
          variant="outlined"
          autoComplete="off"
          value={editInputs[0]}
        />
        <TextField
          onChange={(e) => handleInputChange(e.target.value, 1)}
          id="outlined-basic"
          label="Color"
          variant="outlined"
          autoComplete="off"
          value={editInputs[1]}
        />
        <TextField
          onChange={(e) => handleInputChange(e.target.value, 2)}
          id="outlined-basic"
          label="Size"
          variant="outlined"
          autoComplete="off"
          value={editInputs[2]}
        />
        <TextField
          onChange={(e) => handleInputChange(e.target.value, 3)}
          id="outlined-basic"
          label="Purpose of use"
          variant="outlined"
          autoComplete="off"
          value={editInputs[3]}
        />
        <TextField
          onChange={(e) => handleInputChange(e.target.value, 4)}
          id="outlined-basic"
          label="Picture URL"
          variant="outlined"
          autoComplete="off"
          value={editInputs[4]}
        />
        <Button
          onClick={() => saveItem()}
          variant="contained"
          color="success"
          style={{ display: addingFormStatus === "add" ? "block" : "none" }}
          className="off"
        >
          Add
        </Button>
        <Button
          onClick={() => saveEditedItem()}
          variant="contained"
          color="success"
          style={{ display: addingFormStatus === "edit" ? "block" : "none" }}
        >
          Save
        </Button>
        <Button
          onClick={() => cancelEditing()}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddingForm;
