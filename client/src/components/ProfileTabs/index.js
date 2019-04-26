import React from "react";
import "./style.css";
import ProfileContainer from "../ProfileContainer";
import PostTableData from "../PostTableData"


export function ProfileTabs(props) {
    return (
        <div id="ProfileTabs">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">Profile</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" id="pills-posts-tab" data-toggle="pill" href="#pills-posts" role="tab" aria-controls="pills-posts" aria-selected="false">Posts</a>
                </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                    <ProfileContainer
                        userName={props.userName}
                        userImage={props.userImage}
                        email={props.email}
                    />
                </div>
                <div className="tab-pane fade" id="pills-posts" role="tabpanel" aria-labelledby="pills-posts-tab">
                <div className="table-responsive-sm">
                <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Comment Count</th>
                        <th scope="col">Delete Post</th>
                    </tr>
                </thead>
                <tbody>
                    {props.postData.map(post => (
                        <PostTableData
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        author={post.author}
                        commentsCount={post.comments.length}
                        deletePost={props.deletePost}
                         />
                    ))}
                </tbody>
                </table>
                </div>
                </div>
            </div>
        </div>

    );
}


export default ProfileTabs