package com.ioi.haryeom.aws;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Slf4j
@RequiredArgsConstructor
@Service
public class S3Upload {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(String fileName, InputStream inputStream, long contentLength, String contentType) {

        if(amazonS3Client.doesObjectExist(bucket, fileName)){
            amazonS3Client.deleteObject(bucket, fileName);
        }

        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(contentLength);
            metadata.setContentType(contentType);

            amazonS3Client.putObject(bucket, fileName, inputStream, metadata);

            String cloudFrontDomain = "https://d1b632bso7m0wd.cloudfront.net";
//            return amazonS3Client.getUrl(bucket, fileName).toString();
            return cloudFrontDomain + "/" + fileName;
        } catch (Exception e) {
            log.error("S3 업로드 중 오류 발생");
            throw new RuntimeException("S3 업로드 실패");
        }
    }


}
