import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Heading,
  Image,
  VStack,
  Text,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import imageService from "../../services/image-service";
import { Link, useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { red } from "@cloudinary/url-gen/actions/adjust";
import CartDTO from "../../type/CartDTO";
import ProductDTO from "../../type/ProductDTO";
import shopProductService, {
  ShopProductDTO,
} from "../../services/shop-product-service";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";

interface Props {
  cart: CartDTO;
  onDelete: (id: number) => void;
}

const CartListItem = ({ cart, onDelete }: Props) => {
  const [product, setProduct] = useState<ShopProductDTO>({} as ShopProductDTO);
  const navigate = useNavigate();

  useEffect(() => {
    shopProductService
      .get(cart.productId)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        navigate("/cart");
      });
  }, []);

  return (
    <Card width="100%" paddingX="6" paddingY="4" border="1px solid #dddd">
      <HStack spacing={4}>
        <Checkbox
          colorScheme="green"
          iconSize="32"
          border="1px solid lightgreen"
          borderRadius="6px"
        ></Checkbox>

        <Image
          boxSize="100px"
          objectFit="cover"
          src={product.avatar || imageService.getDefaultProductAvatarURL()}
        />
        <VStack flex="1" alignItems={"start"} spacing="4" paddingRight="6">
          <Heading fontSize="xl">{product.name}</Heading>

          <HStack
            justifyContent={"space-between"}
            width="100%"
            maxWidth="320px"
          >
            <VStack>
              <Text>Đơn giá</Text>
              <Badge
                colorScheme="blue"
                paddingX="2"
                paddingY="1"
                variant="outline"
                className="none-text-transform"
              >
                {product.price}
              </Badge>
            </VStack>
            <VStack>
              <Text>Số lượng</Text>
              <Badge
                colorScheme="blue"
                // paddingX="2"
                padding="0"
                variant="outline"
                className="none-text-transform"
              >
                <HStack alignItems={"center"} spacing={0}>
                  <Box
                    className="cursor-pointer"
                    _hover={{
                      transform: "scale(1.02)",
                      color: "teal",
                    }}
                  >
                    <AiOutlineMinusSquare size="24px" />
                  </Box>

                  <Input
                    border={"unset"}
                    type="number"
                    defaultValue={cart.quantity}
                    height="22px"
                    width="24px"
                    color="black"
                    fontSize={"16px"}
                    p="0"
                    m="0"
                    textAlign="center"
                  />
                  <Box
                    className="cursor-pointer"
                    _hover={{
                      transform: "scale(1.02)",
                      color: "teal",
                    }}
                  >
                    <AiOutlinePlusSquare size="24px" />
                  </Box>
                </HStack>
              </Badge>
            </VStack>
            <VStack>
              <Text>Thành tiền</Text>
              <Badge
                colorScheme="blue"
                paddingX="2"
                paddingY="1"
                variant="outline"
                className="none-text-transform"
              >
                {product.price * cart.quantity}
              </Badge>
            </VStack>
          </HStack>
          {/* <HStack>
            <Badge fontSize="10" colorScheme="gray" variant="outline">
              {product.categoryName}
            </Badge>

            <Badge fontSize="10" colorScheme="gray" variant="outline">
              Yêu thích
            </Badge>

            <Badge fontSize="10" colorScheme="gray" variant="outline">
              Bán chạy
            </Badge>
          </HStack> */}
        </VStack>

        <Box paddingLeft="4">
          <Button
            variant="outline"
            colorScheme="gray"
            _hover={{
              border: "1px red solid",
              color: "red",
            }}
            p="1"
            onClick={() => {
              onDelete(cart.id);
            }}
          >
            <BsTrash color="inherit" size="16" className="danger-hover" />
          </Button>
        </Box>
      </HStack>
    </Card>
  );
};

export default CartListItem;
