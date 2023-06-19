import { Button, HStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import OrderDTO from "../../type/OrderDTO";
import { GLOBAL_CONTEXT } from "../../App";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../services/customer-order-service";
import cartActionSerivce from "../../services/cart-action-service";
import CartDTO from "../../type/CartDTO";
import Swal from "sweetalert2";

const CustomerOrderActions = ({
  order,
  setOrder,
}: {
  order: OrderDTO;
  setOrder: (order: OrderDTO) => void;
}) => {
  const globalContext = useContext(GLOBAL_CONTEXT);
  const navigate = useNavigate();
  const status = order.status;
  const onCancel = async () => {
    Swal.fire({
      title: "Bạn có muốn hủy đơn hàng?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "orange",
      cancelButtonColor: "gray",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        order.status = "CANCELLED";
        const orderDTO = await updateOrder(order);
        if (order === orderDTO) {
          alert("Không thể hủy đơn hàng.");
          order.status = "PENDING";
        } else {
          setOrder(orderDTO);
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Đã hủy đơn hàng.",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  return (
    <HStack w="100%" justifyContent={"right"} p="4">
      {status == "SUCCESSFUL" && <Button colorScheme="blue">Đánh giá</Button>}

      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          globalContext.orderContext.setOrderId(order.id);
          navigate("/order/detail");
        }}
      >
        Chi tiết
      </Button>

      {status == "SUCCESSFUL" && (
        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            order.orderDetails.forEach(async (od) => {
              let cart = await cartActionSerivce.addToCart(od.product.id, 0);

              cart.quantity = od.quantity;
              cart = await cartActionSerivce.updateCart(cart);

              globalContext.selectedCartContext.addItem(cart);
              navigate("/cart");
            });
          }}
        >
          Mua lại
        </Button>
      )}
      {["PENDING", "DELIVERYING"].includes(status) && (
        <Button
          background="gray.600"
          color="white"
          isDisabled={true}
          _hover={{
            background: "gray.600",
            color: "white",
          }}
        >
          Chờ
        </Button>
      )}
      {status == "PENDING" && (
        <Button colorScheme="red" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
      )}
    </HStack>
  );
};

export default CustomerOrderActions;
