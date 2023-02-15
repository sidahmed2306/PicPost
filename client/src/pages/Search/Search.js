import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Search/Searchbar";
import UserItem from "../../components/Search/UserItem";

export default function Search({ token }) {
  const [allUser, setAllUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(allUser);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch("http://localhost:9003/api/v1/users/all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => setAllUser(user.result.user));
  }, [token]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      return setFilteredUsers([]);
    }
    setFilteredUsers(
      allUser.filter((user) =>
        user.userName.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  console.log(allUser);
  console.log(filteredUsers);
  return (
    <section>
      <Searchbar searchTerm={searchTerm} handleChange={handleChange} />
      <div>
        {filteredUsers?.map((user) => {
          return (
            <UserItem
              profilePicture={user.profilePicture.url}
              userName={user.userName}
              job={user.job}
              id={user._id}
            />
          );
        })}
      </div>
      <Navbar page={"search"} />
    </section>
  );
}
