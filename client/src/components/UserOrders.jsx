import React, { useEffect, useState } from "react";
import { Header, OrderData } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../api";
import { setOrders } from "../app/slices/orderSlice";

const UserOrders = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrders().then((data) => {
        dispatch(setOrders(data));
        setUserOrders(
          data.filter((item) => item?.customer?.user_id === user?.user_id)
        );
      });
    } else {
      setUserOrders(
        orders.filter((data) => data?.customer?.user_id === user?.user_id)
      );
    }
  }, [orders]);

  return (
    <main className="w-screen min-h-screen bg-slate-300">
      <Header />
      <div className="w-full px-4 lg:px-36 md:px-24 gap-12 my-28 lg:my-36 md:my-32">
        {userOrders?.length > 0 ? (
          <>
            {userOrders.map((item, i) => (
              <OrderData key={i} index={i} data={item} admin={false} />
            ))}
          </>
        ) : (
          <>
            <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
          </>
        )}
      </div>
    </main>
  );
};

export default UserOrders;
