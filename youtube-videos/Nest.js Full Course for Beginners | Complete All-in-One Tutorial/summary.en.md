# Nest.js Full Course for Beginners | Complete All-in-One Tutorial

* **Platform**: YouTube
* **Channel/Creator**: Dave Gray
* **Duration**: 02:59:15
* **Release Date**: Dec 29, 2023
* **Video Link**: [https://www.youtube.com/watch?v=8_X0nSrzrCw](https://www.youtube.com/watch?v=8_X0nSrzrCw)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=47fdb3b8 -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Nest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)
<!-- LH-BUTTONS:END -->

## What is NestJS and Why Use It?
NestJS is a progressive Node.js framework that uses TypeScript by default and follows an opinionated, Angular-inspired architecture (modules, controllers, providers). It sits on top of Express (or Fastify) and brings structure, scalability, and built-in support for things like dependency injection, decorators, and modular design.

Key advantages over plain Express:
- Opinionated → less “spaghetti code” in large apps  
 Built-in TypeScript + decorators  
 Clear separation of concerns (MVC-like)  
 Easy to test and maintain  
 Huge ecosystem and CLI

[Ask AI: What is NestJS and its advantages](https://alisol.ir/?ai=What%20is%20NestJS%20and%20its%20advantages%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Prerequisites
You should already be comfortable with:
- Node.js & Express basics
- TypeScript (classes, interfaces, decorators)
- Object-Oriented Programming (classes, inheritance, constructors)

If any of those feel shaky, pause and brush up first — the course moves fast.

[Ask AI: NestJS prerequisites](https://alisol.ir/?ai=NestJS%20prerequisites%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Project Setup & Nest CLI
```bash
# Install CLI globally
npm i -g @nestjs/cli

# Create new project
nest new project-name
# Choose npm/yarn/pnpm → picks npm by default
```

The CLI generates a ready-to-run TypeScript project with a clean structure.

Run with hot-reload:
```bash
npm run start:dev
```

[Ask AI: NestJS CLI setup](https://alisol.ir/?ai=NestJS%20CLI%20setup%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Core Concepts: Modules, Controllers, Providers
Everything revolves around three building blocks:

- **Module** (@Module) → groups related code
- **Controller** (@Controller) → handles routes & HTTP requests
- **Provider** (@Injectable service) → business logic, injectable anywhere

Generate with CLI:
```bash
nest g module users
nest g controller users
nest g service users
```

The CLI automatically registers them in the module and imports the module into AppModule.

[Ask AI: NestJS modules controllers providers](https://alisol.ir/?ai=NestJS%20modules%20controllers%20providers%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Controllers & Routing in Depth
```ts
@Controller('users')
export class UsersController {
  @Get()
  findAll() { ... }

  @Get(':id')
  findOne(@Param('id') id: string) { ... }

  @Post()
  create(@Body() createUserDto: any) { ... }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) { ... }

  @Delete(':id')
  remove(@Param('id') id: string) { ... }
}
```

Important notes:
- Route order matters — specific routes first, dynamic (:id) later
- Use @Query(), @Param(), @Body() decorators to extract data
- Nest returns proper status codes (201 for POST, etc.)

[Ask AI: NestJS controller routing and decorators](https://alisol.ir/?ai=NestJS%20controller%20routing%20and%20decorators%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Providers / Services & Dependency Injection
Services hold the actual logic and are injected into controllers:

```ts
@Injectable()
export class UsersService {
  private users = [/* mock data */];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') { ... }
  findOne(id: number) { ... }
  create(user: CreateUserDto) { ... }
  update(id: number, updateUserDto: UpdateUserDto) { ... }
  remove(id: number) { ... }
}
```

Controller injection:
```ts
constructor(private readonly usersService: UsersService) {}
```

Nest creates a singleton instance by default → true DI benefits.

[Ask AI: NestJS services and dependency injection](https://alisol.ir/?ai=NestJS%20services%20and%20dependency%20injection%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## DTOs + ValidationPipe (Data Transfer Objects)
Never let raw request bodies hit your service. Use class-validator + class-transformer:

```ts
// create-employee.dto.ts
export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'])
  role: string;
}
```

Enable globally in main.ts:
```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
```

Now bad payloads automatically return 400 with clear messages.

[Ask AI: NestJS DTOs and ValidationPipe](https://alisol.ir/?ai=NestJS%20DTOs%20and%20ValidationPipe%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Prisma Integration (ORM) + Neon Database
Install:
```bash
npm i prisma @prisma/client
npm i -D prisma
npx prisma init
```

Set DATABASE_URL to a PostgreSQL connection string (Neon gives you one).

Define schema.prisma → Employee model → npx prisma generate

Create PrismaService that extends PrismaClient and implements OnModuleInit.

Use in EmployeeService:
```ts
this.prisma.employee.create({ data }) 
this.prisma.employee.findMany({ where: { role } })
```

[Ask AI: NestJS with Prisma and Neon](https://alisol.ir/?ai=NestJS%20with%20Prisma%20and%20Neon%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Full CRUD Generation with Nest CLI + Prisma
```bash
nest g resource employees
# Choose REST API → TypeScript → include CRUD
```

The CLI creates module, controller, service, DTOs and wires everything. Then just replace service methods with Prisma calls → instant type-safe CRUD.

[Ask AI: NestJS CLI resource generation with Prisma](https://alisol.ir/?ai=NestJS%20CLI%20resource%20generation%20with%20Prisma%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

## Global Prefix, CORS, Rate Limiting, Logging & Exception Filters
```ts
// main.ts
app.setGlobalPrefix('api');
app.enableCors(); // or with config object
```

Rate limiting with @nestjs/throttler:
```ts
ThrottlerModule.forRoot({ ttl: 60000, limit:100 })
@Throttle({ default: { ttl: 1000, limit: 3 } })
```

Custom logger extending ConsoleLogger → writes to logs/my-log-file.txt (tab-delimited).

Global exception filter that catches everything, formats consistent JSON errors, logs with context, and handles Prisma validation errors specially (422).

[Ask AI: NestJS global config CORS throttler logger exception filter](https://alisol.ir/?ai=NestJS%20global%20config%20CORS%20throttler%20logger%20exception%20filter%7CDave%20Gray%7CNest.js%20Full%20Course%20for%20Beginners%20%7C%20Complete%20All-in-One%20Tutorial)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
