# Magento 2.4 Full Course

* **Platform**: YouTube
* **Channel/Creator**: Max Pronko
* **Duration**: 03:20:23
* **Release Date**: Jun 29, 2023
* **Video Link**: [https://www.youtube.com/watch?v=zq7MoEORLYg](https://www.youtube.com/watch?v=zq7MoEORLYg)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Introduction to Building a Popup Extension
* **Summary**: The video covers building a popup extension for Magento 2, including frontend features like custom JavaScript, CSS, and templates, as well as backend elements such as UI components, grids, forms, database schema, models, and API interfaces. It emphasizes CRUD operations, security, and cookie handling for business logic.
* **Key Takeaway/Example**: Start by creating a new module directory like "majmastery/popup" and set up basic files like module.xml. Use declarative schema for database tables with fields like popup_id, name, content, created_at, updated_at, timeout, and is_active.
```
<schema xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Setup/Declaration/Schema/etc/schema.xsd">
    <table name="majmastery_popup">
        <column xsi:type="int" name="popup_id" padding="10" unsigned="true" nullable="false" identity="true" comment="Popup ID"/>
        <column xsi:type="varchar" name="name" nullable="false" length="255" comment="Name"/>
        <column xsi:type="text" name="content" nullable="false" comment="Content"/>
        <column xsi:type="timestamp" name="created_at" on_update="false" nullable="false" default="CURRENT_TIMESTAMP" comment="Created At"/>
        <column xsi:type="timestamp" name="updated_at" on_update="true" nullable="false" default="CURRENT_TIMESTAMP" comment="Updated At"/>
        <column xsi:type="int" name="timeout" padding="10" unsigned="true" nullable="false" default="0" comment="Timeout"/>
        <column xsi:type="smallint" name="is_active" padding="5" unsigned="true" nullable="false" default="1" comment="Is Active"/>
        <constraint xsi:type="primary" referenceId="PRIMARY">
            <column name="popup_id"/>
        </constraint>
    </table>
</schema>
```
* **Link for More Details**: [Ask AI: Building Popup Extension](https://alisol.ir/?ai=Building%20Popup%20Extension%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Models, Resource Models, and Collections
* **Summary**: Create PHP classes for models, resource models, and collections to handle data from the database table. Implement getters and setters for entity fields like name, content, created_at, updated_at, timeout, and is_active.
* **Key Takeaway/Example**: Extend AbstractModel for the popup model and initialize the resource model. For the resource model, extend AbstractDb and set the main table. Collections extend AbstractCollection for loading data.
```
class Popup extends AbstractModel implements PopupInterface
{
    protected function _construct()
    {
        $this->_init(ResourceModel\Popup::class);
    }

    public function getPopupId(): int
    {
        return (int) $this->getData(self::POPUP_ID);
    }

    // Additional getters/setters for name, content, etc.
}
```
* **Link for More Details**: [Ask AI: Models and Resources](https://alisol.ir/?ai=Models%20and%20Resources%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## API Interfaces and Repositories
* **Summary**: Define interfaces for the popup entity and repository to create a service API. Implement methods like save, getById, and delete in the repository class using the resource model.
* **Key Takeaway/Example**: The repository handles CRUD operations and throws exceptions if entities don't exist.
```
interface PopupRepositoryInterface
{
    public function save(PopupInterface $popup): PopupInterface;
    public function getById(int $popupId): PopupInterface;
    public function delete(PopupInterface $popup): bool;
    // Additional methods
}

class PopupRepository implements PopupRepositoryInterface
{
    private $resource;

    public function __construct(ResourceModel\Popup $resource)
    {
        $this->resource = $resource;
    }

    public function save(PopupInterface $popup): PopupInterface
    {
        $this->resource->save($popup);
        return $popup;
    }

    // Implement getById, delete, etc.
}
```
* **Link for More Details**: [Ask AI: API Interfaces](https://alisol.ir/?ai=API%20Interfaces%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Admin Routes, Menus, and Controllers
* **Summary**: Set up admin routes in routes.xml, add menu items in menu.xml, and create controllers for actions like index to render the popup list page.
* **Key Takeaway/Example**: Use Action controllers extending Backend App Action, set active menu, breadcrumbs, and page titles.
```
class Index extends Action
{
    public function execute()
    {
        $resultPage = $this->resultPageFactory->create();
        $resultPage->setActiveMenu('Majmastery_Popup::popup');
        $resultPage->addBreadcrumb(__('Popups'), __('Popups'));
        $resultPage->getConfig()->getTitle()->prepend(__('Popup Management'));
        return $resultPage;
    }
}
```
* **Link for More Details**: [Ask AI: Admin Routes and Menus](https://alisol.ir/?ai=Admin%20Routes%20and%20Menus%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## UI Components for Grids and Forms
* **Summary**: Configure UI components for grids (listing) and forms using XML files. Include data providers, columns, filters, mass actions, and form fields like name, content, timeout, and is_active.
* **Key Takeaway/Example**: Grid listing XML defines data sources, columns, and actions like edit, delete, enable/disable.
```
<listing xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Ui:etc/ui_configuration.xsd">
    <dataSource name="majmastery_popup_listing_data_source" component="Magento_Ui/js/grid/provider">
        <!-- Data provider config -->
    </dataSource>
    <columns name="majmastery_popup_columns">
        <column name="popup_id">
            <argument name="data" xsi:type="array">
                <item name="config" xsi:type="array">
                    <item name="label" xsi:type="string" translate="true">ID</item>
                </item>
            </argument>
        </column>
        <!-- Additional columns for name, content, etc. -->
    </columns>
</listing>
```
* **Link for More Details**: [Ask AI: UI Components](https://alisol.ir/?ai=UI%20Components%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Data Providers and Mass Actions
* **Summary**: Implement data providers to map database data to UI components. Add mass actions for enable/disable/delete in controllers using collections and filters.
* **Key Takeaway/Example**: Mass disable controller processes selected IDs and updates is_active status.
```
class MassDisable extends Action
{
    public function execute()
    {
        $collection = $this->filter->getCollection($this->collectionFactory->create());
        foreach ($collection as $item) {
            $item->setIsActive(0);
            $this->repository->save($item);
        }
        // Add success message
        return $this->resultRedirectFactory->create()->setPath('*/*/');
    }
}
```
* **Link for More Details**: [Ask AI: Data Providers and Mass Actions](https://alisol.ir/?ai=Data%20Providers%20and%20Mass%20Actions%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Form Saving and Editing
* **Summary**: Create save and edit controllers to handle form submissions, load entities by ID, and persist data using the repository. Include buttons like save, back, and delete in the form UI.
* **Key Takeaway/Example**: Save controller reads post data, sets entity fields, and saves via repository.
```
class Save extends Action
{
    public function execute()
    {
        $data = $this->getRequest()->getPostValue();
        $popup = $this->popupFactory->create();
        if ($id = $this->getRequest()->getParam('popup_id')) {
            $popup = $this->repository->getById($id);
        }
        $popup->setData($data);
        $this->repository->save($popup);
        // Redirect or add message
    }
}
```
* **Link for More Details**: [Ask AI: Form Saving](https://alisol.ir/?ai=Form%20Saving%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Security with ACL
* **Summary**: Define access control lists in acl.xml to restrict admin actions based on user roles for popup management.
* **Key Takeaway/Example**: Resource nodes like "Majmastery_Popup::management" control create, read, update, delete permissions.
```
<acl>
    <resources>
        <resource id="Magento_Backend::admin">
            <resource id="Majmastery_Popup::popup" title="Popup" sortOrder="10">
                <resource id="Majmastery_Popup::management" title="Popup Management" sortOrder="10"/>
            </resource>
        </resource>
    </resources>
</acl>
```
* **Link for More Details**: [Ask AI: ACL Security](https://alisol.ir/?ai=ACL%20Security%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## Frontend Implementation
* **Summary**: Add frontend blocks, templates, and view models to display popups. Use widgets or layout XML to inject content, and manage visibility with cookies and timeouts.
* **Key Takeaway/Example**: View model fetches active popups and passes data to templates. JavaScript handles popup display and cookie setting for expiration.
```
class PopupManagement implements PopupManagementInterface
{
    public function getApplicablePopup(): ?PopupInterface
    {
        $collection = $this->collectionFactory->create();
        $collection->addFieldToFilter('is_active', 1);
        return $collection->getFirstItem();
    }
}
```
* **Link for More Details**: [Ask AI: Frontend Popup](https://alisol.ir/?ai=Frontend%20Popup%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

## JavaScript and Cookie Handling
* **Summary**: Create custom JavaScript components for popup behavior, including triggers, timeouts, and cookie storage to control display frequency.
* **Key Takeaway/Example**: Use jQuery to initialize modals, set timeouts, and manage cookies for expiration in days.
```
define(['jquery', 'uiComponent', 'mage/cookies'], function ($, Component) {
    return Component.extend({
        initialize: function () {
            var self = this;
            setTimeout(function () {
                // Show popup logic
                $.cookie('majmastery_popup_shown', 1, { expires: self.expiration });
            }, this.timeout * 1000);
        }
    });
});
```
* **Link for More Details**: [Ask AI: JS and Cookies](https://alisol.ir/?ai=JS%20and%20Cookies%7CMax%20Pronko%7CMagento%202.4%20Full%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
