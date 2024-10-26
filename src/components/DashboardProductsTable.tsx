import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import SkelatonTable from "./SkelatonTable";
import {
  useCreateDashboardProductsMutation,
  useDeleteDashboardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductsMutation,
} from "../app/services/products";
import { ICat, IProduct } from "../interfaces";
import { FaEye } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import CustomAlertDialog from "../shared/AlertDialog";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../shared/CustomModal";
import {  getCategoryList, handleFileUpload } from "../utils/functions";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
interface IProps {}

const DashboardProductsTable = ({}: IProps) => {
  //** Initial Value
  const emptyProduct: IProduct = {
    id: 0,
    documentId: "",
    price: 0,
    quantity: 0,
    thumbnail: {
      url: "",
    },
    title: "",
    description: "",
  };


  
  //** States
  const [IdToRemove, setIdToRemove] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productToEdit, setProductToEdit] = useState<IProduct>(emptyProduct);
  const [categoriesList, setCategoriesList] = useState<ICat[]>([]);
  const [IdEditProduct, setIdEditProduct] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const {isOpen: isOpenModal,onOpen: onOpenModal,onClose: onCloseModal,} = useDisclosure();
  const {isOpen: isOpenCreateModal,onOpen: onOpenCreateModal,onClose: onCloseCreateModal,} = useDisclosure();
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  const [destroyProduct, { isLoading: LoadingMutaion, isSuccess }] =useDeleteDashboardProductsMutation();
  const [UpdateProduct,{ isLoading: LoadingUpdating, isSuccess: SuccessUpdating },] = useUpdateDashboardProductsMutation();
  const [CreateProduct,{ isLoading: CreateLoading, isSuccess: SuccessCreating },] = useCreateDashboardProductsMutation();
  const networkStatus = useSelector((state: RootState) => state.network.isOnline);
  
  //** Handlers
  const products = data?.data ?? [];

  function AssignCategory(): string | undefined {
    let catId: string | undefined = undefined; // Initialize catId

    products.forEach((prod: IProduct) => {
      prod.categories?.forEach((cat: ICat) => {
        if (cat.title === selectedCategory) {
          catId = cat.documentId; // Get category documentId
        }
      });
    });

    return catId; // Return the category ID
  }


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thumbnail) {
      let categoryId = AssignCategory();
      let fileId = await handleFileUpload(thumbnail);
      UpdateProduct({
        id: IdEditProduct,
        body: {
          data: {
            title: productToEdit.title,
            description: productToEdit.description,
            price: productToEdit.price,
            stock: productToEdit.stock,
            thumbnail: fileId ? { id: fileId } : undefined,
            categories: categoryId ? [{ id: categoryId }] : [], // Attach file ID if uploaded
          },
        },
      });
    }
  };

  // create product form
  const onCreateClick = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(thumbnail);
    e.preventDefault();
    if (thumbnail) {
      const fileId = await handleFileUpload(thumbnail);
      CreateProduct({
        body: {
          data: {
            title: productToEdit.title,
            description: productToEdit.description,
            price: productToEdit.price,
            stock: productToEdit.stock,
            thumbnail: fileId ? { id: fileId } : undefined,
          },
        },
      });
    }
  };

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setProductToEdit({
      ...productToEdit,
      title: value,
    });
  };
  const onChangePriceHandler = (value: string) => {
    setProductToEdit({
      ...productToEdit,
      price: Number(value),
    });
  };
  const onChangeStockeHandler = (value: string) => {
    setProductToEdit({
      ...productToEdit,
      stock: Number(value),
    });
  };
  const onChangeDesc = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setProductToEdit({
      ...productToEdit,
      description: value,
    });
  };

  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; 
    setThumbnail(file);
  };

  const CreateProductHandel = () => {
    setProductToEdit(emptyProduct);
    onOpenCreateModal();
  };

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  //** Get Categories list
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoryList(); // Fetch the categorie
        setCategoriesList(data.data); 
      } catch (error) {
        console.error("Error getting category list:", error);
      }
    };

    fetchCategories(); // Call the async function
  }, []); 

  useEffect(() => {
    if (isSuccess) {
      setIdToRemove(null);
      onClose();
    }
    if (SuccessUpdating) {
      setIdEditProduct("");
      onCloseModal();
    }
    if (SuccessCreating) {
      onCloseCreateModal();
      setProductToEdit(emptyProduct);
    }
  }, [isSuccess, SuccessUpdating, SuccessCreating]);

  // Check if loading or error
  if (isLoading || !networkStatus) return <SkelatonTable />;
  if (error) return <div>Error loading products</div>;

  return (
    <>
      <Flex display={"block"} maxW={"85%"} mx={"auto"} my={5}>
        <Flex maxW={"85%"} mx={"auto"} my={5} justifyContent="flex-end">
          <Button onClick={CreateProductHandel} colorScheme={"blue"}>
            Create product
          </Button>
        </Flex>
        <TableContainer maxW={"100%"} mx={"auto"} my={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>CATEGORY</Th>
                <Th>THUMBNAIL</Th>
                <Th>PRICE</Th>
                <Th>STOCK</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product: IProduct) => (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product.title}</Td>
                  <Td>
                    {product?.categories?.map((cat: ICat, index: number) => (
                      <p key={index}>{cat.title}</p>
                    ))}
                  </Td>
                  <Td>
                    <img
                      src={`${product.thumbnail.url}`}
                      alt={product.title}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginLeft: "14px",
                      }}
                    />
                  </Td>
                  <Td>${product.price}</Td>
                  <Td>{product.stock}</Td>
                  <Td>
                    <Button
                      mr={1}
                      colorScheme="purple"
                      as={NavLink}
                      to={`/products/${product.documentId}`}
                    >
                      <FaEye />
                    </Button>
                    <Button
                      mr={1}
                      colorScheme="red"
                      onClick={() => {
                        onOpen();
                        setIdToRemove(product.documentId);
                      }}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        setIdEditProduct(product.documentId);
                        onOpenModal();
                        setProductToEdit(product);
                      }}
                    >
                      <FaPen />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>CATEGORY</Th>
                <Th>THUMBNAIL</Th>
                <Th>PRICE</Th>
                <Th>STOCK</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      {/* {console.log(productToEdit)} */}
      <CustomAlertDialog
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        title="Are you sure ?"
        description="Do you really want to destroy this product? This product cannot be undone."
        buttonTitle={["Cancel", "Destroy"]}
        varient="outline"
        onOkHandler={() => {
          destroyProduct(IdToRemove);
        }}
        isLoading={LoadingMutaion}
      />
      <CustomModal
        isLoading={LoadingUpdating}
        onOkClick={handleSubmitForm}
        isOpen={isOpenModal}
        onClose={onCloseModal}
        okText={"Update"}
        closeText={"Cancel"}
        title={"Edit product form"}
      >
        <Box>
          <FormControl my="1px">
            <FormLabel>Product Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={productToEdit.title}
              onChange={onTitleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Price</FormLabel>
            <NumberInput
              name="price"
              value={productToEdit.price}
              onChange={onChangePriceHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Product Current Stock</FormLabel>
            <NumberInput
              name="stock"
              value={productToEdit.stock}
              onChange={onChangeStockeHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my="1px">
            <FormLabel>Product Thumbnail</FormLabel>
            <Input
              type="file"
              p={1}
              name="thumbnail"
              onChange={onChangeThumbnail}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Category</FormLabel>
            <select
              onChange={onChangeCategory}
              value={selectedCategory}
              style={{
                width: "400px",
                padding: "5px",
                backgroundColor: "transparent",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
            >
              <option
                value={''}
                disabled
                style={{
                  backgroundColor: "#2D3748",
                  color: "white", // Optional: set text color for better visibility
                }}
              >
                Select an option
              </option>
              {categoriesList.map((cat) => (
                <option
                  value={cat.title}
                  key={cat.id}
                  style={{
                    backgroundColor: "#2D3748",
                  }}
                >
                  {cat.title}
                </option>
              ))}
            </select>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              defaultValue={productToEdit.description}
              onChange={onChangeDesc}
              placeholder="Here is a sample placeholder"
            />
          </FormControl>
        </Box>
      </CustomModal>

      {/* Create Modal */}
      <CustomModal
        isLoading={CreateLoading}
        onOkClick={onCreateClick}
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        okText={"Create"}
        closeText={"Cancel"}
        title={"Create product form"}
      >
        <Box>
          <FormControl my="1px">
            <FormLabel>Product Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={productToEdit.title}
              onChange={onTitleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Price</FormLabel>
            <NumberInput
              name="price"
              value={productToEdit.price}
              onChange={onChangePriceHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl>
            <FormLabel>Product Current Stock</FormLabel>
            <NumberInput
              name="stock"
              value={productToEdit.stock}
              onChange={onChangeStockeHandler}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my="1px">
            <FormLabel>Product Thumbnail</FormLabel>
            <Input
              type="file"
              p={1}
              name="thumbnail"
              onChange={onChangeThumbnail}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Choose a category from the list:</FormLabel>
            <select
              onChange={onChangeCategory}
              value={selectedCategory}
              style={{
                width: "400px",
                padding: "5px",
                backgroundColor: "transparent",
                border: "1px solid gray",
                borderRadius: "5px",
              }}
            >
              <option
                value={''}
                disabled
                style={{
                  backgroundColor: "#2D3748",
                  color: "white", // Optional: set text color for better visibility
                }}
              >
                Select an option
              </option>
              {categoriesList.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.title}
                  style={{
                    backgroundColor: "#2D3748",
                  }}
                >
                  {cat.title}
                </option>
              ))}
            </select>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              defaultValue={productToEdit.description}
              onChange={onChangeDesc}
              placeholder="Here is a sample placeholder"
            />
          </FormControl>
        </Box>
      </CustomModal>
    </>
  );
};

export default DashboardProductsTable;
