import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Search/Searchbar';
import UserItem from '../../components/Search/UserItem';

export default function Search() {
    const [allUser, setAllUser] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(allUser);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetch('http://localhost:9003/api/v1/users')
            .then(res => res.json())
            .then((user) => setAllUser(user));
    }, []);


    const handleChange = event => {
        setSearchTerm(event.target.value);
        setFilteredUsers(
            allUser.filter(user =>
                user.userName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };
    return (
        <section>
            <Searchbar handleChange={handleChange} />
            <div>
                {filteredUsers.map((user) => {
                    <UserItem />;
                })}
            </div>
            <Navbar page={"search"} />
        </section>
    );
}
