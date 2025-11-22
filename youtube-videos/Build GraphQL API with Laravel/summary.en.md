# Build GraphQL API with Laravel

* **Platform**: YouTube
* **Channel/Creator**: Icodestuff
* **Duration**: 00:35:02
* **Release Date**: Jan 9, 2022
* **Video Link**: https://www.youtube.com/watch?v=49MjzvXkF58

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to GraphQL
GraphQL serves as a powerful alternative to REST APIs for building robust APIs in Laravel. It allows querying specific data from the frontend without needing custom resources for attributes.
* **Key Takeaway/Example**: The tutorial builds a simple CRUD app to create, read, update, and delete company data, demonstrated in GraphQL Playground where you can query company names or additional fields like domains.
[Ask AI: Introduction to GraphQL](https://alisol.ir/?ai=Introduction%20to%20GraphQL%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Prerequisites and Project Setup
Start with PHP, Composer, NPM (optional), and Docker installed. Use Composer to create a new Laravel project.
* **Key Takeaway/Example**: Run `composer create-project --prefer-dist laravel/laravel graphql-tutorial` to set up the base project.
[Ask AI: Prerequisites and Project Setup](https://alisol.ir/?ai=Prerequisites%20and%20Project%20Setup%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Configuring Laravel Sail
Laravel Sail simplifies Docker setup for local development. Install it via Composer and publish the configuration.
* **Key Takeaway/Example**: Run `composer require laravel/sail --dev`, then `php artisan sail:install` and select MySQL. Create a bash alias for easier commands, and start with `sail up -d`.
[Ask AI: Configuring Laravel Sail](https://alisol.ir/?ai=Configuring%20Laravel%20Sail%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Installing GraphQL Library
Choose between Lighthouse and Rebing for GraphQL in Laravel; Rebing is used here for simplicity.
* **Key Takeaway/Example**: Install with `composer require rebing/graphql-laravel`, then publish the config via `php artisan vendor:publish --provider="Rebing\GraphQL\GraphQLServiceProvider"`.
[Ask AI: Installing GraphQL Library](https://alisol.ir/?ai=Installing%20GraphQL%20Library%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Database Migrations and Models
Create a Company model with migration and factory. Define fields like name, contact email, street address, city, country, and domain.
* **Key Takeaway/Example**: Use `sail artisan make:model Company -m -f`. In the migration, add string columns for each field. Update the model's `$fillable` array and factory with Faker for dummy data.
```php
// Example in CompanyFactory
return [
    'name' => $this->faker->company,
    'contact_email' => $this->faker->companyEmail,
    // ... other fields
];
```
Seed with `Company::factory(15)->create()` and `sail artisan db:seed`.
[Ask AI: Database Migrations and Models](https://alisol.ir/?ai=Database%20Migrations%20and%20Models%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Defining GraphQL Types
Each model needs a corresponding GraphQL type to define its structure.
* **Key Takeaway/Example**: Run `sail artisan make:graphql:type CompanyType`. Define fields matching the model (id as ID, others as non-null strings) and link to the Company model.
```php
// In CompanyType
public function fields(): array
{
    return [
        'id' => ['type' => Type::id(), 'description' => 'The auto-incremented company ID'],
        'name' => ['type' => Type::nonNull(Type::string()), 'description' => 'The name of a company'],
        // ... other fields
    ];
}
```
[Ask AI: Defining GraphQL Types](https://alisol.ir/?ai=Defining%20GraphQL%20Types%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Implementing Queries
Create queries to read single or multiple companies.
* **Key Takeaway/Example**: Run `sail artisan make:graphql:query CompanyQuery` and `CompaniesQuery`. For CompanyQuery, return a single CompanyType by ID with `Company::findOrFail($args['id'])`. For CompaniesQuery, return a list with `Company::all()`. Add to config/graphql.php under queries.
[Ask AI: Implementing Queries](https://alisol.ir/?ai=Implementing%20Queries%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Implementing Mutations
Add mutations for creating, updating, and deleting companies.
* **Key Takeaway/Example**: Create mutations like CreateCompanyMutation (returns CompanyType, uses `Company::create($args)`), UpdateCompanyMutation (find by ID and update), and DeleteCompanyMutation (returns boolean, uses `Company::findOrFail($args['id'])->delete()`). Add to config/graphql.php under mutations.
[Ask AI: Implementing Mutations](https://alisol.ir/?ai=Implementing%20Mutations%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Testing in GraphQL Playground
Access /graphiql to test queries and mutations.
* **Key Takeaway/Example**: Query companies for names and domains. Create a company with fields like name: "Apple", then update or delete by ID. Errors like internal server error occur on invalid IDs.
[Ask AI: Testing in GraphQL Playground](https://alisol.ir/?ai=Testing%20in%20GraphQL%20Playground%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

## Conclusion and Advanced Topics
GraphQL enables flexible frontend querying, used daily in production apps.
* **Key Takeaway/Example**: This covers basic CRUD; future advanced topics include authorization, authentication, subqueries, pagination, and testing.
[Ask AI: Conclusion and Advanced Topics](https://alisol.ir/?ai=Conclusion%20and%20Advanced%20Topics%7CIcodestuff%7CBuild%20GraphQL%20API%20with%20Laravel)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
