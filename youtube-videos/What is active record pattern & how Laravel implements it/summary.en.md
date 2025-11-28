# What is active record pattern & how Laravel implements it

* **Platform**: YouTube
* **Channel/Creator**: Program With Gio
* **Duration**: 00:36:28
* **Release Date**: Apr 26, 2022
* **Video Link**: [https://www.youtube.com/watch?v=ZRdgVuIppYQ](https://www.youtube.com/watch?v=ZRdgVuIppYQ)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=005796ea -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/What%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)
<!-- LH-BUTTONS:END -->

## Introduction to Active Record Pattern
Active Record ties objects directly to database rows, where each object instance represents a single row in a table. Creating an object and saving it adds a row to the table, while updating the object updates the row. The class wraps accessor methods or properties for each column.

Unlike Data Mapper, where persistence is handled separately (like with Doctrine's EntityManager), Active Record objects handle database operations themselves, including save and update methods.

[Ask AI: Active Record Pattern](https://alisol.ir/?ai=Active%20Record%20Pattern%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Differences from Data Mapper Pattern
In Data Mapper (e.g., Doctrine ORM), entities are plain PHP objects without database logic—persistence uses a separate service like EntityManager. Active Record integrates database access into the objects, allowing them to perform queries and persist data directly.

Eloquent in Laravel follows Active Record, contrasting with Doctrine's separation of concerns.

[Ask AI: Active Record vs Data Mapper](https://alisol.ir/?ai=Active%20Record%20vs%20Data%20Mapper%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Installing and Setting Up Eloquent
Eloquent can be used standalone outside Laravel by installing illuminate/database and illuminate/events via Composer. Use CapsuleManager to set up connections with environment variables for database details like host, username, password, and database name.

Set the event dispatcher, make the capsule global, and boot Eloquent. This setup mimics Laravel's boot process but keeps it simple for non-Laravel projects.

```php
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;
$capsule->addConnection([
    'driver' => 'mysql',
    'host' => env('DB_HOST'),
    'database' => env('DB_NAME'),
    'username' => env('DB_USER'),
    'password' => env('DB_PASS'),
    // additional options
]);
$capsule->setEventDispatcher(new Illuminate\Events\Dispatcher);
$capsule->setAsGlobal();
$capsule->bootEloquent();
```

[Ask AI: Setting Up Eloquent](https://alisol.ir/?ai=Setting%20Up%20Eloquent%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Creating Eloquent Models
Models extend Illuminate\Database\Eloquent\Model. Conventions handle table names (e.g., Invoice becomes 'invoices'), primary keys (assumes 'id' as auto-incrementing integer), and timestamps (created_at, updated_at).

Override properties like $table, $primaryKey, $incrementing, $keyType, or $timestamps if needed. For tables without updated_at, set const UPDATED_AT = null.

Add docblocks for properties to aid IDE autocompletion, as properties use magic getters/setters.

```php
class Invoice extends Model
{
    protected $table = 'invoices'; // optional if following convention
    const UPDATED_AT = null;

    /**
     * @property int $id
     * @property string $invoice_number
     * @property float $amount
     * @property InvoiceStatus $status
     * @property \Carbon\Carbon $created_at
     * @property \Carbon\Carbon $due_date
     */
}
```

[Ask AI: Eloquent Models](https://alisol.ir/?ai=Eloquent%20Models%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Defining Relationships
Use hasMany for one-to-many (e.g., Invoice has many InvoiceItems) and belongsTo for the inverse.

Conventions assume foreign keys like invoice_id. Override if needed.

```php
// In Invoice model
public function items()
{
    return $this->hasMany(InvoiceItem::class);
}

// In InvoiceItem model
public function invoice()
{
    return $this->belongsTo(Invoice::class);
}
```

[Ask AI: Eloquent Relationships](https://alisol.ir/?ai=Eloquent%20Relationships%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Creating and Saving Models
Set properties directly (they map to table columns via magic). Use Carbon for dates.

Associate related models with associate() on belongsTo relationships. Call save() to persist.

Wrap in transactions using Capsule::connection()->transaction() for consistency.

```php
$invoice = new Invoice();
$invoice->amount = 45;
$invoice->invoice_number = '1';
$invoice->status = InvoiceStatus::Pending;
$invoice->due_date = Carbon::now()->addDays(10);

Capsule::connection()->transaction(function () use ($invoice) {
    $invoice->save();
    foreach ($items as $itemData) {
        $item = new InvoiceItem();
        $item->description = $itemData['description'];
        $item->quantity = $itemData['quantity'];
        $item->unit_price = $itemData['unit_price'];
        $item->invoice()->associate($invoice);
        $item->save();
    }
});
```

[Ask AI: Creating Eloquent Models](https://alisol.ir/?ai=Creating%20Eloquent%20Models%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Updating Models
Update via query builder: Model::query()->where('id', $id)->update(['status' => InvoiceStatus::Paid]).

Or load model, set properties, and save(). Use push() to update model and relationships.

Static calls like Invoice::where() use magic __callStatic and __call to forward to builder.

[Ask AI: Updating in Eloquent](https://alisol.ir/?ai=Updating%20in%20Eloquent%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Query Building with Eloquent
Use Model::query() for fluent builders: where(), get() returns Collection of models.

Iterate with each() or foreach. Access properties like dates with format().

Base builder from Capsule::table() returns stdClass objects, not models.

Eloquent builder composes base builder for model hydration.

[Ask AI: Eloquent Query Builder](https://alisol.ir/?ai=Eloquent%20Query%20Builder%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Casting Attributes
Override $casts array for type casting: dates to datetime, status to enum.

Ensures proper hydration, e.g., status as enum object, not integer.

```php
protected $casts = [
    'created_at' => 'datetime',
    'due_date' => 'datetime',
    'status' => InvoiceStatus::class,
];
```

[Ask AI: Attribute Casting in Eloquent](https://alisol.ir/?ai=Attribute%20Casting%20in%20Eloquent%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Accessing and Updating Related Models
Access relationships as properties: $invoice->items returns Collection.

Use first() on builder for efficiency (limits query) vs on Collection.

Update related: $item->description = 'foo'; $item->save(). Or $invoice->push() for parent and relations.

[Ask AI: Related Models in Eloquent](https://alisol.ir/?ai=Related%20Models%20in%20Eloquent%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Deleting Models
Call delete() on model instance or builder: $item->delete() or $invoice->items()->where(...)->delete().

[Ask AI: Deleting in Eloquent](https://alisol.ir/?ai=Deleting%20in%20Eloquent%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

## Security Considerations
Eloquent binds parameters to prevent SQL injection, but raw queries or untrusted data in non-placeholder spots need caution. Use allow lists for dynamic columns from user input.

[Ask AI: Eloquent Security](https://alisol.ir/?ai=Eloquent%20Security%7CProgram%20With%20Gio%7CWhat%20is%20active%20record%20pattern%20%26%20how%20Laravel%20implements%20it)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
