# Spring Boot Soap Web Service Example

* **Platform**: YouTube
* **Channel/Creator**: Cameron McKenzie
* **Duration**: 00:25:27
* **Release Date**: Oct 14, 2024
* **Video Link**: [https://www.youtube.com/watch?v=MIDEXcU-Bmg](https://www.youtube.com/watch?v=MIDEXcU-Bmg)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Spring%20Boot%20Soap%20Web%20Service%20Example)
<!-- LH-BUTTONS:END -->

## Introduction to SOAP Web Services in Spring Boot
* **Summary**: SOAP-based web services still have a role in modern Java architectures, and Spring Boot makes building them straightforward, similar to RESTful services. The tutorial focuses on creating a simple SOAP service for an online rock-paper-scissors game to track user scores.
* **Key Takeaway/Example**: Start with a top-down approach using an XSD file to define methods and data, then generate Java beans and endpoints.
* **Link for More Details**: [Ask AI: Introduction to SOAP in Spring Boot](https://alisol.ir/?ai=Introduction%20to%20SOAP%20in%20Spring%20Boot|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Creating the Spring Boot Project
* **Summary**: Begin by setting up a new Maven-based Spring Boot project in your IDE, naming it appropriately and adding essential dependencies like Spring Boot DevTools and Spring Web Services for SOAP support.
* **Key Takeaway/Example**: Use the group ID com.mcz.spring.soap and version 1.0, then proceed to add configurations.
* **Link for More Details**: [Ask AI: Creating Spring Boot Project](https://alisol.ir/?ai=Creating%20Spring%20Boot%20Project|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Defining the XSD Schema
* **Summary**: Create an XSD file in the resources folder to outline the web service structure, including requests and responses for getting user scores with wins, losses, and ties.
* **Key Takeaway/Example**: The XSD defines elements like getScoreRequest (with user name) and getScoreResponse (with score details), using namespace http://soap.j2ee.mcnz.com.
```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://soap.j2ee.mcnz.com" targetNamespace="http://soap.j2ee.mcnz.com">
  <!-- Define getScoreRequest, getScoreResponse, and score elements here -->
</xs:schema>
```
* **Link for More Details**: [Ask AI: Defining XSD Schema](https://alisol.ir/?ai=Defining%20XSD%20Schema|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Configuring POM for JAXB and Code Generation
* **Summary**: Update the POM file to include the JAX-WS dependency and a JAXB Maven plugin to generate Java classes from the XSD.
* **Key Takeaway/Example**: Add jaxws-rt dependency and the jaxb2-maven-plugin with execution to process score.xsd and generate classes in com.mcnz.j2ee.soap package.
```xml
<plugin>
  <groupId>org.codehaus.mojo</groupId>
  <artifactId>jaxb2-maven-plugin</artifactId>
  <version>3.2.0</version>
  <executions>
    <execution>
      <id>xjc</id>
      <goals><goal>xjc</goal></goals>
      <configuration>
        <sources><source>src/main/resources/score.xsd</source></sources>
        <packageName>com.mcnz.j2ee.soap</packageName>
      </configuration>
    </execution>
  </executions>
</plugin>
```
* **Link for More Details**: [Ask AI: Configuring POM for JAXB](https://alisol.ir/?ai=Configuring%20POM%20for%20JAXB|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Generating Java Classes
* **Summary**: After POM updates, build the project to auto-generate Java beans like GetScoreRequest, GetScoreResponse, and Score based on the XSD namespace.
* **Key Takeaway/Example**: Classes include fields like username, wins, losses, and ties in the Score object.
* **Link for More Details**: [Ask AI: Generating Java Classes from XSD](https://alisol.ir/?ai=Generating%20Java%20Classes%20from%20XSD|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Implementing the SOAP Endpoint
* **Summary**: Create an endpoint class to handle incoming SOAP requests, process the user name, and return a score response with mocked data (e.g., database lookup simulation).
* **Key Takeaway/Example**: Use @Endpoint and @PayloadRoot annotations, then in the method, check the user and set score values accordingly.
```java
@Endpoint
public class ScoreEndpoint {
  @PayloadRoot(namespace = "http://soap.j2ee.mcnz.com", localPart = "getScoreRequest")
  @ResponsePayload
  public GetScoreResponse getScore(@RequestPayload GetScoreRequest request) {
    GetScoreResponse response = new GetScoreResponse();
    Score score = new Score();
    if (request.getUser().equalsIgnoreCase("scrumptuous")) {
      score.setWins(100);
    } else {
      score.setWins(99);
      score.setLosses(66);
      score.setTies(7);
    }
    score.setUser(request.getUser());
    response.setScore(score);
    return response;
  }
}
```
* **Link for More Details**: [Ask AI: Implementing SOAP Endpoint](https://alisol.ir/?ai=Implementing%20SOAP%20Endpoint|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Configuring Web Service Servlet
* **Summary**: Add a configuration class extending WsConfigurerAdapter to set up the message dispatcher servlet, schema, and default WSDL.
* **Key Takeaway/Example**: Enable WS, configure servlet for /ws/*, and define beans for XSD and WSDL.
```java
@Configuration
@EnableWs
public class WebServiceConfiguration extends WsConfigurerAdapter {
  @Bean
  public ServletRegistrationBean<MessageDispatcherServlet> messageDispatcherServlet(ApplicationContext applicationContext) {
    MessageDispatcherServlet servlet = new MessageDispatcherServlet();
    servlet.setApplicationContext(applicationContext);
    servlet.setTransformWsdlLocations(true);
    return new ServletRegistrationBean<>(servlet, "/ws/*");
  }

  @Bean(name = "score")
  public DefaultWsdl11Definition defaultWsdl11Definition(XsdSchema scoreSchema) {
    DefaultWsdl11Definition wsdl11Definition = new DefaultWsdl11Definition();
    wsdl11Definition.setPortTypeName("ScorePort");
    wsdl11Definition.setLocationUri("/ws");
    wsdl11Definition.setTargetNamespace("http://soap.j2ee.mcnz.com");
    wsdl11Definition.setSchema(scoreSchema);
    return wsdl11Definition;
  }

  @Bean
  public XsdSchema scoreSchema() {
    return new SimpleXsdSchema(new ClassPathResource("score.xsd"));
  }
}
```
* **Link for More Details**: [Ask AI: Configuring Web Service Servlet](https://alisol.ir/?ai=Configuring%20Web%20Service%20Servlet|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

## Testing the SOAP Service
* **Summary**: Run the application, access the WSDL via browser (localhost:8080/ws/score.wsdl), and test requests using SoapUI by importing the WSDL and sending user names like "scrumptuous" or others to verify responses.
* **Key Takeaway/Example**: SoapUI generates XML requests; responses show score data as set in the endpoint.
* **Link for More Details**: [Ask AI: Testing SOAP Service](https://alisol.ir/?ai=Testing%20SOAP%20Service|Cameron%20McKenzie|Spring%20Boot%20Soap%20Web%20Service%20Example)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
