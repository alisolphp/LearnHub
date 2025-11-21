# .NET 8 Crash Course | Learn Dotnet, C#, Entity Framework

* **Platform**: YouTube
* **Channel/Creator**: Coderversity
* **Duration**: 01:48:33
* **Release Date**: Sep 1, 2024
* **Video Link**: [https://www.youtube.com/watch?v=z83Tlwh7FDc](https://www.youtube.com/watch?v=z83Tlwh7FDc)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Setting Up the Environment
* **Summary**: Start by installing the .NET 8 SDK from the official site, tailored to your OS like Mac or Windows. Grab Postman for testing HTTP requests later. Use VS Code as your IDE to create a new web API project via the terminal with commands like `dotnet new webapi`.
* **Key Takeaway/Example**: The SDK includes tools for building and running apps. For project creation: run `dotnet new webapi -o ZooSimulator` in your folder.
* **Link for More Details**: [Ask AI: Setting Up .NET Environment](https://alisol.ir/?ai=Setting%20Up%20.NET%20Environment%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## .NET Project Structure
* **Summary**: A .NET project includes key files like Program.cs (entry point with top-level statements), launchSettings.json for configs, appsettings.json for settings, and the .csproj for dependencies.
* **Key Takeaway/Example**: Program.cs handles app startup and middleware. The .csproj defines builds and packages.
* **Link for More Details**: [Ask AI: .NET Project Structure](https://alisol.ir/?ai=.NET%20Project%20Structure%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Object-Oriented Programming Fundamentals
* **Summary**: OOP revolves around classes as blueprints for objects. Cover access modifiers (public, private, protected), abstract classes for shared properties, enums for fixed values, encapsulation for data protection, constructors for initialization, and virtual methods for overriding.
* **Key Takeaway/Example**: Use encapsulation with private fields and public properties. Example: `public string Name { get; private set; }` ensures controlled access.
```csharp
public abstract class Animal
{
    public string Name { get; private set; }
    public MovementType Movement { get; private set; }
    public Animal(string name, MovementType movement)
    {
        Name = name;
        Movement = movement;
    }
    public virtual void MakeSound() => Console.WriteLine("Silence");
}
```
* **Link for More Details**: [Ask AI: OOP in C#](https://alisol.ir/?ai=OOP%20in%20C%23%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Inheritance and Polymorphism
* **Summary**: Inheritance lets child classes (like Eagle inheriting from Animal) reuse parent properties and methods. Polymorphism allows treating child objects as parents, with overrides for specific behavior.
* **Key Takeaway/Example**: Override virtual methods in children. Example: Eagle overrides MakeSound to "Screech".
```csharp
public class Eagle : Animal
{
    public Eagle(MovementType movement, string name) : base(movement, name) { }
    public override void MakeSound() => Console.WriteLine("Screech");
}
```
* **Link for More Details**: [Ask AI: Inheritance and Polymorphism in C#](https://alisol.ir/?ai=Inheritance%20and%20Polymorphism%20in%20C%23%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Defining Domain Models
* **Summary**: Build domain classes like an abstract Animal with properties (ID, Name, MovementType). Create enums for MovementType (Walking, Flying). Derive specific animals like Tiger, Lion, Eagle.
* **Key Takeaway/Example**: Enums simplify fixed options. Example: `public enum MovementType { Walking, Flying }`
* **Link for More Details**: [Ask AI: Domain Models in .NET](https://alisol.ir/?ai=Domain%20Models%20in%20.NET%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Database Setup with Entity Framework Core
* **Summary**: Use Docker for SQL Server on Mac, connect via Azure Data Studio. Set up DbContext, map entities to tables, handle discriminators for inheritance, and convert enums to strings.
* **Key Takeaway/Example**: In DbContext, override OnModelCreating for mappings.
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Animal>().HasDiscriminator<string>("Discriminator")
        .HasValue<Lion>("Lion")
        .HasValue<Tiger>("Tiger")
        .HasValue<Eagle>("Eagle");
    modelBuilder.Entity<Animal>().Property(a => a.Movement).HasConversion<string>();
}
```
* **Link for More Details**: [Ask AI: Entity Framework Core Setup](https://alisol.ir/?ai=Entity%20Framework%20Core%20Setup%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Repository Pattern and Async Programming
* **Summary**: Create interfaces and repos for data access. Use async/await for non-blocking ops, LINQ for queries. Install EF Core packages.
* **Key Takeaway/Example**: Async methods return Task. LINQ example: `context.Animals.Where(a => a.Movement == movementType).ToList()`
* **Link for More Details**: [Ask AI: Repository Pattern and LINQ](https://alisol.ir/?ai=Repository%20Pattern%20and%20LINQ%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Service Layer and Dependency Injection
* **Summary**: Services mediate between repos and API, adding business logic. Use DI for loose coupling, with lifecycles: Transient, Scoped, Singleton.
* **Key Takeaway/Example**: Inject via constructor: `public ZooService(IAnimalRepo repo) { _repo = repo; }` Register: `builder.Services.AddTransient<IZooService, ZooService>();`
* **Link for More Details**: [Ask AI: Dependency Injection in .NET](https://alisol.ir/?ai=Dependency%20Injection%20in%20.NET%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Middlewares and Control Flow
* **Summary**: Middlewares handle requests/responses. Use conditionals (if/else), loops (for/foreach/while), switches for flow.
* **Key Takeaway/Example**: Custom middleware logs requests: `app.UseMiddleware<LoggingMiddleware>();`
* **Link for More Details**: [Ask AI: Middlewares and Flow Control in C#](https://alisol.ir/?ai=Middlewares%20and%20Flow%20Control%20in%20C%23%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Building Minimal APIs
* **Summary**: Minimal APIs simplify endpoints in Program.cs. Define routes for GET/POST, handle JSON, use pattern matching in switches.
* **Key Takeaway/Example**: Route group: `var zooApi = app.MapGroup("/animals");` GET: `zooApi.MapGet("/", async (IZooService service) => await service.GetAllAnimalsFromZooAsync());`
* **Link for More Details**: [Ask AI: Minimal APIs in .NET 8](https://alisol.ir/?ai=Minimal%20APIs%20in%20.NET%208%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

## Testing and Serialization
* **Summary**: Test with Postman. Handle enum serialization with JsonConverter. Run app and verify endpoints.
* **Key Takeaway/Example**: For enums: `[JsonConverter(typeof(JsonStringEnumConverter))]` on enum declaration.
* **Link for More Details**: [Ask AI: Testing APIs and JSON in .NET](https://alisol.ir/?ai=Testing%20APIs%20and%20JSON%20in%20.NET%7CCoderversity%7C.NET%208%20Crash%20Course%20%7C%20Learn%20Dotnet%2C%20C%23%2C%20Entity%20Framework)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
