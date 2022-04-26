package com.ieung.receipt.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.converter.YNCodeConverter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "crew",
    uniqueConstraints = {
            @UniqueConstraint(
                    columnNames={"email"}
            )
    }
)
// 회원 테이블
public class Crew extends BaseEntity implements UserDetails {

    // User 테이블의 키값 = 회원의 고유 키값
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_id")
    private long id;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    // 비밀번호
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false, length = 255)
    private String password;

    // 회원 이름
    @Column(nullable = false, length = 64)
    private String name;

    // 푸시 알림 설정 (Y:on, N:off)
    @Convert(converter = YNCodeConverter.class)
    @Column(nullable = false, length = 1, columnDefinition = "varchar(1) default 'Y'")
    private YNCode isAllowedPush;

    // 장비 푸시용 토큰
    @Column(length = 255)
    private String pushToken;

    // 장비 푸시용 토큰
    @Column(length = 255)
    private String refreshToken;

    // =================================================================================================
    // JWT
    // =================================================================================================

    @Column(length = 100)
    private String provider;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    // =================================================================================================

    public void updateNickname(String name){
        this.name = name;
    }

    public void updateIsAllowedPush(YNCode isAllowedPush){
        this.isAllowedPush = isAllowedPush;
    }

    public void updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
    }

    public void updatePushToken(String pushToken){
        this.pushToken = pushToken;
    }
}
