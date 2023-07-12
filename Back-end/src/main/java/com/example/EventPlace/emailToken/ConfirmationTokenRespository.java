package com.example.EventPlace.emailToken;

import com.example.EventPlace.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ConfirmationTokenRespository extends JpaRepository<ConfirmationToken, Long> {

    Optional<ConfirmationToken> findByToken(String token);
    @Transactional
    void deleteByUser(User user);

    @Modifying
    @Query("UPDATE ConfirmationToken c SET c.confirmedAt = :confirmedAt WHERE c.token = :token")
    int updateConfirmedAt(@Param("token") String token, @Param("confirmedAt") LocalDateTime confirmedAt);


}
