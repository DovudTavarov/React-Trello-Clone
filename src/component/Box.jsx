import { useState, useEffect } from "react";
import Card from "./Card";
import ClearIcon from "@mui/icons-material/Clear";

const Box = (props) => {
  const {
    listInputVal,
    list,
    inputVal,
    editId,
    setEditId,
    handleListDelete,
    setDraggedEl,
    onDragStopped,
    handleAddCard,
    setCard,
  } = props;

  const handleInputVal = (e, id) => {
    const newCardList = list.cards.map((c) =>
      c.id === id ? { ...c, text: e.target.value } : c
    );
    setCard(newCardList, list.id);
  };

  const handleCardDelete = (CardId) => {
    const newCardList = list.cards.filter((c) => c.id !== CardId);
    setCard(newCardList, list.id);
  };

  const handleEditIdChange = (cardId) => {
    setEditId(cardId);
  };

  const handleSaveIdChange = () => {
    setEditId(null);
  };

  return (
    <div
      className="box"
      onDrop={(e) => {
        e.preventDefault();
        onDragStopped(list.id);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="header">
        {listInputVal}
        <ClearIcon
          onClick={() => handleListDelete(list.id)}
          sx={{
            cursor: "pointer",
            borderRadius: "50%",
            padding: "5px",
            "&:hover": {
              backgroundColor: "grey",
            },
          }}
        />
      </div>
      {list.cards.map((card) => {
        const editMode = editId === card.id;
        return (
          <div
            key={card.id}
            draggable
            onDragStart={() => {
              setDraggedEl({ card: card, listId: list.id });
            }}
            className="card-cont"
          >
            <Card
              handleCardDelete={handleCardDelete}
              handleEditIdChange={handleEditIdChange}
              handleSaveIdChange={handleSaveIdChange}
              editMode={editMode}
              handleInputVal={handleInputVal}
              id={card.id}
              inputVal={card.text}
              className="card"
            />
          </div>
        );
      })}
      <div onClick={() => handleAddCard(list.id, inputVal)} className="footer">
        Add a card...
      </div>
    </div>
  );
};

export default Box;
