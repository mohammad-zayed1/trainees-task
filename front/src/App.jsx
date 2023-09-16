import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/user/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/admin/Admin";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
function App() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(
    function () {
      axios
        .get("http://localhost:6600/users")
        .then((response) => {
          // setLoader(true);
          setStudents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(setLoader(false));
    },
    [refresh]
  );

  useEffect(
    function () {
      axios
        .get("http://localhost:6600/getSubjects")
        .then((response) => {
          // setLoader(true);
          setSubjects(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(setLoader(false));
    },
    [refresh]
  );

  function handleClickDelete(id) {
    Swal.fire({
      title: "Are you sure to delete this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
        axios
          .delete(`http://localhost:6600/deleteuser/${id}`)
          .then((response) => {
            console.log(response.data);
            setRefresh(!refresh);
          })

          .catch((error) => console.log(error.message));
      }
    });
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Home students={students} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <Admin
                students={students}
                subjects={subjects}
                handleClickDelete={handleClickDelete}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
