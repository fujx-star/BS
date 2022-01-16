import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Origin from '../pages/origin';
import SignIn from '../pages/signin'
import Image from "../pages/image";
import SignUp from "../pages/signup";
import Upload from "../pages/upload";
import Taskhall from "../pages/taskhall"
import Viewtask from "../pages/viewtask";
import ReleaseTask from "../pages/release";
import MyTask from "../pages/mytask";

export default function Routers(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Origin />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="image" element={<Image />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="upload" element={<Upload />} />
                <Route path="taskhall" element={<Taskhall />} />
                <Route path="viewtask" element={<Viewtask />} />
                <Route path="release" element={<ReleaseTask />} />
                <Route path="mytask" element={<MyTask />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                            <p>There's nothing here!</p>
                        </main>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
