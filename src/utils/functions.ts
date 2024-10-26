import axios from "axios";
import { IProduct } from "../interfaces";
import CookiesService from "../services/CookiesService";

export const isProductExist = (
  product: IProduct,
  totalProducts: IProduct[]
) => {
  const exist = totalProducts.find((item) => item.id === product.id);
  if (exist) {
    return totalProducts.map((item) => {
      if (product.id === item.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      } else return item;
    });
  }
  return [...totalProducts, { ...product, quantity: 1 }];
};

export const handleFileUpload = async (thumbnail:File) => {
  if (thumbnail) {
    const formData = new FormData();
    console.log('entered form data');
    formData.append("files", thumbnail);
    formData.append("ref", "api::product.product");
    // formData.append("refid", id);
    formData.append("field", "thumbnail");

    try {
      const uploadResponse = await axios.post(
        "http://localhost:1337/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${CookiesService.get("jwt")}`,
          },
        }
      );

      const uploadedFileId = uploadResponse.data[0].id;
      return uploadedFileId;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  return null;
};


export const getCategoryList = async () => {
  try {
    const response = await axios.get("http://localhost:1337/api/categories", {
      headers: {
        Authorization: `Bearer ${CookiesService.get("jwt")}`,
      },
    });
    return response.data; // Return the actual data object
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};


export const getCategoryId = async (id:string) => {
  try {
    const response = await axios.get(`http://localhost:1337/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${CookiesService.get("jwt")}`,
      },
    });
    return response.data; // Return the actual data object
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};