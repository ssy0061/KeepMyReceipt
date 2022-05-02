package com.ieung.receipt.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
// 처리 상태 타입으로 사용될 코드값
public enum StateCode implements BaseEnumCode<String> {
    REQ("Request"),
    A("Approve"),
    REF("Refusal"),
    REQUEST("Request"),
    APP("Approve"),
    APPROVE("Approve"),
    REFUSAL("Refusal");

    private final String value;
}
