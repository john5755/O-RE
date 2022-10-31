package io.ssafy.p.k7a504.ore.common.s3;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class S3Service {
    private AmazonS3 s3Client;
    private final String CLOUD_FRONT_DOMAIN_NAME ="test-ppc-bucket.s3.ap-northeast-2.amazonaws.com";

    @Value("${cloud.aws.credentials.accessKey}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secretKey}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String region;

    @PostConstruct
    public void setS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);

        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(this.region)
                .build();
    }

    public String upload(MultipartFile file){
        if(file.isEmpty()){
            throw new CustomException(ErrorCode.IMG_NOT_FOUND);
        }
        String originFileExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        if (!originFileExtension.equalsIgnoreCase(".jpg") && !originFileExtension.equalsIgnoreCase(".png")
                && !originFileExtension.equalsIgnoreCase(".jpeg")) {
            throw new CustomException(ErrorCode.NOT_VALID_FILE_TYPE);
        }

        SimpleDateFormat date = new SimpleDateFormat("yyyymmdd");
        String fileName = date.format(new Date())+"-"+file.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(file.getSize());

        try{
            s3Client.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(),objMeta)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }catch(Exception e){
            throw new CustomException(ErrorCode.IMG_NOT_UPLOAD);
        }

        return s3Client.getUrl(bucket, fileName).toString();
    }

    public boolean delete(String currentFilePath){
        if(!s3Client.doesObjectExist(bucket, currentFilePath)||currentFilePath.equals(null)||currentFilePath.equals("https://ore-s3.s3.ap-northeast-2.amazonaws.com/TeamDefaultImg.png")){
            return true;
        }
        s3Client.deleteObject(bucket, currentFilePath);
        return true;
    }
}
