import React, { useEffect, useState } from "react";
import { CiFolderOn, CiFileOn } from "react-icons/ci";
import AddModal from "./AddModal";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaFile, FaFolder } from "react-icons/fa6";

const dummyData = {
  Documents: {
    "Document1.jpg": "Document1.jpg",
    "Document2.jpg": "Document2.jpg",
    "Document3.jpg": "Document3.jpg",
  },
  Desktop: {
    "Screenshot1.jpg": "Screenshot1.jpg",
    "videopal.mp4": "videopal.mp4",
  },
  Downloads: {
    Drivers: {
      "Printerdriver.dmg": "Printerdriver.dmg",
      "cameradriver.dmg": "cameradriver.dmg",
    },
  },
  Applications: {
    "Webstorm.dmg": "Webstorm.dmg",
    "Pycharm.dmg": "Pycharm.dmg",
    "FileZila.dmg": "FileZila.dmg",
    "Mattermost.dmg": "Mattermost.dmg",
  },
  "chromedriver.dmg": "chromedriver.dmg",
};

function FolderStructure() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [stack, setStack] = useState({});
  const [reRenderKey, setReRenderKey] = useState();
  const [selectedAddIcon, setSelectedAddIcon] = useState("");
  const [addParentKey, setAddParentKey] = useState("");
  const [editPlaceholder, setEditPlaceholder] = useState("");

  useEffect(() => {
    setStack(dummyData);
    setReRenderKey(Date.now());
  }, []);

  const handleDelete = (parentKey) => {
    const stackData = stack;
    const keyPath = parentKey.split("_");
    const last = keyPath.pop();
    delete keyPath.reduce((o, k) => o[k] || {}, stackData)[last];
    setStack(stackData);
    setReRenderKey(Date.now());
  };

  const handleAddFolderOrFile = (fileOrFolderName) => {
    const stackData = stack;
    const keyPath = addParentKey.split("_");
    if (selectedAddIcon === "edit") {
      const objKeyValue = keyPath.reduce((o, k) => o[k] || {}, stackData);
      const last = keyPath.pop();
      keyPath.reduce((o, k) => o[k] || {}, stackData)[fileOrFolderName] =
        typeof objKeyValue === "string" ? fileOrFolderName : objKeyValue;
      delete keyPath.reduce((o, k) => o[k] || {}, stackData)[last];
      setSelectedAddIcon("");
    } else {
      const objPath = keyPath.reduce((o, k) => o[k] || {}, stackData);
      console.log({ objPath });
      if (objPath.size) {
        objPath[fileOrFolderName] =
          selectedAddIcon === "file" ? fileOrFolderName : {};
      } else {
        stackData[fileOrFolderName] =
          selectedAddIcon === "file" ? fileOrFolderName : {};
      }
    }
    setStack(stackData);
    onClose();
    setReRenderKey(Date.now());
  };

  const getStructure = (structure, parent) => {
    const ui =
      Object.keys(structure)
        .sort()
        ?.map((item, index) => {
          const itemData = structure[item];
          const parentKey = parent ? `${parent}_${item}` : `${item}`;
          const key = `${parent}_${item}_${index}`;

          if (typeof itemData === "object") {
            return (
              <div key={key}>
                <div
                  style={{
                    paddingLeft: parentKey?.split("_")?.length * 10 || 0,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <CiFolderOn />
                  <span
                    style={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    {item}
                  </span>
                  <Button
                    colorScheme="gray"
                    size="xs"
                    onClick={() => {
                      setEditPlaceholder(item);
                      setAddParentKey(parentKey);
                      setSelectedAddIcon("edit");
                      onOpen();
                    }}
                  >
                    <FaPencilAlt size={10} />
                  </Button>
                  <Button
                    colorScheme="gray"
                    size="xs"
                    mx={1}
                    onClick={() => {
                      handleDelete(parentKey);
                    }}
                  >
                    <MdDeleteForever />
                  </Button>
                  <Button
                    colorScheme="gray"
                    size="xs"
                    onClick={() => {
                      setAddParentKey(parentKey);
                      setSelectedAddIcon("file");
                      onOpen();
                    }}
                  >
                    <FaPlus style={{ marginRight: 3 }} /> <FaFile />
                  </Button>
                  <Button
                    colorScheme="gray"
                    size="xs"
                    ml={1}
                    onClick={() => {
                      setAddParentKey(parentKey);
                      setSelectedAddIcon("folder");
                      onOpen();
                    }}
                  >
                    <FaPlus style={{ marginRight: 3 }} /> <FaFolder />
                  </Button>
                </div>
                <div>{getStructure(itemData, parentKey)}</div>
              </div>
            );
          }

          return (
            <div
              key={key}
              style={{
                paddingLeft: parentKey?.split("_")?.length * 10 || 0,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <CiFileOn />
              <span
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                {item}
              </span>
              <Button
                colorScheme="gray"
                size="xs"
                onClick={() => {
                  setEditPlaceholder(item);
                  setAddParentKey(parentKey);
                  setSelectedAddIcon("edit");
                  onOpen();
                }}
              >
                <FaPencilAlt size={10} />
              </Button>
              <Button
                colorScheme="gray"
                size="xs"
                ml={1}
                onClick={() => {
                  handleDelete(parentKey);
                }}
              >
                <MdDeleteForever />
              </Button>
            </div>
          );
        }) || [];
    return ui;
  };

  return (
    <div style={{ textAlign: "left", padding: 10 }}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <span
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          Folder Structure
        </span>
        <Button
          colorScheme="gray"
          size="xs"
          onClick={() => {
            setAddParentKey("");
            setSelectedAddIcon("file");
            onOpen();
          }}
        >
          <FaPlus style={{ marginRight: 3 }} /> <FaFile />
        </Button>
        <Button
          colorScheme="gray"
          size="xs"
          ml={1}
          onClick={() => {
            setAddParentKey("");
            setSelectedAddIcon("folder");
            onOpen();
          }}
        >
          <FaPlus style={{ marginRight: 3 }} /> <FaFolder />
        </Button>
      </div>
      <div>
        {Object.keys(stack).length ? (
          <div key={reRenderKey}>{getStructure(stack, "")}</div>
        ) : null}
      </div>
      <AddModal
        isOpen={isOpen}
        onClose={onClose}
        header={
          selectedAddIcon === "file"
            ? "Add File"
            : selectedAddIcon === "folder"
            ? "Add Folder"
            : "Edit"
        }
        editPlaceHolder={editPlaceholder}
        onSubmit={handleAddFolderOrFile}
      />
    </div>
  );
}

export default FolderStructure;
