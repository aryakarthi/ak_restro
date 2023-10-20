import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { avatar, logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { MdLogout, MdShoppingCart } from "../assets/icons";
import { btnClick, slideTop } from "../animations";
import { useSelector, useDispatch } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../app/slices/userSlice";
import { setCartOn } from "../app/slices/showCartSlice";

const Header = () => {
  const user = useSelector((data) => data.user);
  const cartItems = useSelector((data) => data.cartItems);
  console.log(cartItems.length);
  const [isMenu, setIsMenu] = useState(false);
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const signOut = () => {
    firebaseAuth.signOut().then(() => {
      dispatch(setUserNull());
      navigate("/login", { replace: true }).catch((err) => {
        console.log(err);
      });
    });
  };
  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center px-4 justify-between md:px-36 py-6">
      <NavLink to={"/"} className="flex items-center justify-center gap-4">
        <img src={logo} alt="Logo" className="w-12" />
        <h3 className="font-semibold text-xl">ak Restro</h3>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-8">
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/"}
          >
            Home
          </NavLink>
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/about"}
          >
            About
          </NavLink> */}
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/contact"}
          >
            Contact
          </NavLink>
        </ul>

        <motion.div
          {...btnClick}
          onClick={() => dispatch(setCartOn())}
          className="relative cursor-pointer"
        >
          <MdShoppingCart className="text-3xl text-textColor" />
          {cartItems?.length > 0 && (
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
              <p className="text-primary text-base font-semibold">
                {cartItems?.length}
              </p>
            </div>
          )}
        </motion.div>

        {user ? (
          <>
            <div
              onMouseEnter={() => setIsMenu(true)}
              className="relative cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
                <motion.img
                  className="w-full h-full object-cover"
                  src={user?.picture ? user?.picture : avatar}
                  whileHover={{ scale: 1.15 }}
                  referrerPolicy="no-referrer"
                />
              </div>

              {isMenu && (
                <motion.div
                  {...slideTop}
                  onMouseLeave={() => setIsMenu(false)}
                  className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-14 right-0 flex flex-col gap-4"
                >
                  <Link
                    to={"/dashboard/home"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/profile"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Profile
                  </Link>
                  <Link
                    to={"/user-orders"}
                    className="hover:text-red-500 text-xl text-textColor"
                  >
                    Orders
                  </Link>
                  <hr />
                  <motion.div
                    {...btnClick}
                    onClick={signOut}
                    className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                  >
                    <MdLogout className="text-2xl text-textColor group-hover::text-headingColor" />
                    <p className="text-textColor text-xl group-hover:text-headingColor">
                      Sign Out
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <>
            <NavLink>
              <motion.button
                {...btnClick}
                className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-emerald-300 cursor-pointer"
              >
                Login
              </motion.button>
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
