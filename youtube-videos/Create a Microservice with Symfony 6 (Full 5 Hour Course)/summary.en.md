# Create a Microservice with Symfony 6 (Full 5 Hour Course)

* **Platform**: YouTube
* **Channel/Creator**: Gary Clarke 
* **Duration**: 04:39:57
* **Release Date**: Jul 13, 2022
* **Video Link**: [https://www.youtube.com/watch?v=pZv93AEJhS8](https://www.youtube.com/watch?v=pZv93AEJhS8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course))

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course)) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Create%20a%20Microservice%20with%20Symfony%206%20(Full%205%20Hour%20Course))
<!-- LH-BUTTONS:END -->

## Introduction to Microservices
* **Summary**: Microservices break down applications into loosely coupled services, contrasting with monolithic architectures where everything is in one repo. Monoliths are simple to develop and deploy but suffer from scalability issues, code complexity, and tech stack lock-in. Microservices allow independent development, easier maintenance, and fault isolation but introduce distributed system complexity.
* **Key Takeaway/Example**: Use cloud tools like AWS for networking services. Monoliths scale horizontally behind load balancers, but microservices enable autonomous teams and tech flexibility.
* **Link for More Details**: [Ask AI: Introduction to Microservices](https://alisol.ir/?ai=Introduction%20to%20Microservices%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Building a Promotions Engine Microservice
* **Summary**: The project builds a promotions engine for affiliate marketing, processing requests with data like product ID, location, voucher, date, and quantity to return the best discounted price. It uses Symfony for the framework, focusing on one service that filters and modifies offerings from a database.
* **Key Takeaway/Example**: Example request JSON: {"product_id":1,"quantity":5,"request_location":"UK","voucher_code":"MYDISCOUNT","request_date":"2022-11-25"}. Response includes discounted price and promotion details, like Black Friday sale applying 50% off.
* **Link for More Details**: [Ask AI: Building a Promotions Engine Microservice](https://alisol.ir/?ai=Building%20a%20Promotions%20Engine%20Microservice%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Installing Symfony and Initial Setup
* **Summary**: Install Symfony via CLI or Composer, add dev dependencies like PHPUnit and MakerBundle. Initialize Git, customize .gitignore for PhpStorm and Symfony. Create a basic project structure.
* **Key Takeaway/Example**: Command: `symfony new promotions_engine` or `composer create-project symfony/skeleton promotions_engine`. Use `symfony serve -d` for a local server.
* **Link for More Details**: [Ask AI: Installing Symfony and Initial Setup](https://alisol.ir/?ai=Installing%20Symfony%20and%20Initial%20Setup%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Creating Controllers and Routes
* **Summary**: Set up a ProductsController with a POST route for lowest price enquiries. Use route parameters for product ID. Handle JSON input, deserialize to DTO, and return mocked responses initially for integration.
* **Key Takeaway/Example**: Route attribute: `#[Route('/products/{id}/lowest-price', name: 'lowest_price', methods: 'POST')]`. Grab route param: `public function lowestPrice(int $id, Request $request)`.
* **Link for More Details**: [Ask AI: Creating Controllers and Routes](https://alisol.ir/?ai=Creating%20Controllers%20and%20Routes%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Outside-In Development Approach
* **Summary**: Start from the API response outward to enable early integration with other services. Mock responses, including errors via headers like 'force_fail'. Use DTOs for enquiry data.
* **Key Takeaway/Example**: Return JSON with fields like price, discounted_price. Force error: Add header 'force_fail: 400' to test error handling.
* **Link for More Details**: [Ask AI: Outside-In Development Approach](https://alisol.ir/?ai=Outside-In%20Development%20Approach%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Data Transfer Objects and Serialization
* **Summary**: Create LowestPriceEnquiry DTO implementing PromotionEnquiryInterface. Use Symfony's Serializer for deserialization from JSON to DTO and back, with custom serializer for camelCase to snake_case conversion.
* **Key Takeaway/Example**: Custom DTO serializer with ObjectNormalizer and JsonEncoder. Deserialize: `$serializer->deserialize($request->getContent(), LowestPriceEnquiry::class, 'json')`.
```php
class LowestPriceEnquiry implements PromotionEnquiryInterface, \JsonSerializable {
    private int $productId;
    // getters/setters...
}
```
* **Link for More Details**: [Ask AI: Data Transfer Objects and Serialization](https://alisol.ir/?ai=Data%20Transfer%20Objects%20and%20Serialization%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Promotions Filtering and Modifiers
* **Summary**: Implement PromotionsFilterInterface with apply() method. Create modifiers like FixedPrice, QuantityBased, EvenDateMultiplier, DateRangeMultiplier for applying discounts based on criteria.
* **Key Takeaway/Example**: Chain modifiers: `return $next->modify($price, $quantity, $promotion, $enquiry);`. Example JSON config for promotion: `{"minimum_quantity":2,"operator":">","price":40}`.
* **Link for More Details**: [Ask AI: Promotions Filtering and Modifiers](https://alisol.ir/?ai=Promotions%20Filtering%20and%20Modifiers%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Database Setup with Doctrine
* **Summary**: Install Doctrine, create entities for Product, Promotion, Coupon. Set up relationships, repositories, and fixtures for sample data.
* **Key Takeaway/Example**: Promotion entity: `@ORM\Entity`, fields like name, type, adjustment. Fixtures: Load products and promotions via MakerBundle.
```php
class Promotion {
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
    // ...
}
```
* **Link for More Details**: [Ask AI: Database Setup with Doctrine](https://alisol.ir/?ai=Database%20Setup%20with%20Doctrine%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Enquiry Processing and Caching
* **Summary**: Process enquiries by querying promotions, applying filters and modifiers. Use Redis for caching results to optimize repeated queries.
* **Key Takeaway/Example**: Cache key from enquiry hash. Fetch: `$cache->get($cacheKey, function (ItemInterface $item) use ($enquiry) { /* logic */ });`.
* **Link for More Details**: [Ask AI: Enquiry Processing and Caching](https://alisol.ir/?ai=Enquiry%20Processing%20and%20Caching%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Validation and Event Dispatching
* **Summary**: Add constraints to DTO properties. Dispatch AfterDtoCreatedEvent post-deserialization, validate in subscriber, throw exceptions on failure.
* **Key Takeaway/Example**: Constraints: `#[Assert\Positive] private int $quantity;`. Subscriber: `if (count($errors) > 0) { throw new ServiceException($exceptionData); }`.
* **Link for More Details**: [Ask AI: Validation and Event Dispatching](https://alisol.ir/?ai=Validation%20and%20Event%20Dispatching%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Custom Error Handling
* **Summary**: Create custom exceptions and listener for kernel exceptions. Format responses with type and violations for validation errors. Handle not-found cases in repositories.
* **Key Takeaway/Example**: ExceptionListener: `public function onKernelException(ExceptionEvent $event) { /* create JSON response */ }`. ServiceException with data object for structured errors.
* **Link for More Details**: [Ask AI: Custom Error Handling](https://alisol.ir/?ai=Custom%20Error%20Handling%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

## Integration with Another Service
* **Summary**: Demonstrate integration by creating a front-end service that queries the promotions engine via HTTP client, displaying results or handling errors.
* **Key Takeaway/Example**: Use Symfony HttpClient: `$response = $client->request('POST', $url, ['json' => $data]);`. Render Twig template with promotion data.
* **Link for More Details**: [Ask AI: Integration with Another Service](https://alisol.ir/?ai=Integration%20with%20Another%20Service%7CGary%20Clarke%20%7CCreate%20a%20Microservice%20with%20Symfony%206%20%28Full%205%20Hour%20Course%29)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
