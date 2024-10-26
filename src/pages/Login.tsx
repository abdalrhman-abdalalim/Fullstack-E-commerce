import {Flex,Box,FormControl,FormLabel,Input,Checkbox,Stack,Button,Heading,Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAppDispatch } from "../app/store";
import { userLogin } from "../app/features/login";
import { IUser } from "../interfaces";
import { Navigate } from "react-router-dom";

interface IProps {
    isAuthenticated:boolean;
}

export default function Login({isAuthenticated}:IProps) {
    if(!isAuthenticated)return <Navigate to={"/"} replace/>
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const emptyUser: IUser = { identifier: "", password: "" };
    const [user, setUser] = useState<IUser>(emptyUser);
    const [isEmai,setIsEmail]=useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the form from reloading the page
        if(!user.identifier){
            setIsEmail(true);
            if(!user.password){
                setIsPassword(true);
            }
            return;
        }
        
        setIsEmail(false);
        setIsPassword(false);
        dispatch(userLogin(user));
        console.log("Submitted user:", user); // Log the current user state after submission
    };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };


  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          onSubmit={onSubmitHandler}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={onChangeHandler}
                name="identifier"
                type="email"
                value={user.identifier}
                errorBorderColor="crimson"
                border={isEmai ? "red 1px solid" : "gray 1px solid"}
              />
              {isEmai && (
                <FormHelperText color={"red.500"}>
                  Enter Valid Email
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={onChangeHandler}
                  name="password"
                  border={isPassword ? "red 1px solid" : "gray 1px solid"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color={"red.500"}>
                  Enter Valid password
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                type="submit"
                bg={isEmai || isPassword ? "red.500" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: isEmai || isPassword ? "red.600" : "blue.600",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
