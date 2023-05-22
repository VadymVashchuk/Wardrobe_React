import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import AddingForm from "./AddingForm/AddingForm";
import { Item } from "../../models/types";
import "./wardrobe.scss";
import { db } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";


const Wardrobe = (props: {
  logInStatus: Boolean;
  setLogInStatus: Function;
}) => {

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Item name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "color",
      headerName: "Color",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "size",
      headerName: "Size",
      type: "number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "purpose",
      headerName: "Purpose of use",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "picture",
      headerName: "Picture",
      type: "image",
      sortable: false,
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <img src={params.value} className="item-img" />,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 120,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon style={{ fontSize: 30 }} />}
            label="Edit"
            className="textPrimary"
            onClick={() => startEditing(id as string)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon style={{ fontSize: 30 }} />}
            label="Delete"
            onClick={() => deleteItem(id as string)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const auth = getAuth();

  const usersLogin: string = auth.currentUser?.email as string;
  const wardrobeCollectionRef = collection(db, usersLogin);
  
  const [rows, setRows] = useState<Item[]>([]); // ЦЕ НАШ МАСИВ З ДАНИМИ, ПРОСТО В MUI ТАК ВОНИ НАЗИВАЮТЬ ОБИЧНО - ROWS

  useEffect(() => {
    onSnapshot(wardrobeCollectionRef, (querySnapshot) => {
      setRows(
        querySnapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  const { logInStatus, setLogInStatus } = props;

  const logOut = () => {
    signOut(auth).then(() => {
        setLogInStatus(false)
    }).catch((error) => {
      window.alert('Error')
    });
  };

  const [addingFormStatus, setAddingFormStatus] = useState<"add" | "edit" | "none">("none");
  const [editInputs, setEditInputs] = useState<string[]>(["", "", "", "", ""]);
  const [idOfEditingItem, setIdOfEditingItem] = useState("");


  function startEditing(itemId: string) {
    setIdOfEditingItem(itemId);
    setAddingFormStatus("edit");

    const editingItem = rows.find((item) => item.id === itemId);
    if (editingItem) {
      const inputsValues = [
        editingItem.name,
        editingItem.color,
        editingItem.size,
        editingItem.purpose,
        editingItem.picture,
      ];
      setEditInputs(inputsValues);
    }
  }

  //РОБОТА З FIREBASE

 function deleteItem(itemId: string) {
  const item = doc(wardrobeCollectionRef, itemId);
  deleteDoc(item);
}

 function addNewItem(newItem: Item) {
  addDoc(wardrobeCollectionRef, {
    name: newItem.name,
    color: newItem.color,
    size: newItem.size,
    purpose: newItem.purpose,
    picture: newItem.picture,
  });
}

 function editItem(itemId: string, newItem: Item) {
  const item = doc(wardrobeCollectionRef, itemId);
  updateDoc(item, {
    name: newItem.name,
    color: newItem.color,
    size: newItem.size,
    purpose: newItem.purpose,
    picture: newItem.picture
  });
}

  return (
    <>
      <Box className="wardrobe-wrapper">
        <div className="main-title">
          <h1>WARDROBE OF {usersLogin}</h1>
        </div>
        <Box className="header">
          <Button
            color="primary"
            variant="contained"
            sx={{ fontWeight: 700 }}
            onClick={() => setAddingFormStatus("add")}
            startIcon={<AddIcon className="header-icon" />}
          >
            Add record
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ fontWeight: 700 }}
            onClick={logOut}
            startIcon={<LogoutIcon className="header-icon" />}
          >
            LOG OUT
          </Button>
        </Box>
        <div style={{ height: 630, width: "100%" }}>
          <DataGrid
            rowHeight={100}
            disableRowSelectionOnClick
            disableColumnMenu
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.light",
              },
              fontSize: 20,
              backgroundColor: "rgba(255, 255, 255, 0.368)",
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5]}
          />
        </div>
      </Box>
      <AddingForm
        addingFormStatus={addingFormStatus}
        setAddingFormStatus={setAddingFormStatus}
        editInputs={editInputs}
        setEditInputs={setEditInputs}
        idOfEditingItem={idOfEditingItem}
        addNewItem={addNewItem}
        editItem={editItem}
      />
    </>
  );
};

export default Wardrobe;
