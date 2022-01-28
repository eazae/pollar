package com.ssafy.pollar.model.service;

import com.ssafy.pollar.domain.entity.Category;
import com.ssafy.pollar.domain.entity.User;
import com.ssafy.pollar.domain.entity.UserCategory;
import com.ssafy.pollar.model.dto.UserDto;
import com.ssafy.pollar.model.repository.CategoryRepository;
import com.ssafy.pollar.model.repository.UserRepository;
import com.ssafy.pollar.model.repository.UserCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserCategoryRepository userCategoryRepository;
    private final CategoryRepository categoryRepository;



    @Override
    public void signup(UserDto userDto) throws Exception {


        User user = User.builder()
//                .uid(userDto.getUid())
                .userId(userDto.getUserId())
                .password(userDto.getPassword())
                .userNickname(userDto.getUserNickname())
                .userEmail(userDto.getUserEmail())
                .userBirthday(userDto.getUserBirthday())
                .userSex(userDto.getUserSex())
                .build();
        // User에 user 정보 저장
        userRepository.save(user);

        // User가 선택한 카테고리별 Id를 찾아서 User Id와 함께 UserCategory에 추가
       for (long categoryId : userDto.getCategories()){
            Category category = categoryRepository.findById(categoryId).get();
            userCategoryRepository.save(UserCategory.builder()
                    .userCategory(user)
                    .category(category)
                    .build());
        }
    }

    @Override
    public boolean idCheck(String userId) throws Exception {
        if(userRepository.findByUserId(userId).isPresent()){//아이디가 있는경우
            return false;
        }else{//아이디가 없는경우
            return true;
        }
    }

    @Override
    public boolean nicknameCheck(String userNickname) throws Exception {
        if(userRepository.findByUserNickname(userNickname).isPresent()){//아이디가 있는경우
            return false;
        }else{//닉네임이 없는경우
            return true;
        }
    }

    @Override
    public boolean emailCheck(String userEmail) throws Exception {
        if(userRepository.findByUserEmail(userEmail).isPresent()){//아이디가 있는경우
            return false;
        }else{//이메일이 없는경우
            return true;
        }
    }

    //회원정보 수정
    @Override
    public void modifyUserInfo(UserDto userDto) throws Exception{
        User usercur = userRepository.findByUserId(userDto.getUserId()).get();

        User user = User.builder()
                .uid(usercur.getUid())
                .userId(usercur.getUserId())
                .password(usercur.getPassword())
                .userNickname((userDto.getUserNickname()))
                .userEmail((userDto.getUserEmail()))
                .userBirthday((userDto.getUserBirthday()))
                .userSex((userDto.getUserSex()))
                .userProfilePhoto(userDto.getUserProfilePhoto())
                .build();

        // User에 user 정보 저장
        userRepository.save(user);
    }

    @Override
    public void deleteUserInfo(String userId) throws Exception {
        Optional<User> user = userRepository.findByUserId(userId);

        userRepository.delete(user.get());
    }

    @Override
    public boolean login(UserDto userDto) throws Exception {
        if(userDto.getUserId() == null || userDto.getPassword()==null){
            return false;
        }else{
            if(!userRepository.findByUserIdAndPassword(userDto.getUserId(),userDto.getPassword()).isPresent()){
                return false;
            }else{
                return true;
            }
        }

    }


}
