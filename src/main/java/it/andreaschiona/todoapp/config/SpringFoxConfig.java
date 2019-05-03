package it.andreaschiona.todoapp.config;


import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import springfox.bean.validators.configuration.BeanValidatorPluginsConfiguration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

/**
 * Created by andrea_s on 08/08/2018.
 *
 * @link https://www.vojtechruzicka.com/documenting-spring-boot-rest-api-swagger-springfox/
 */
@Configuration
@EnableSwagger2
@Import(BeanValidatorPluginsConfiguration.class)
public class SpringFoxConfig {

    @Autowired
    BuildProperties buildProperties;

    @Bean
    public Docket apiDocket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                // Include solo i controller / model nel package/sottopackage
                .apis(RequestHandlerSelectors.basePackage("it.andreaschiona.todoapp.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo(
                "TODO APP Api Documentation",
                "The API for manage the TODO Application",
                StringUtils.contains(buildProperties.getVersion(), "-SNAPSHOT") ?
                        StringUtils.substring(buildProperties.getVersion(), 0, StringUtils.lastIndexOf(buildProperties.getVersion(), "-SNAPSHOT"))
                        :
                        buildProperties.getVersion(),
                "TERMS OF SERVICE URL",
                new Contact("Andrea Schiona", null, null),
                null,
                null,
                Collections.emptyList());
    }
}
