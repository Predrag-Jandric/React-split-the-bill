import React from "react";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

export default function App() {
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setshowAddFriend((prev) => !prev);
  }

  function handleAddFriend(friend) {
    setFriends((prev) => [...prev, friend]);
    setshowAddFriend(false);
  }

  function handleSelection(el) {
    setSelectedFriend((prev) => (prev?.id === el.id ? null : el));
    setshowAddFriend(false)
  }

  console.log(selectedFriend);
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelection={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
}

function FriendsList({ friends, handleSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((el) => (
        <Friend
          el={el}
          selectedFriend={selectedFriend}
          key={el.id}
          handleSelection={handleSelection}
        />
      ))}
    </ul>
  );
}

function Friend({ el, handleSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === el.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={el.image} alt={el.name} />
      <h3>{el.name}</h3>
      {el.balance < 0 && (
        <p className="red">
          You owe {el.name} {Math.abs(el.balance)}€
        </p>
      )}

      {el.balance > 0 && (
        <p className="green">
          {el.name} owes you {el.balance}€
        </p>
      )}

      {el.balance === 0 && <p>You are even</p>}

      <Button onClick={() => handleSelection(el)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>Friend name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>Image URL</label>
      <input
        onChange={(e) => setName(e.target.value)}
        value={image}
        type="text"
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend }) {
  return (
    <>
      <form className="form-split-bill">
        <h2>Split a bill with {selectedFriend.name}</h2>

        <label>Bill value</label>
        <input type="text" />

        <label>Your expense</label>
        <input type="text" />

        <label>{selectedFriend.name}'s expense</label>
        <input disabled type="text" />

        <label>Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>

        <Button>Add</Button>
      </form>
    </>
  );
}
