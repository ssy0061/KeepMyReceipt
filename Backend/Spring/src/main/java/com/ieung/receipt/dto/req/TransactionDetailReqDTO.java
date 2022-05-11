package com.ieung.receipt.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDetailReqDTO {
    @NotBlank
    @Schema(description = "항목명", required = true, example = "축구공")
    private String name;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "개수", required = true, example = "1")
    private int count;

    @NotNull
    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "단가", required = true, example = "15000")
    private int price;

    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "태그 id", example = "1")
    private Long tagId;

    @NumberFormat(style = NumberFormat.Style.NUMBER)
    @Schema(description = "분류 id", example = "1")
    private Long categoryId;
}
