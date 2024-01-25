package com.ioi.haryeom.member.repository;

import com.ioi.haryeom.member.domain.Member;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByOauthId(String oauthId);
}
