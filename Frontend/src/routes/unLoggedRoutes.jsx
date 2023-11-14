import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp/SignUp";

function UnloggedRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </>
  );
}
export { UnloggedRoutes };
