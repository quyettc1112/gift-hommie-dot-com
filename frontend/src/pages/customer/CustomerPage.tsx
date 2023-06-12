import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/header/Header";
import { Route, Routes } from "react-router-dom";
import utilService from "../../services/util-service";
import CustomerShopPage from "./CustomerShopPage";
import CustomerCartPage from "./CustomerCartPage";
import CustomerShopDetailPage from "./CustomerShopDetailPage";
import CustomerCheckoutPage from "./CustomerCheckoutPage";
import CustomerViewProfilePage from "./CustomerViewProfilePage";
import { useState } from 'react'

const CustomerPage = () => {
  const [userId, seUserId] = useState<string>("");

  return (
    <Grid
      templateAreas={{
        base: `"header" "main"`,
      }}
      templateColumns={{
        base: `1fr`,
      }}
      h="100%"
    >
      <GridItem
        area="header"
        position="fixed"
        w="100%"
        backgroundColor="white"
        zIndex={999}
      >
        <Header />
      </GridItem>

      <GridItem area="main" mt={utilService.HEADER_HEIGHT}>
        <Routes>
          <Route index element={<CustomerShopPage />} />
          <Route path="/shop" element={<CustomerShopPage />} />
          <Route path="/shop/detail" element={<CustomerShopDetailPage />} />
          <Route path="/cart" element={<CustomerCartPage />} />
          <Route path="/checkout" element={<CustomerCheckoutPage />} />
          <Route path="/account" element={<CustomerViewProfilePage userId={userId} />} />
        </Routes>
      </GridItem>
    </Grid>
  );
};

export default CustomerPage;
