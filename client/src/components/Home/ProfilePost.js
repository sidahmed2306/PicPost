import React from 'react';
import showMore from '../../assets/img/showMore.svg';

export default function ProfilePost(props) {
    return (
        <div className='top'>
            <img src={props.profilePicture}></img>
            <div>
                <h4>{props.userName}</h4>
                <p>{props.job}</p>
            </div>
            <img src={showMore}></img>
        </div>
    );
}
