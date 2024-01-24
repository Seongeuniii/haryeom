package com.ioi.haryeom.auth.service;

import static com.ioi.haryeom.auth.type.LoginType.KAKAO;

import com.ioi.haryeom.auth.dto.OauthAttribute;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class KakaoService {

    @Value("${oauth.kakao.client-id}")
    private String clientId;

    @Value("${oauth.kakao.client-secret}")
    private String clientSecret;

    @Value("${oauth.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${oauth.kakao.scope}")
    private String scope;

    private final String grantType = "authorization_code";

    private final String tokenUri = "https://kauth.kakao.com/oauth/token";

    private final String userInfoUri = "https://kapi.kakao.com/v2/user/me";

    private final String logoutUri = "https://kapi.kakao.com/v1/user/logout";

    public String getToken(String code) throws IOException, ParseException {
        URL url = new URL(tokenUri);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("POST");
        urlConnection.setDoOutput(true);
        
        BufferedWriter bw = new BufferedWriter(
            new OutputStreamWriter(urlConnection.getOutputStream()));
        String sb = "grant_type=" + grantType
            + "&client_id=" + clientId
            + "&redirect_uri=" + redirectUri
            + "&client_secret=" + clientSecret
            + "&code=" + code;

        bw.write(sb);
        bw.flush();

        BufferedReader br = new BufferedReader(
            new InputStreamReader(urlConnection.getInputStream()));
        String line;
        StringBuilder result = new StringBuilder();
        while ((line = br.readLine()) != null) {
            result.append(line);
        }

        JSONParser parser = new JSONParser();
        JSONObject tokenInfo = (JSONObject) parser.parse(result.toString());
        String accessToken = "Bearer " + tokenInfo.get("access_token").toString();

        br.close();
        bw.close();

        return accessToken;
    }


    public OauthAttribute getUserInfo(String accessToken) throws IOException, ParseException {
        URL url = new URL(userInfoUri);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("Authorization", accessToken);
        urlConnection.setRequestMethod("GET");

        BufferedReader br = new BufferedReader(
            new InputStreamReader(urlConnection.getInputStream()));
        String line;
        StringBuilder result = new StringBuilder();
        while ((line = br.readLine()) != null) {
            result.append(line);
        }

        JSONParser parser = new JSONParser();
        JSONObject userInfo = (JSONObject) parser.parse(result.toString());
        JSONObject kakaoAccount = (JSONObject) userInfo.get("kakao_account");
        JSONObject profile = (JSONObject) kakaoAccount.get("profile");

        String oauthId = userInfo.get("id").toString();
        String profileUrl = profile.get("profile_image_url").toString();

        br.close();

        return OauthAttribute.builder()
            .oauthId(oauthId)
            .profileUrl(profileUrl)
            .loginType(KAKAO)
            .build();
    }

    public void logout(Object accessToken) throws IOException {
        URL url = new URL(logoutUri);
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestProperty("Authorization", accessToken.toString());
        urlConnection.setRequestMethod("POST");
    }
}
