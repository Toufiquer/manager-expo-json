import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import ScreenWrapper from "@/components/utils/screenWrapper/screen-wrapper";
// import CommonMenuForm from "@/components/utils/menu-form/common-menu-form";
import FirstLoadUI from "@/components/tabs/menu/first-ui";

// import CreateMenu from "./create-menu";
// import DeleteUI from "./delete-ui";

function Menu() {
  const [showUi, setShowUI] = useState("");
  const [currentUIData, setCurrentUIData] = useState({ title: "", item: "" });

  const handleCancel = () => {
    setShowUI("");
  };

  const renderContent = () => {
    switch (showUi) {
      case "createMenu":
        // return <CreateMenu handleCancel={handleCancel} />;
        return <Text>Create menu</Text>;
      case "addMenu":
      case "updateMenu":
        return <Text>common menu form</Text>;
      // return (
      //   <CommonMenuForm
      //     handleCancel={handleCancel}
      //     currentUIData={currentUIData}
      //   />
      // );
      case "deleteMenu":
        return <Text>delete menu</Text>;
      // return (
      //   <DeleteUI handleCancel={handleCancel} currentUIData={currentUIData} />
      // );
      default:
        return (
          <FirstLoadUI
            setShowUI={setShowUI}
            handleCancel={handleCancel}
            setCurrentUIData={setCurrentUIData}
          />
        );
    }
  };

  return (
    <ScreenWrapper>
      <View>{renderContent()}</View>
    </ScreenWrapper>
  );
}

export default Menu;
