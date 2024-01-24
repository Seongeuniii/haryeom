package com.ioi.haryeom.member.repository;

import com.ioi.haryeom.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
