import { useRef, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ({
  inputVal,
  id,
  handleInputVal,
  handleCardDelete,
  handleEditIdChange,
  handleSaveIdChange,
  editMode,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editMode]);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSaveIdChange();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        onKeyDown={handleEnterPress}
        onChange={(e) => handleInputVal(e, id)}
        type="text-area"
        value={inputVal}
        disabled={!editMode}
        className="card"
        placeholder="New Card..."
      />
      {!editMode ? (
        <EditIcon
          onClick={() => handleEditIdChange(id)}
          sx={{
            backgroundColor: "#9E9E9E",
            color: "white",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        />
      ) : (
        <DoneIcon
          sx={{
            backgroundColor: "green",
            color: "white",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={() => handleSaveIdChange()}
        />
      )}
      <DeleteIcon
        onClick={() => handleCardDelete(id)}
        sx={{
          backgroundColor: "red",
          color: "white",
          padding: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0 8px 8px 0",
          cursor: "pointer",
        }}
      />
    </>
  );
}
