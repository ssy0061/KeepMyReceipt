package com.ieung.receipt.service;

import com.ieung.receipt.code.YNCode;
import com.ieung.receipt.entity.User;
import com.ieung.receipt.exception.ApiMessageException;
import com.ieung.receipt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SignService {
    private final UserRepository userRepository;


    /**
     * id로 회원정보 조회
     * @param id
     * @return
     * @throws Exception
     */
    public User findUserById(long id) throws Exception{
        User user = userRepository.findById(id).orElseThrow( () -> new ApiMessageException("존재하지 않는 회원정보입니다.") );
        return user;
    }

    /**
     * uid로 user 조회
     * @param uid
     * @return
     * @throws Exception
     */
    public User findByUid(String uid, YNCode isBind) throws Exception{
        return userRepository.findByUid(uid, isBind);
    }


    /**
     * 회원가입 후 userId 리턴
     * @param user
     * @return
     */
    @Transactional(readOnly = false)
    public long userSignUp(User user){
        User signUpUser = userRepository.save(user);
        return signUpUser.getId();
    }

}


















































