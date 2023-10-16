import React, { useState } from "react";
import { Spinner } from "../components";
import { motion } from "framer-motion";
import { statuses } from "../utils/styles";
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNULL, alertSuccess } from "../app/slices/alertSlice";
import { btnClick } from "../animations";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../app/slices/productSlice";

const DBNewItem = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imgDownloadURL, setImgDownloadURL] = useState(null);
  const [progress, setProgress] = useState(null);
  const [category, setCategory] = useState(null);

  const alert = useSelector((data) => data.alert);
  const dispatch = useDispatch();

  const uploadImg = (e) => {
    setIsLoading(true);
    const imgFile = e.target.files[0];
    // console.log(imgFile);
    const storageRef = ref(storage, `Images/${Date.now()}_${imgFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imgFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error : ${error}`));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setImgDownloadURL(downloadURL);
          setIsLoading(false);
          setProgress(null);
          dispatch(alertSuccess("Image Uploaded Successfully!"));
          setTimeout(() => {
            dispatch(alertNULL());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImgDownloadURL(null);
      setIsLoading(false);
      dispatch(alertSuccess("Image Removed Successfully!"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    });
  };

  const submitNewData = () => {
    const data = {
      product_name: itemName,
      product_category: category,
      product_price: price,
      product_description: description,
      imageURL: imgDownloadURL,
    };
    // console.log(data);
    addNewProduct(data).then((res) => {
      console.log(res);
      dispatch(alertSuccess("New Item Added!"));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
      setImgDownloadURL(null);
      setItemName("");
      setPrice("");
      setDescription("");
      setCategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        {/* itemname */}
        <InputField
          type="text"
          placeHolder={"Item Name"}
          stateValue={itemName}
          stateFunction={setItemName}
        />
        {/* category */}
        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses?.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-200 backdrop-blur-md ${
                  data.category === category
                    ? "bg-red-400 text-primary"
                    : "bg-transparent"
                }`}
              >
                {data.title}
              </p>
            ))}
        </div>
        {/* price */}
        <InputField
          type="number"
          placeHolder={"Price"}
          stateValue={price}
          stateFunction={setPrice}
        />
        {/* description */}
        <InputField
          type="text"
          placeHolder={"Description"}
          stateValue={description}
          stateFunction={setDescription}
        />
        {/* upload image */}
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className=" w-full flex flex-col items-center justify-center gap-2">
                  <div className="flex justify-between w-full">
                    <span className="text-base font-medium text-textColor">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && (
                        <>{`${Math.round(progress)}%`}</>
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imgDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="-rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">Upload Image</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={uploadImg}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imgDownloadURL}
                      className=" w-full h-full object-cover"
                    />

                    <motion.button
                      {...btnClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={() => deleteImageFromFirebase(imgDownloadURL)}
                    >
                      <MdDelete className="-rotate-0" />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {/* submit  */}
        <motion.button
          onClick={submitNewData}
          {...btnClick}
          className="w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer"
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export const InputField = ({
  type,
  placeHolder,
  stateValue,
  stateFunction,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunction(e.target.value)}
      />
    </>
  );
};

export default DBNewItem;
