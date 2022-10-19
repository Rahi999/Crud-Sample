import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Image,
  useDisclosure
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import {
  AddIcon,
  ChatIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  PhoneIcon,
  RepeatIcon
} from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [image, setImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const toast = useToast();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleClick = () => {
    if (name) {
      localStorage.setItem("name", name);
      toast({
        title: "Name Saved",
        description: `Succesfully Saved as ${name}`,
        status: "success",
        duration: 9000,
        isClosable: true
      });
      onClose();
    } else {
      toast({
        title: "Please Enter A Name",
        description: "Didn't Find A Name, Please Enter it",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
        size: "xs"
      });
    }
  };

  const Name = localStorage.getItem("name");

  const getData = () => {
    setLoading(true);
    axios
      .get("https://17ff65.sse.codesandbox.io/Chat_Application")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => setError(true));
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSend = (e) => {
    e.preventDefault();
    const payload = {
      name: "Admin",
      message: message,
      status: false
    };
    setLoading(true);
    axios
      .post("https://17ff65.sse.codesandbox.io/Chat_Application", payload)
      .then((res) => {
        getData();
        setMessage("");
      })
      .catch((err) =>
        toast({
          title: "Error-Occured",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true
        })
      );
    navigate(`#${data.length - 1}`);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://17ff65.sse.codesandbox.io/Chat_Application/${id}`)
      .then((res) => getData())
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error-Occured",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      });
  };

  const handleAllDelete = () => {
    axios
      .delete("https://17ff65.sse.codesandbox.io/Chat_Application/")
      .then((res) => getData())
      .catch((err) => {
        toast({
          title: "Error-Occured",
          description: "Please Try Again",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      });
  };

  //  Scroll to Bottom Fucntionalities

  const bottomRef = useRef(null);
  useEffect(() => {
    // scroll to bottom every time data change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <>
      <div
        id="div"
        style={{
          position: "relative",
          borderRadius: "8px"
        }}
      >
        <label for="inputTag">
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <Avatar
              size="lg"
              title="Set Profile Pic"
              style={{
                cursor: "pointer"
              }}
              src={image ? image : "https://bit.ly/broken-link"}
            />{" "}
            <Box title="Name">
              <Button onClick={onOpen}>
                {Name ? Name : name ? name : "Profile Name"}
              </Button>

              <Modal isOpen={isOpen} onClose={onClose} size="xs">
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Enter profile Name</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>Enter Name </Text>
                    <Input
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Profile Name"
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="ghost" onClick={() => handleClick()}>
                      save
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <Box title="Call">
              <Button id="button">
                <PhoneIcon />{" "}
              </Button>
            </Box>
            <Box title="Chat">
              <Button id="button">
                <ChatIcon />{" "}
              </Button>
            </Box>
            <Box title="Menu">
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    title="More"
                    icon={<ExternalLinkIcon />}
                    command="⌘M"
                  >
                    More
                  </MenuItem>
                  <MenuItem
                    title="Direct Link"
                    icon={<RepeatIcon />}
                    command="⌘⇧D"
                  >
                    Direct Contact Link
                  </MenuItem>

                  <MenuItem
                    onClick={() => handleAllDelete()}
                    title="Delete All Messages"
                    icon={<DeleteIcon />}
                    command="⌘C"
                  >
                    Clear All Messages
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </div>
          <input
            id="inputTag"
            type="file"
            onChange={onImageChange}
            className="filetype"
          />
          <span id="imageName"></span>
        </label>
      </div>

      <div
        style={{
          height: "350px",
          marginTop: "20px",
          overflow: "scroll",
          scrollBehavior: "auto",
          width: "90%"
        }}
      >
        {data &&
          data.map((d) => (
            <div
              id={d.id}
              key={d.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                border: "2px solid teal",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "8px"
              }}
            >
              <p style={{ color: "#6859d1", fontStyle: "italic" }}>
                {d.message}
              </p>
              <Box title="Menu">
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={() => handleDelete(d.id)}
                      title="Delete This Message"
                      icon={<DeleteIcon />}
                      command="⌘D"
                    >
                      Delete This Message
                    </MenuItem>
                    <MenuItem
                      title="Edit All Message"
                      icon={<EditIcon />}
                      command="⌘E"
                    >
                      Edit This Message
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </div>
          ))}
      </div>

      <div
        style={{
          position: "relative",
          borderRadius: "8px"
        }}
      >
        <form onSubmit={(e) => handleSend(e)} style={{ display: "flex" }}>
          <Input
            width="200%"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            value={message}
          />
          {message.length > 0 ? (
            <Avatar
              onClick={() => handleSend()}
              size="md"
              title="Send Message"
              style={{
                cursor: "pointer"
              }}
              src={
                "https://png.pngtree.com/png-clipart/20190613/original/pngtree-send-icon-png-image_3581535.jpg"
              }
            />
          ) : null}
        </form>
      </div>
    </>
  );
};
export default Chat;
