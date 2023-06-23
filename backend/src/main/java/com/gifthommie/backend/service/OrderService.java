package com.gifthommie.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.gifthommie.backend.dto.APIPageableResponseDTO;
import com.gifthommie.backend.dto.CheckOutDTO;
import com.gifthommie.backend.dto.OrderDTO;
import com.gifthommie.backend.dto.OrderResponseDTO;
import com.gifthommie.backend.dto.RevenueDTO;
import com.gifthommie.backend.entity.Orders;

import net.bytebuddy.asm.Advice.Local;

public interface OrderService {
	
	public Orders getOrderByOrderId(Integer orderId);
	
	public List<Orders> getOrderListWithoutStatus(String[] tmp);
	
	public Orders save(CheckOutDTO checkOutDTO, String email);
	
	public APIPageableResponseDTO<Orders> getOrderList(Integer pageNo, Integer pageSize, String email);

	public void setStatusOfOrderById(int orderId, String status);
	
	APIPageableResponseDTO<Orders> getPageableOrder(Integer pageNo, Integer pageSize, String status);
	APIPageableResponseDTO<OrderDTO> getOrderDTOList(Integer pageNo, Integer pageSize, String email, String status);
	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize) ;
	
	public Orders save(Orders order);
	
//	public Double getRevenueOfWeek(String date);
	
	public OrderDTO getOrderDTOByOrderId(int orderId);

	public APIPageableResponseDTO<OrderDTO> getOrderDTOList_noEmail(Integer pageNo, Integer pageSize, String status);
}
