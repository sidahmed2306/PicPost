import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Searchbar from "../../components/Search/Searchbar";
import UserItem from "../../components/Search/UserItem";
import "./search.css";
import { apiBaseUrl } from "../../api";
export default function Search({ token }) {
  const [allUser, setAllUser] = useState([]);
  const [myUserId, setMyUserId] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(allUser);
  const [searchTerm, setSearchTerm] = useState("");
  const getAllUser = () => {
    fetch(`${apiBaseUrl}/users/all-users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => {
        setAllUser(user.result.user);
        setMyUserId(user.result.idUser);
        setFilteredUsers(
          user.result.user.filter((user) =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });
  };
  useEffect(getAllUser, [token]);

  const follow = (profilId) => {
    fetch(`${apiBaseUrl}/users/add-follwer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: profilId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to follow");
        }

        return response.json();
      })
      .then((newLike) => {
        getAllUser();
      })
      .catch((err) => {
        console.error(`Error follow: ${err.message}`);
        throw err;
      });
  };

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
  console.log(myUserId);
  return (
    <section className="search-section">
      <Searchbar searchTerm={searchTerm} handleChange={handleChange} />
      <div>
        {filteredUsers?.map((user) => {
          return (
            <div className="result-section">
              <UserItem
                // follow={() => {
                //   follow(allUser.map((elt) => elt._id));
                // }}
                // getAllUser={() => {
                //   getAllUser(allUser.map((elt) => elt._id));
                // }}
                isFollow={user.followers
                  ?.map((elt) => elt._id)
                  .includes(myUserId)}
                follow={follow}
                profilePicture={user.profilePicture.url}
                userName={user.userName}
                job={user.job}
                id={user._id}
                profileId={user._id}
              />
            </div>
          );
        })}
      </div>
      <Navbar page={"search"} />
    </section>
  );
}
