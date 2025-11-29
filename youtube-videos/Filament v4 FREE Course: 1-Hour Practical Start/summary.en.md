# Filament v4 FREE Course: 1-Hour Practical Start!

* **Platform**: YouTube
* **Channel/Creator**: Laravel Daily
* **Duration**: 01:07:42
* **Release Date**: Sep 9, 2025
* **Video Link**: [https://www.youtube.com/watch?v=GXsMX9gI-uI](https://www.youtube.com/watch?v=GXsMX9gI-uI)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start)
<!-- LH-BUTTONS:END -->

## Course Introduction and Promotion
* **Summary**: The course covers Filament v4 from scratch, with the first half (13 lessons up to table actions) released for free in this video. It aims to introduce more people to Filament's capabilities. There's also a promotion for Laravel Daily membership with 40% off, providing access to 80 courses, including AI-related ones, private Discord, and project repositories.
* **Key Takeaway/Example**: Focus on practical Filament usage to help developers adapt in an AI-driven world.
* **Link for More Details**: [Ask AI: Course Introduction and Promotion](https://alisol.ir/?ai=Course%20Introduction%20and%20Promotion|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Installing Filament and Basic Setup
* **Summary**: Start with a fresh Laravel project, create a Product model with migration and seeders. Install Filament using Composer and the Artisan command, which sets up the admin panel at /admin. Locally, any user can log in; create users via seeding or the make:filament-user command.
* **Key Takeaway/Example**: Run `composer require filament/filament:"^4.0" -W` and `php artisan filament:install --panels` to get started. For security in production, implement `canAccessPanel` in the User model to restrict access based on conditions like email or roles.
```php
public function canAccessPanel(FilamentPanel $panel): bool
{
    return $this->email === 'test@example.com';
}
```
* **Link for More Details**: [Ask AI: Installing Filament and Basic Setup](https://alisol.ir/?ai=Installing%20Filament%20and%20Basic%20Setup|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Customizing the Admin Panel
* **Summary**: Customize the panel via `app/Providers/Filament/AdminPanelProvider.php`, including path, colors, and features like registration. Changes like primary color from amber to blue affect UI elements.
* **Key Takeaway/Example**: Enable registration with `$panel->registration(true);`. Adjust colors like `$panel->colors(['primary' => Color::Blue]);` to repaint elements.
* **Link for More Details**: [Ask AI: Customizing the Admin Panel](https://alisol.ir/?ai=Customizing%20the%20Admin%20Panel|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Creating a Filament Resource for Products
* **Summary**: Generate a resource with `php artisan make:filament-resource Product`. This creates a menu item with an empty table and form. Configure columns in `ProductsTable.php` and fields in `ProductForm.php`.
* **Key Takeaway/Example**: Add text columns like `TextColumn::make('name')` and form inputs like `TextInput::make('name')`. After creation, records appear in the table.
* **Link for More Details**: [Ask AI: Creating a Filament Resource for Products](https://alisol.ir/?ai=Creating%20a%20Filament%20Resource%20for%20Products|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Customizing Redirects and Delete Actions
* **Summary**: Override default redirects after create/edit to return to the index table, either per resource or globally in the panel provider. Add delete actions to the table for direct deletion.
* **Key Takeaway/Example**: In `CreateProduct.php`, override `getRedirectUrl()` to `self::getUrl('index')`. Globally: `$panel->resourceCreatePageRedirect('index');`. Add `DeleteAction::make()` to record actions.
* **Link for More Details**: [Ask AI: Customizing Redirects and Delete Actions](https://alisol.ir/?ai=Customizing%20Redirects%20and%20Delete%20Actions|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Form Validation, Sorting, and Searching
* **Summary**: Add validation rules to form fields. Enable sorting and searching on table columns, with options for global or individual search.
* **Key Takeaway/Example**: Use `->required()->unique('products', 'name')` for validation. For columns: `->sortable()->searchable(isIndividual: true, isGlobal: false)`. Default sort with `->defaultSort('name', 'desc')`.
* **Link for More Details**: [Ask AI: Form Validation, Sorting, and Searching](https://alisol.ir/?ai=Form%20Validation%2C%20Sorting%2C%20and%20Searching|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Modifying Values Before Save and Display
* **Summary**: Transform values like storing prices in cents: multiply on save, divide on display. Use mutations in create/edit pages or Eloquent accessors/mutators.
* **Key Takeaway/Example**: In `CreateProduct.php`: `mutateFormDataBeforeCreate(array $data): array { $data['price'] *= 100; return $data; }`. For table: `->money('EUR', divideBy: 100)`. Similar for edit with `mutateFormDataBeforeFill` and `beforeSave`.
* **Link for More Details**: [Ask AI: Modifying Values Before Save and Display](https://alisol.ir/?ai=Modifying%20Values%20Before%20Save%20and%20Display|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Select Inputs and Relationships
* **Summary**: Add select dropdowns from enums or relationships. Display related data in tables automatically, avoiding N+1 queries.
* **Key Takeaway/Example**: For enum: `Select::make('status')->options(ProductStatus::class)`. For relationship: `Select::make('category_id')->relationship('category', 'name')`. Table: `TextColumn::make('category.name')`.
* **Link for More Details**: [Ask AI: Select Inputs and Relationships](https://alisol.ir/?ai=Select%20Inputs%20and%20Relationships|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Modal Table Select for Relationships
* **Summary**: Use a modal table for selecting related records, especially for large lists, with search and pagination.
* **Key Takeaway/Example**: Generate table with `php artisan make:filament-table CategoriesTable --model=Category`. Then: `ModalTableSelect::make('category_id')->relationship('category', 'name')->table(CategoriesTable::class)`.
* **Link for More Details**: [Ask AI: Modal Table Select for Relationships](https://alisol.ir/?ai=Modal%20Table%20Select%20for%20Relationships|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Generating Resources with Flags
* **Summary**: Use flags like `--simple` for modal edits and `--generate` to auto-create columns from the database, including toggleable timestamps.
* **Key Takeaway/Example**: `php artisan make:filament-resource Category --simple --generate`. Adds `TextColumn::make('name')->searchable()` and hidden timestamps.
* **Link for More Details**: [Ask AI: Generating Resources with Flags](https://alisol.ir/?ai=Generating%20Resources%20with%20Flags|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Relationship Counts and Labels
* **Summary**: Display counts of related records in tables. Customize column labels for better readability.
* **Key Takeaway/Example**: `TextColumn::make('products_count')->counts('products')->sortable()`. Add `->label('Products')`.
* **Link for More Details**: [Ask AI: Relationship Counts and Labels](https://alisol.ir/?ai=Relationship%20Counts%20and%20Labels|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Many-to-Many Relationships and Relation Managers
* **Summary**: Handle many-to-many with multi-selects or relation managers for creating/attaching records directly.
* **Key Takeaway/Example**: `Select::make('tags')->relationship('tags', 'name')->multiple()`. For manager: `php artisan make:filament-relation-manager ProductResource tags name --belongs-to-many`, register in `getRelations()`.
* **Link for More Details**: [Ask AI: Many-to-Many Relationships and Relation Managers](https://alisol.ir/?ai=Many-to-Many%20Relationships%20and%20Relation%20Managers|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Table Filters
* **Summary**: Add filters like selects from relationships/enums or custom date ranges. Position them above content for visibility.
* **Key Takeaway/Example**: `SelectFilter::make('category_id')->relationship('category', 'name')`. Custom: `Filter::make('created_at')->schema([DatePicker::make('created_from'), DatePicker::make('created_until')])->query(fn (Builder $query, array $data) => $query->when($data['created_from'], fn ($query) => $query->whereDate('created_at', '>=', $data['created_from']))->when($data['created_until'], fn ($query) => $query->whereDate('created_at', '<=', $data['created_until'])))`.
* **Link for More Details**: [Ask AI: Table Filters](https://alisol.ir/?ai=Table%20Filters|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Column Modifiers for Styling
* **Summary**: Enhance columns with badges, colors from enums, URLs, labels, alignment, and date formatting like "since" for human-readable times.
* **Key Takeaway/Example**: `->badge()->color(fn ($state) => match ($state) { ProductStatus::InStock => 'success', ... })`. Date: `->dateTime('d M Y H:i')` or `->since()`. Align: `->alignRight()`.
* **Link for More Details**: [Ask AI: Column Modifiers for Styling](https://alisol.ir/?ai=Column%20Modifiers%20for%20Styling|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Editable Table Fields
* **Summary**: Make columns editable inline with toggles, checkboxes, selects, or text inputs, including validation.
* **Key Takeaway/Example**: `ToggleColumn::make('is_active')`. Select: `SelectColumn::make('status')->options(ProductStatus::class)->searchable()`. Text: `TextInputColumn::make('name')->rules(['required', 'min:3'])`.
* **Link for More Details**: [Ask AI: Editable Table Fields](https://alisol.ir/?ai=Editable%20Table%20Fields|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Grouping and Summarizing Table Data
* **Summary**: Group rows by columns and add summarizers like sum or average, formatted for money.
* **Key Takeaway/Example**: `->defaultGroup('product.name')`. Summarize: `->summarize(Sum::make()->money('EUR', divideBy: 100))`.
* **Link for More Details**: [Ask AI: Grouping and Summarizing Table Data](https://alisol.ir/?ai=Grouping%20and%20Summarizing%20Table%20Data|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

## Table Actions and Custom Behaviors
* **Summary**: Customize record, bulk, and header actions, including modals, confirmations, and groups to save space. Use icons from Heroicons.
* **Key Takeaway/Example**: Custom: `Action::make('mark_as_completed')->icon('heroicon-o-check')->requiresConfirmation()->action(fn (Order $record) => $record->update(['is_completed' => true]))->hidden(fn ($record) => $record->is_completed)`. Bulk: `BulkAction::make('mark_as_completed')->action(fn (Collection $records) => $records->each->update(['is_completed' => true]))->deselectRecordsAfterCompletion()`. Group: `ActionGroup::make([...])`.
* **Link for More Details**: [Ask AI: Table Actions and Custom Behaviors](https://alisol.ir/?ai=Table%20Actions%20and%20Custom%20Behaviors|Laravel%20Daily|Filament%20v4%20FREE%20Course%3A%201-Hour%20Practical%20Start%21)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
