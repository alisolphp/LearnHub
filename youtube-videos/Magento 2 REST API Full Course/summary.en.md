# Magento 2 REST API Full Course

* **Platform**: YouTube
* **Channel/Creator**: Max Pronko
* **Duration**: 00:53:57
* **Release Date**: Dec 4, 2023
* **Video Link**: [https://www.youtube.com/watch?v=yWjoqM5rWDA](https://www.youtube.com/watch?v=yWjoqM5rWDA)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Magento%202%20REST%20API%20Full%20Course)
<!-- LH-BUTTONS:END -->

## Introduction to REST API in Magento 2
Magento 2 uses REST API to connect with third-party systems, allowing custom endpoints for extensions. Focus on creating CRUD operations (Create, Read, Update, Delete) using webapi.xml and PHP classes/interfaces. Tools include Magento Open Source 2.4.6, Postman for requests, and Cloudways for hosting. Builds on a popup extension from a prior course.
- **Key Takeaway**: Ensure your entity has service interfaces like PopupRepositoryInterface for methods such as save, delete, getById, and getList.
- [Ask AI: Introduction to REST API in Magento 2](https://alisol.ir/?ai=Introduction%20to%20REST%20API%20in%20Magento%202%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Setting Up Interfaces and Services
For API support, create interfaces and their implementations in the extension. PopupRepositoryInterface handles CRUD methods, implemented by a service class. If missing, add getList for listing entities. Use di.xml for preferences mapping interfaces to classes.
- **Key Takeaway**: Implement all public methods in the service class, like PopupRepository, and ensure proper PHP doc blocks for types.
- [Ask AI: Setting Up Interfaces and Services](https://alisol.ir/?ai=Setting%20Up%20Interfaces%20and%20Services%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Configuring webapi.xml
webapi.xml maps endpoints to services, specifying HTTP methods, resources for ACL, and interfaces. Draw from examples like the CMS module. For the popup entity, define routes for operations, using anonymous access or specific permissions.
- **Key Takeaway**: Routes like /V1/magemastery/popup/:popupId tie to methods like getById, with ACL resources for access control.
```xml
<route url="/V1/magemastery/popup/:popupId" method="GET">
    <service class="MageMastery\Popup\Api\PopupRepositoryInterface" method="getById"/>
    <resources><resource ref="anonymous"/></resources>
</route>
```
- [Ask AI: Configuring webapi.xml](https://alisol.ir/?ai=Configuring%20webapi.xml%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Implementing GET (Read) Operation
For reading a popup by ID, use GET on /V1/magemastery/popup/:popupId. The getById method returns the popup data or throws an exception if not found. Test in developer mode for error traces.
- **Key Takeaway**: Ensure interface methods like getById return the correct type, such as PopupInterface, and handle non-existent IDs gracefully.
- [Ask AI: Implementing GET (Read) Operation](https://alisol.ir/?ai=Implementing%20GET%20(Read)%20Operation%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Implementing PUT (Update) and POST (Create) Operations
Use PUT on /V1/magemastery/popup/:popupId for updates and POST on /V1/magemastery/popup for creates, both mapping to the save method. JSON body includes fields like name, content, and is_active (as integer). Returns the entity ID.
- **Key Takeaway**: Fix type mismatches, like using is_active as boolean but passing integer. Update timestamps automatically on save.
- [Ask AI: Implementing PUT (Update) and POST (Create) Operations](https://alisol.ir/?ai=Implementing%20PUT%20(Update)%20and%20POST%20(Create)%20Operations%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Implementing DELETE Operation
DELETE on /V1/magemastery/popup/:popupId uses the deleteById method, returning true on success. Verify by attempting a GET afterward, which should fail if deleted.
- **Key Takeaway**: Method returns boolean; ensure ID is integer in PHP docs.
- [Ask AI: Implementing DELETE Operation](https://alisol.ir/?ai=Implementing%20DELETE%20Operation%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Implementing GET List (Search) Operation
GET on /V1/magemastery/popup/search uses getList with SearchCriteriaInterface. Implement in repository using collection factory, processor, and search results factory. Returns array of popups with total count.
- **Key Takeaway**: Add SearchResultsInterface with getItems/setItems, and process collections for filters.
```php
public function getList(SearchCriteriaInterface $searchCriteria): SearchResultsInterface
{
    $collection = $this->popupCollectionFactory->create();
    $this->collectionProcessor->process($searchCriteria, $collection);
    $searchResults = $this->searchResultsFactory->create();
    $searchResults->setSearchCriteria($searchCriteria);
    $searchResults->setItems($collection->getItems());
    $searchResults->setTotalCount($collection->getSize());
    return $searchResults;
}
```
- [Ask AI: Implementing GET List (Search) Operation](https://alisol.ir/?ai=Implementing%20GET%20List%20(Search)%20Operation%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Testing with Postman
Use Postman to send GET, POST, PUT, DELETE requests to local or remote endpoints. JSON bodies for create/update; check database changes via phpMyAdmin. Clear cache if needed.
- **Key Takeaway**: Developer mode shows errors; ensure JSON format matches interface expectations.
- [Ask AI: Testing with Postman](https://alisol.ir/?ai=Testing%20with%20Postman%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Deploying to Cloud Hosting
Deploy extensions to Cloudways via SSH: Add Git repos to composer.json, require packages, enable modules, run setup:upgrade. Test APIs on the production URL.
- **Key Takeaway**: Use master credentials for SSH; share access for team testing.
- [Ask AI: Deploying to Cloud Hosting](https://alisol.ir/?ai=Deploying%20to%20Cloud%20Hosting%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

## Conclusion and Recommendations
Wrap up by testing on remote servers and sharing. Check related videos on Cloudways setup and prior popup course for context.
- **Key Takeaway**: Subscribe, like, and share for more Magento customizations.
- [Ask AI: Conclusion and Recommendations](https://alisol.ir/?ai=Conclusion%20and%20Recommendations%7CMax%20Pronko%7CMagento%202%20REST%20API%20Full%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
