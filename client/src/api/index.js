import axios from "axios";

export const baseURL = "http://localhost:5001/ak-ecom/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// get all the products
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// delete a product
export const deleteAProduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// add new items to  the cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// create new order
export const createOrder = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/neworder`, {
      ...data,
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/allorders`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updateOrderStatus = async (order_id, status) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrderStatus/${order_id}`,
      null,
      { params: { status: status } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update the order status
export const updatePayStatus = async (order_id, paymentStatus) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updatePayStatus/${order_id}`,
      null,
      { params: { paymentStatus: paymentStatus } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
