import React from 'react';
import likeHeart from '../../assets/img/likeHeart.svg';
import commentIcon from '../../assets/img/commentIcon.svg';

export default function LikeAndComment(props) {
    return (
        <div>
            <div>
                <img src={likeHeart}></img>
                <h5>{props.likedBy.length}</h5>
            </div>
            <div>
                <img src={commentIcon}></img>
                <h5>{props.comments.length}</h5>
            </div>
        </div>
    );
}
