package com.ieung.receipt.controller;

import com.ieung.receipt.dto.req.TransactionReqDTO;
import com.ieung.receipt.entity.Transaction;
import com.ieung.receipt.service.TransactionService;
import com.ieung.receipt.service.common.CommonResult;
import com.ieung.receipt.service.common.ResponseService;
import com.ieung.receipt.service.common.SingleResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import static com.ieung.receipt.util.TokenUtil.getCurrentCrewId;

@Tag(name = "07. 거래내역")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/spring/club")
public class TransactionController {
    private final TransactionService transactionService;
    private final ResponseService responseService;

//    // 거래내역 등록
//    @Operation(summary = "거래내역 등록", description = "거래내역 등록")
//    @PostMapping(value = "/{clubId}/transaction", produces = MediaType.APPLICATION_JSON_VALUE)
//    public @ResponseBody CommonResult createTransaction(@PathVariable @NotNull Long clubId, @Valid @RequestBody TransactionReqDTO transactionReqDTO) throws Exception {
//         Transaction transaction = transactionService.createTransaction(clubId, getCurrentCrewId(), transactionReqDTO);
//
//         // 알림 로직 추가
//
//        return responseService.getSuccessResult();
//    }
}
