import React from 'react';
import showMore from '../../assets/img/showMore.svg';

export default function ProfilePost(props) {
    return (
        <div className='author-profil'>
            <div className='author-info'>
                <img src={props.profilePicture}></img>
                <div className='author-p'>
                    <h4>{props.userName}</h4>
                    <p>{props.job}</p>
                </div>
            </div>
            <img className='schowsvg' src={showMore}></img>
        </div>
    );
}
