package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class TransactionDetailReqDTO {
    @NotBlank
    @Schema(description = "내용", required = true, example = "축구공")
    private String content;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "개수", required = true, example = "1")
    private int count;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "단가", required = true, example = "15000")
    private int price;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "태그2 id", required = true, example = "1")
    private Long tagId;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "소분류 id", required = true, example = "1")
    private Long categoryId;


}
