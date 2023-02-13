import React from 'react';
import { Link, useParams } from 'react-router-dom';
import backArrow from '../../assets/img/backArrow.svg';
import paperPlane from '../../assets/img/paperPlane.svg';
import Post from '../../components/Home/Post';

export default function CommentSection() {
    const params = useParams();

    return (
        <section>
            <div>
                <Link to="/home">
                    <img src={backArrow} alt="back"></img>
                </Link>
                <h3>Comments</h3>
                <img src={paperPlane}></img>
            </div>
            <Post />
        </section>
    );
}
