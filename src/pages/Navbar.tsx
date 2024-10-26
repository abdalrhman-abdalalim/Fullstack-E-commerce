import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { NavLink as RouterNavLink } from "react-router-dom";
import CookiesService from "../services/CookiesService";
import { RootState, useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import DrawerCart from "../components/DrawerCart";
import {onCloseDrawerAction} from '../app/features/global/globalSlice'


export default function Nav() {
  const cartItems = useSelector((state:RootState)=>state.cart.cartProducts)
  const dispatch= useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const onLogout = () => {
    CookiesService.remove('jwt');
    window.location.reload();
  }
  const onClickCart = () => {
    dispatch(onCloseDrawerAction(true));
  }
  const isJwtExist = CookiesService.get('jwt');
  const Links = ["Dashboard","Products","Team"];
  return (
    <>
      <DrawerCart/>
      <Box
        alignItems={"center"}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack
            mt={"4"}
            pb={4}
            display={"flex"}
            alignItems={"center"}
            fontSize={"15px"}
          >
            <RouterNavLink
              style={{
                marginLeft: "-10px",
                marginRight: "10px",
              }}
              to={"/"}
            >
              My App
            </RouterNavLink>
            <HStack alignItems={"center"}>
              {Links.map((link, index) => (
                <RouterNavLink
                  key={index}
                  style={{ marginRight: "5px" }}
                  to={`${link.toLowerCase()}`}
                >
                  {link}
                </RouterNavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={onClickCart}>Cart ({cartItems.length})</Button>
              {isJwtExist ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <RouterNavLink
                  to="/login"
                  style={{
                    marginTop: "8px",
                  }}
                >
                  Login
                </RouterNavLink>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}