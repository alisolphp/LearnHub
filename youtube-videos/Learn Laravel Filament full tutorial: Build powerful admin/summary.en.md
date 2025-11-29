# Learn Laravel Filament full tutorial: Build powerful admin

- **Platform**: YouTube
- **Channel/Creator**: Tony Xhepa
- **Duration**: 04:11:31
- **Release Date**: Sep 29, 2023
- **Video Link**: [https://www.youtube.com/watch?v=6c4jVLWmDYU](https://www.youtube.com/watch?v=6c4jVLWmDYU)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Learn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)
<!-- LH-BUTTONS:END -->

## Project Setup and Filament Installation
- **Summary**: Start by creating a new Laravel project named "filament-tutorial" without a starter kit. Set up the database, run migrations for default tables, and install Filament v3 via Composer. Use the filament:install --panels command to set up panels, forms, tables, and notifications. Create an admin user and access the /admin dashboard.
- **Key Takeaway/Example**: After installation, the dashboard appears with user options like theme switching and logout. No code blocks needed here, but ensure the .env file has the correct DB_DATABASE.
- **Link for More Details**: [Ask AI: Filament Installation](https://alisol.ir/?ai=Filament%20Installation%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Creating Models and Migrations
- **Summary**: Generate models and migrations for Country, State, City, Department, and Employee. Define fields like names, relationships (e.g., State belongs to Country), and constraints like foreign keys with cascade on delete. Run migrations to create tables.
- **Key Takeaway/Example**: For Employee, include fields like first_name, last_name, address, zip_code, date_of_birth, date_hired, and foreign keys to Country, State, City, and Department.
```php
// Example migration for Employee
$table->string('first_name');
$table->string('last_name');
$table->string('middle_name');
$table->string('address');
$table->string('zip_code');
$table->date('date_of_birth');
$table->date('date_hired');
$table->foreignId('country_id')->constrained()->cascadeOnDelete();
```
- **Link for More Details**: [Ask AI: Models and Migrations](https://alisol.ir/?ai=Models%20and%20Migrations%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Generating and Customizing Filament Resources
- **Summary**: Use artisan make:filament-resource to create resources for each model, optionally with --generate for auto-filled forms/tables and --view for view pages. Customize navigation icons, labels, groups, and sorting in resource classes.
- **Key Takeaway/Example**: Group resources like Country, State, City, and Department under "System Management" and set navigation sort orders (e.g., Country at 1, State at 2).
```php
// In CountryResource.php
protected static ?string $navigationIcon = 'heroicon-o-flag';
protected static ?string $navigationGroup = 'System Management';
protected static int $navigationSort = 1;
```
- **Link for More Details**: [Ask AI: Filament Resources](https://alisol.ir/?ai=Filament%20Resources%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Customizing the Dashboard and Theme
- **Summary**: Modify the AdminPanelProvider to change colors, fonts, logos, and favicons. Adjust resource icons and groups for better navigation.
- **Key Takeaway/Example**: Set primary color to indigo and font to Inter for a custom look.
```php
// In AdminPanelProvider.php
->colors([
    'danger' => Color::Red,
    'primary' => Color::Indigo,
])
->font('Inter')
```
- **Link for More Details**: [Ask AI: Dashboard Customization](https://alisol.ir/?ai=Dashboard%20Customization%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Building Forms with Sections and Relationships
- **Summary**: Define form schemas with text inputs, selects, and sections. Use relationships for selects (e.g., State belongsTo Country) and add validation like required() or maxLength(255).
- **Key Takeaway/Example**: Group fields into sections like "User Name" and set column layouts.
```php
// In EmployeeResource.php
Section::make('User Name')
    ->description('Put the user name details here.')
    ->schema([
        TextInput::make('first_name')->required(),
        TextInput::make('last_name')->required(),
    ])->columns(2)
```
- **Link for More Details**: [Ask AI: Filament Forms](https://alisol.ir/?ai=Filament%20Forms%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Dependent Selects and Data Seeding
- **Summary**: Implement dependent dropdowns where State options filter based on selected Country using options() with a closure and get(). Seed countries, states, cities from external data.
- **Key Takeaway/Example**: Clear dependent fields on change with afterStateUpdated().
```php
// Dependent select for State
Select::make('state_id')
    ->live()
    ->options(fn (Get $get): Collection => State::query()
        ->where('country_id', $get('country_id'))
        ->pluck('name', 'id'))
    ->afterStateUpdated(fn (Set $set) => $set('city_id', null))
```
- **Link for More Details**: [Ask AI: Dependent Selects](https://alisol.ir/?ai=Dependent%20Selects%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Customizing Tables and Actions
- **Summary**: Define table columns, filters, and actions like view, edit, delete. Add summaries and customize action labels.
- **Key Takeaway/Example**: Use TextColumn for searchable/sortable fields and add delete actions.
```php
// In EmployeeResource.php
TextColumn::make('first_name')->searchable()->sortable(),
Action::make('delete')->successNotificationTitle('Employee deleted')
```
- **Link for More Details**: [Ask AI: Filament Tables](https://alisol.ir/?ai=Filament%20Tables%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Notifications and Multi-Tenancy
- **Summary**: Override notifications for create/update/delete. Set up multi-tenancy with a Team model, tenant registration/profile pages, and scoped relationships.
- **Key Takeaway/Example**: Use getSavedNotification() to customize messages.
```php
// In EditEmployee.php
protected function getSavedNotification(): ?Notification
{
    return Notification::make()->success()->title('Employee updated');
}
```
- **Link for More Details**: [Ask AI: Notifications and Multi-Tenancy](https://alisol.ir/?ai=Notifications%20and%20Multi-Tenancy%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Multiple Panels and Access Control
- **Summary**: Create an "app" panel alongside "admin". Move tenancy to "app", add registration/login, and use middleware to restrict admin access based on is_admin flag.
- **Key Takeaway/Example**: Add user menu items visible only to admins.
```php
// Middleware for admin access
if (auth()->user() && auth()->user()->is_admin) {
    return $next($request);
} else {
    return redirect('/app');
}
```
- **Link for More Details**: [Ask AI: Multiple Panels](https://alisol.ir/?ai=Multiple%20Panels%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

## Dashboard Widgets
- **Summary**: Create stats overview, chart, and table widgets for dashboards. Scope data to tenants and use Flowbite/Filament-Charts for dynamic charts.
- **Key Takeaway/Example**: Use Trend for monthly employee charts.
```php
// In EmployeeChart.php
protected function getData(): array
{
    $employees = Trend::model(Employee::class)
        ->between(now()->startOfMonth(), now()->endOfMonth())
        ->perDay()->count();
    return ['datasets' => [['label' => 'Employees', 'data' => $employees->map(fn (TrendValue $value) => $value->aggregate)]]];
}
```
- **Link for More Details**: [Ask AI: Filament Widgets](https://alisol.ir/?ai=Filament%20Widgets%7CTony%20Xhepa%7CLearn%20Laravel%20Filament%20full%20tutorial%3A%20Build%20powerful%20admin)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
