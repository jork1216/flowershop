import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logOut } from "../../auth";

export default function UserMenu() {
  const user = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleClick = () => (user ? setOpen(true) : navigate("/login"));

  const handleLogout = async () => {
    await logOut();
    setOpen(false);
    navigate("/");
  };

  return (
    <div className="user-icon-wrapper" ref={ref}>
      <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={user ? "#921313" : "currentColor"} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>

      {open && (
        <div className="user-modal">
          <p className="user-modal__email">{user.email}</p>
          <div className="user-modal__divider" />
          <button className="user-modal__logout" onClick={handleLogout}>Sign out</button>
        </div>
      )}
    </div>
  );
}