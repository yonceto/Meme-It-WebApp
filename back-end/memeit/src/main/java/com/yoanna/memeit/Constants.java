package com.yoanna.memeit;

public class Constants {
    public static final String IMAGE_PATH = "/images/";

    public static final String MEMEIT_DOMAIN_SERVICE_REGISTER_ADDRESS = "https://meme-it-platform-service-api.herokuapp.com"
            + "/domain/register";

    public static final String MEMEIT_DOMAIN_SERVICE_DEREGISTER_ADDRESS_TEMPLATE = "https://meme-it-platform-service-api.herokuapp.com"
            + "/domain/deregister/%s";

    public static final String STATIC_IMAGES_FILE_PATH = System.getProperty( "static.images.file.path",
            "file:///C:/Users/Yoanna/memeit-images/");

    public static final String STATIC_IMAGES_LOCATION = System.getProperty("images.fs.directory",
            "C:\\Users\\Yoanna\\memeit-images");
}
