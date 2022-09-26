// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute, { NotProtectedRoute } from "./ProtectecRoute";
// import Dashboard from './Dashboard';
// import Login from "./Login";

// function PageRoutes({ login, isAuth }) {
//   console.log(isAuth);
//   return (
//     <Routes>
//       <Route path="*" element={<p>Error 404</p>} />
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute isAuth={isAuth}>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/login"
//         element={
//           <NotProtectedRoute isAuth={isAuth}>
//             <Login />
//           </NotProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default PageRoutes;
