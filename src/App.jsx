import { useState, useEffect, useRef } from "react";
import DoneIcon from "@mui/icons-material/Done";
import "./App.css";
import Box from "./component/Box";

const App = () => {
  const [list, setList] = useState([]);
  const [editListId, setEditListId] = useState(null);
  const [listInputVal, setListInputVal] = useState("");
  const [draggedEl, setDraggedEl] = useState(null);
  const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setCard(list.cards);
  }, [list.cards]);

  useEffect(() => {
    if (editListId || listInputVal.trim() === "") {
      inputRef.current?.focus();
    }
  }, [editListId, listInputVal]);

  const onDragStopped = (dropId) => {
    const updatedList = list.map((l) => {
      if (l.id === draggedEl.listId) {
        l.cards = l.cards.filter((card) => card.id !== draggedEl.card.id);
      }
      if (l.id === dropId) {
        return { ...l, cards: [...l.cards, draggedEl.card] };
      }
      return l;
    });
    setList(updatedList);
    console.log(draggedEl);

    setDraggedEl(null);
  };

  const setCard = (cards, listId) => {
    const newList = list.map((l) => {
      if (l.id === listId) {
        l.cards = cards;
      }
      return l;
    });
    setList(newList);
  };

  const handleAddCard = (id, text) => {
    const newList = list.map((l) => {
      if (l.id === id) {
        const newCard = {
          id: Math.floor(Math.random() * 1000000),
          text: text || "",
        };
        l.cards.push(newCard);
        return l;
      }
      return l;
    });
    setList(newList);
    setInputVal("");
    setEditId(true);
  };

  const handleAddBox = () => {
    const value = listInputVal.trim();
    const newBox = {
      id: Date.now(),
      title: value || "New List",
      cards: [],
    };
    setList((prevList) => [...prevList, newBox]);
    setEditListId(newBox.id);
    setListInputVal("");
  };

  const handleListInputVal = (e) => {
    setListInputVal(e.target.value);
  };

  const handleSaveListIdChange = (listId) => {
    const value = listInputVal.trim();
    if (value.length > 0) {
      const updatedList = list.map((l) =>
        l.id === listId ? { ...l, title: value } : l
      );
      setList(updatedList);
    }
    setEditListId(null);
    setListInputVal("");
  };

  const handleListDelete = (listId) => {
    const newBoxList = list.filter((l) => l.id !== listId);
    setList(newBoxList);
  };
  const handleEnterPress = (e, listId) => {
    if (e.key === "Enter") {
      handleSaveListIdChange(listId);
    }
  };

  return (
    <>
      <div className="head">
        <h1>React Trello Clone</h1>
      </div>
      <div className="main">
        <div className="left">
          <div className="container">
            {list.map((l) => {
              const editListMode = editListId === l.id;
              return editListMode ? (
                <div className="input-header" key={l.id}>
                  <input
                    ref={inputRef}
                    placeholder="New List..."
                    value={listInputVal}
                    onKeyDown={(e) => handleEnterPress(e, l.id)}
                    onChange={handleListInputVal}
                    type="text"
                  />
                  <DoneIcon onClick={() => handleSaveListIdChange(l.id)} />
                </div>
              ) : (
                <div key={l.id} className="content">
                  <Box
                    inputVal={inputVal}
                    setInputVal={setInputVal}
                    editId={editId}
                    setEditId={setEditId}
                    setCard={setCard}
                    handleAddCard={handleAddCard}
                    setDraggedEl={setDraggedEl}
                    onDragStopped={onDragStopped}
                    handleListDelete={handleListDelete}
                    listInputVal={l.title}
                    list={l}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="right">
          <div onClick={handleAddBox} className="add_list">
            Add a list...
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
