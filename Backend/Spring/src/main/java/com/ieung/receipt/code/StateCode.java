package com.ieung.receipt.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
// 처리 상태 타입으로 사용될 코드값
public enum StateCode implements BaseEnumCode<String> {
    REQUEST("신청"),
    APPROVE("승인"),
    REFUSAL("거절");

    private final String value;
}
