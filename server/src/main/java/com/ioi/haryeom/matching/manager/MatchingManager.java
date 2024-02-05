package com.ioi.haryeom.matching.manager;

import com.ioi.haryeom.auth.exception.MatchingOperationException;
import com.ioi.haryeom.matching.dto.CreateMatchingResponse;
import com.ioi.haryeom.matching.dto.RespondToMatchingResponse;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MatchingManager {

    private final RedisTemplate<String, Object> redisTemplate;

    // 매칭 요청
    private static final String MATCHING_REQUEST_NAME = "matching:request:";
    private static final String MATCHING_REQUEST_CHAT_ROOM_NAME = "matching:request:chatRoom:";
    private static final String CHAT_ROOM_MATCHING_REQUEST_NAME = "chatRoom:matching:request:";
    // 매칭 응답
    private static final String MATCHING_RESPONSE_CHAT_ROOM_NAME = "matching:response:chatRoom:";

    /**
     * 과외 매칭 요청 정보
     */
    // 매칭 요청 추가
    public void addMatchingRequest(String matchingId, Long chatRoomId, CreateMatchingResponse matchingResponse) {
        try {
            redisTemplate.opsForValue().set(MATCHING_REQUEST_NAME + matchingId, matchingResponse);
            redisTemplate.opsForValue().set(MATCHING_REQUEST_CHAT_ROOM_NAME + chatRoomId, matchingId);
            redisTemplate.opsForValue().set(CHAT_ROOM_MATCHING_REQUEST_NAME + matchingId, chatRoomId);
        } catch (Exception e) {
            throw new MatchingOperationException("매칭 요청 정보를 추가하는데 실패했습니다.", e);
        }
    }

    // 매칭 요청 조회
    public CreateMatchingResponse getMatchingRequestByMatchingId(String matchingId) {
        return (CreateMatchingResponse) redisTemplate.opsForValue().get(MATCHING_REQUEST_NAME + matchingId);
    }

    public CreateMatchingResponse getMatchingRequestByChatRoomId(Long chatRoomId) {
        String matchingId = (String) redisTemplate.opsForValue().get(MATCHING_REQUEST_CHAT_ROOM_NAME + chatRoomId);
        return (CreateMatchingResponse) redisTemplate.opsForValue().get(MATCHING_REQUEST_NAME + matchingId);
    }

    // 매칭 요청 삭제
    public void removeMatchingRequestByMatchingId(String matchingId) {
        try {
            Integer chatRoomId = (Integer) redisTemplate.opsForValue().get(CHAT_ROOM_MATCHING_REQUEST_NAME + matchingId);
            if (chatRoomId != null) {
                redisTemplate.delete(MATCHING_REQUEST_CHAT_ROOM_NAME + chatRoomId);
                redisTemplate.delete(MATCHING_REQUEST_NAME + matchingId);
                redisTemplate.delete(CHAT_ROOM_MATCHING_REQUEST_NAME + matchingId);
            }
        } catch (Exception e) {
            throw new MatchingOperationException("매칭 요청 정보를 제거하는데 실패했습니다.", e);
        }
    }

    public Long getChatRoomId(String matchingId) {
        Integer chatRoomId = (Integer) redisTemplate.opsForValue().get(CHAT_ROOM_MATCHING_REQUEST_NAME + matchingId);
        return Objects.requireNonNull(chatRoomId).longValue();
    }

    // 매칭 존재 여부 확인
    public boolean existsMatchingRequestByChatRoomId(Long chatRoomId) {
        String matchingId = (String) redisTemplate.opsForValue().get(MATCHING_REQUEST_CHAT_ROOM_NAME + chatRoomId);
        return matchingId != null && Boolean.TRUE.equals(redisTemplate.hasKey(MATCHING_REQUEST_NAME + matchingId));
    }


    /**
     * 과외 매칭 응답 정보
     */
    // 매칭 응답 추가
    public void addMatchingResponse(Long chatRoomId, RespondToMatchingResponse matchingResponse) {
        redisTemplate.opsForList().rightPush(MATCHING_RESPONSE_CHAT_ROOM_NAME + chatRoomId, matchingResponse);
    }

    // 매칭 응답 조회
    @SuppressWarnings("unchecked")
    public List<RespondToMatchingResponse> getMatchingResponseByChatRoomId(Long chatRoomId) {
        List<Object> rawData = redisTemplate.opsForList().range(MATCHING_RESPONSE_CHAT_ROOM_NAME + chatRoomId, 0, -1);
        return Objects.requireNonNull(rawData).stream()
            .map(data -> (RespondToMatchingResponse) data)
            .collect(Collectors.toList());
    }


    // 매칭 마지막 응답 조회
    public RespondToMatchingResponse getLastMatchingResponse(Long chatRoomId) {
        return (RespondToMatchingResponse) redisTemplate.opsForList().index(MATCHING_RESPONSE_CHAT_ROOM_NAME + chatRoomId, -1);
    }

    // 매칭 마지막 삭제
    public void removeLastMatchingResponse(Long chatRoomId) {
        redisTemplate.opsForList().rightPop(MATCHING_RESPONSE_CHAT_ROOM_NAME + chatRoomId);
    }
}
