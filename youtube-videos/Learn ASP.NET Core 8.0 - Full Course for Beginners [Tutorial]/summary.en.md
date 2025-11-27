# Learn ASP.NET Core 8.0 - Full Course for Beginners [Tutorial]

* **Platform**: YouTube
* **Channel/Creator**: Evan Gudmestad
* **Duration**: 03:39:59
* **Release Date**: Jul 24, 2024
* **Video Link**: [https://www.youtube.com/watch?v=f63mo1ZRobM](https://www.youtube.com/watch?v=f63mo1ZRobM)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b47981dc -->

### AI-Powered buttons

Start teaching this to a:
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer) 

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Learn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)
<!-- LH-BUTTONS:END -->

## Introduction to the Tutorial
* **Summary**: The tutorial focuses on building a minimum viable project (MVP) for CRUD operations in ASP.NET Core 8.0 using a decoupled architecture with Blazor on the frontend and a RESTful API on the backend. It condenses typical long tutorials into about 3.5 hours, emphasizing efficiency for beginners while covering data persistence in a SQL Server database.
* **Key Takeaway/Example**: Use Blazor for a responsive single-page app feel, similar to React or Angular, and separate concerns for backend (API) and frontend developers. Data validation occurs on both ends, with Bootstrap for UI styling.
* **Link for More Details**: [Ask AI: ASP.NET Core MVP Setup](https://alisol.ir/?ai=ASP.NET%20Core%20MVP%20Setup%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Tools and Project Setup
* **Summary**: Start with Visual Studio Community 2022, installing the ASP.NET and web development workload. Create an empty ASP.NET Core Web API project for the backend, placed in a folder like "FullStackMovies", and run it to verify "Hello World" output.
* **Key Takeaway/Example**: No prior knowledge of HTML, CSS, JavaScript, or C# is required, but familiarity helps. The setup ensures a clean slate without excess template code.
* **Link for More Details**: [Ask AI: Visual Studio ASP.NET Setup](https://alisol.ir/?ai=Visual%20Studio%20ASP.NET%20Setup%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Creating Entities and Database with Entity Framework
* **Summary**: Install Entity Framework Core Tools and SQL Server provider via NuGet. Define Movie and Genre classes as entities with properties like ID, Name, Price, ReleaseDate, and a one-to-one relationship via navigation and foreign key properties. Configure the connection string in appsettings.json for localDB, set up MovieContext as DbContext, and seed initial data.
* **Key Takeaway/Example**: Use data annotations for validation (e.g., [Required], [MaxLength(50)], [Range(1, 100)]). Run migrations with "add-migration Initial" and "update-database" to create tables and insert seed data.
```csharp
public class Movie
{
    public int Id { get; set; }
    [Required, MaxLength(50)]
    public string Name { get; set; }
    [Required, Range(1, 100)]
    public decimal Price { get; set; }
    public DateOnly ReleaseDate { get; set; }
    [ValidateNever]
    public Genre Genre { get; set; }
    public int GenreId { get; set; }
}
```
* **Link for More Details**: [Ask AI: Entity Framework Entities](https://alisol.ir/?ai=Entity%20Framework%20Entities%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## RESTful API Principles and Endpoints
* **Summary**: Quick overview of REST principles: stateless HTTP requests for resources using GET, POST, PUT, DELETE (CRUD), with status codes and URI conventions. Create MoviesEndpoints class with extension methods for routes like /movies (GET all), /movies/{id} (GET by ID, PUT update, DELETE), and POST for adding. Use dependency injection for MovieContext.
* **Key Takeaway/Example**: Handle not found with Results.NotFound() for GET by ID. Add validation with MinimalApis.Extensions. Test endpoints using VS HTTP files or Postman.
```csharp
group.MapGet("/{id}", async (MovieContext movieContext, int id) =>
{
    var movie = await movieContext.Movies.Include(m => m.Genre).FirstOrDefaultAsync(m => m.Id == id);
    return movie is null ? Results.NotFound() : Results.Ok(movie);
});
```
* **Link for More Details**: [Ask AI: RESTful API Endpoints](https://alisol.ir/?ai=RESTful%20API%20Endpoints%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Setting Up Blazor Frontend
* **Summary**: Create a Blazor Web App project, configure services in Program.cs with AddHttpClient for MoviesClient and GenresClient to call API endpoints. Use dependency injection to pass clients to components.
* **Key Takeaway/Example**: Set base address in Program.cs for API calls. Render mode set to InteractiveServer for dynamic interactions.
```csharp
builder.Services.AddHttpClient<MoviesClient>(client => client.BaseAddress = new Uri("https://localhost:7027/"));
```
* **Link for More Details**: [Ask AI: Blazor Project Setup](https://alisol.ir/?ai=Blazor%20Project%20Setup%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Implementing Read Operation in Blazor
* **Summary**: In Home.razor, inject MoviesClient, load movies on initialization, and display in Bootstrap cards with grid system for responsiveness. Fetch data asynchronously from API.
* **Key Takeaway/Example**: Use @foreach to loop movies into cards showing name, genre, price, and release date. Handle loading state with conditional rendering.
```razor
@if (movies == null)
{
    <p class="text-center">Loading...</p>
}
else
{
    <div class="row row-cols-1 row-cols-md-3 g-4">
        @foreach (var movie in movies)
        {
            <div class="card text-center border-primary">
                <!-- Card content -->
            </div>
        }
    </div>
}
```
* **Link for More Details**: [Ask AI: Blazor Read Operation](https://alisol.ir/?ai=Blazor%20Read%20Operation%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Customizing Navbar with Bootstrap
* **Summary**: Modify NavMenu.razor to use Bootstrap navbar across the top, remove sidebar, add CDN for Bootstrap JS and icons. Adjust CSS and disable launch browser in properties.
* **Key Takeaway/Example**: Add links like "Add Movie" to /add-edit-movie. Use data-bs-theme="dark" for styling.
* **Link for More Details**: [Ask AI: Bootstrap Navbar in Blazor](https://alisol.ir/?ai=Bootstrap%20Navbar%20in%20Blazor%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Implementing Add and Edit Operations
* **Summary**: Create AddEdit.razor component for both add (/add-edit-movie) and edit (/add-edit-movie/{id}). Use EditForm with binding and validation from data annotations. Fetch genres for dropdown. Handle submit to call API POST or PUT.
* **Key Takeaway/Example**: Differentiate add/edit via route parameter. Use floating labels and input types (text, select, number, date).
```razor
<EditForm Model="@movie" OnValidSubmit="HandleSubmitAsync" FormName="add-edit-movie">
    <ValidationSummary />
    <!-- Form fields -->
    <button type="submit" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-secondary" @onclick="() => navigationManager.NavigateTo("/")">Cancel</button>
</EditForm>
```
* **Link for More Details**: [Ask AI: Blazor Add Edit Forms](https://alisol.ir/?ai=Blazor%20Add%20Edit%20Forms%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Implementing Delete Operation with Modal
* **Summary**: Add DeleteMovie.razor as child component in Home.razor, passing movie parameter. Use Bootstrap modal for confirmation, triggered by button with dynamic ID. On confirm, call API DELETE and navigate home.
* **Key Takeaway/Example**: Generate unique modal IDs like "delete-modal-{movie.Id}". Wire @onclick to async delete method.
```razor
<div class="modal fade" id="@DeleteMovie.GetModalId(movie)" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Delete Movie: @movie.Name</h5>
            </div>
            <!-- Footer with buttons -->
        </div>
    </div>
</div>
```
* **Link for More Details**: [Ask AI: Blazor Delete Modal](https://alisol.ir/?ai=Blazor%20Delete%20Modal%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

## Conclusion and Final Demo
* **Summary**: The app now supports full CRUD: reading movies in cards, adding/editing via forms, and deleting with modal confirmation. Data persists in SQL Server localDB.
* **Key Takeaway/Example**: Troubleshoot issues like hot reload failures or null references by rebooting and checking dependencies. The decoupled setup allows focused development on frontend or backend.
* **Link for More Details**: [Ask AI: ASP.NET Core CRUD Demo](https://alisol.ir/?ai=ASP.NET%20Core%20CRUD%20Demo%7CEvan%20Gudmestad%7CLearn%20ASP.NET%20Core%208.0%20-%20Full%20Course%20for%20Beginners%20%5BTutorial%5D)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
