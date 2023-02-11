import { ReactComponent as Lupe } from '../../assets/img/lupe.svg';
import { ReactComponent as ProfileIcon } from '../../assets/img/profileIcon.svg';
import React from 'react';

export default function Searchbar({ handleChange }) {
    return (
        <div>
            <div>
                <Lupe />
                <input type="text" value={searchTerm} onChange={handleChange} />
            </div>
            <ProfileIcon />
        </div>
    );
}
