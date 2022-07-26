import React from "react";
import { Routes, Route } from "react-router-dom";

// Blog
import BlogList from "../../app/pages/blog/blog-list/blog-list";
import AddBlog from "../../app/pages/blog/add-new-blog/add-new-blog";
import EditBlog from "../../app/pages/blog/edit-blog/edit-blog";

// User
import UserList from "../../app/pages/user/user-list/user-list";
import AddNewUser from "../../app/pages/user/add-new-user/add-new-user";
import EditUser from "../../app/pages/user/edit-user/edit-user";

//Team
import Teams from "../../app/pages/team/teams";
import AddTeam from "../../app/pages/team/add-team-member";
import EditTeamMember from "../../app/pages/team/edit-team-member";

//Profile
import UserProfile from "../../app/pages/user-profile/EditProfile";
import ChangePassword from "../../app/pages/user-profile/ChangePassword";
import Home from "../../core/components/home/home";

function View() {
  return (
    <Routes>
      <Route index element={<Home />}></Route>

      {/* User */}
      <Route path="/user">
        <Route index element={<UserList />}></Route>
        <Route path="add" element={<AddNewUser />}></Route>
        <Route path="edit" element={<EditUser />}></Route>
      </Route>

      {/* Blog */}
      <Route path="/blog">
        <Route index element={<BlogList />}></Route>
        <Route path="add" element={<AddBlog />}></Route>
        <Route path="edit/:id" element={<EditBlog />}></Route>
      </Route>
      <Route path='/team' element={<Teams/>}>
        <Route index element={<Teams/>}/>
        <Route path=':teamName'>
          <Route exact index element={<Teams/>}/>
        </Route>
      </Route>
      <Route path="/team/:teamName/:id/edit" element={<EditTeamMember/>}></Route>
      <Route path="/team/:teamName/addMember" element={<AddTeam/>}></Route>
      <Route path="/team/:teamName/:id/view" element={<EditTeamMember disabled={true}/>}></Route>
      {/* Porfile */}
      <Route path="/user-profile" element={<UserProfile />}></Route>
      <Route path="/change-password" element={<ChangePassword />}></Route>
    </Routes>
  );
}

export default View;
