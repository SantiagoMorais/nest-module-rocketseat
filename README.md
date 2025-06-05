# NestJS

## Summary

## Introduction

1. NestJS is a **strongly opinionated framework**, that means that enforces a specific structure, design patterns, and conventions to promote consistency and scalability in applications.

2. By convention, NestJS filenames include descriptive suffixes like .`controller.ts`, .`module.ts`, and .`service.ts` to reflect their roles in the application structure.

3. NestJS uses decorators, and we can create custom decorators, which are functions that receive a target (like a class or method parameter) and return it, possibly with added behavior or metadata.

4. There many types of decorators, such as:
   - **Class decorators** (`@Controller()`, `@Injectable()`): Add metadata to a class to define its role in the application, like marking it as a controller or a service provider.
   - **Method decorators** (`@Get()`, `@Post()`): Specify the HTTP method and route a controller method should handle, like GET or POST requests.
   - **Property decorators** (`@Inject()`, `@HostParam()`): Inject dependencies or metadata into class properties, allowing NestJS to resolve and assign values automatically.
   - **Parameter decorators** (`@Param()`, `@Body()`): Extract specific parts of the request and pass them as arguments to controller methods, like route parameters or request bodies.

## Modules

[Modules NestJS Documentation](https://docs.nestjs.com/modules)

- The `app.module` is our project root.
- A module brings it all together, such as all controllers, database communications, configurations, etc.
- It's possible to divide our application into more modules to get better organization.
- Normally is a empty class with the `@Module()` decorator above it

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- I must declare all controllers dependencies into providers array, example:

```ts
@Injectable() // Marks this class as a provider that can be injected as a dependency
export class AppService {}
// Any class that should be injected (like a service) must be decorated with @Injectable()

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // AppService is injected as a dependency into this controller
}

@Module({
  controllers: [AppController],
  providers: [AppService], // The service must be listed here to be available for injection
})
export class AppModule {}
```

### Imports and Exports

- **`imports`**: used to include other modules that this module depends on.
- **`exports`**: allows other modules to use the providers declared here.

**Example**:

```ts
@Module({
  providers: [UserService],
  exports: [UserService], // makes UserService available to other modules
})
export class UserModule {}

@Module({
  imports: [UserModule], // imports UserModule and can use UserService
})
export class AppModule {}
```

### When to split a module:

- When a group of features has its own logic (e.g., `PrismaModule`, `HttpModule`, `EnvModule`);
- To reuse logic across multiple modules;
- To keep the codebase more organized and modular.

## Services and Providers

[Providers NestJS Documentation](https://docs.nestjs.com/providers)

- In NestJS, **services are a kind of provider**—but any class that can be injected is a provider.
- Common examples of providers: services, database handlers, and use case classes.
- Only controllers handle HTTP requests; everything else (like business logic or database access) is a provider.

```ts
@Injectable()
export class AppService {}

@Module({
  providers: [AppService], // Declare it here to make it available for injection
})
export class AppModule {}
```

## Controllers

[Controllers NestJS Documentation](https://docs.nestjs.com/controllers)

- They act as the entry point for incoming HTTP requests, forwarding them to the appropriate application layers like services, use cases, or entities.

## Pipes

[Pipes NestJS Documentation](https://docs.nestjs.com/Pipes)

- Pipes are classes that handle transformation or validation of data before it reaches the route handler.
- They work similarly to ExpressJS middlewares but are specific to method parameters or body data.

### What makes a class a Pipe?

To be considered a Pipe in NestJS, a class must:

- Implement the `PipeTransform` interface.
- Contain a `transform(value: unknown)` method.
- Be applied using the `@UsePipes()` decorator (globally, on a controller, or on a route handler)

Example:

```ts
@Injectable()
export class MyPipe implements PipeTransform {
  transform(value: unknown) {
    // validate or transform value here
    return value;
  }
}
```

### Example: ZodValidationPipe

This custom Pipe uses `Zod` to validate the request body. If validation fails, it throws a `BadRequestException`.

```ts
@Controller("/accounts")
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @Post()
  create() {
    // Only runs if the body passes the schema validation
  }
}
```

## Important topics:

- **ConfigModule:**
- ConfigModule for environment variables validation
  Helps load and validate environment variables, ensuring your app configuration is reliable and secure.  
  [ConfigModule example](https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example)

- **Guards**:  
  Used to protect routes by controlling access based on conditions like authentication or roles.  
  Protecting routes with [Guards](https://docs.nestjs.com/guards).

- **Testing with Vitest and SWC:**  
  Configuring [Vitest with SWC](https://docs.nestjs.com/recipes/swc#vitest)

- **Interceptors:**  
  Allow you to modify incoming requests or outgoing responses, useful for logging, transforming data, or handling errors globally.  
  [NestJS Interceptors Docs](https://docs.nestjs.com/interceptors)

## Extra topics:

- **Presenters:**  
  Format and prepare data from the domain layer to be sent to the user interface or API response.
  Example:

```ts
import { Question } from "@/domain/forum/enterprise/entities/question";

// Question here has details that is not necessary to be shown in specific routes, so we simplify the result to the frontend
export class QuestionPresenter {
  static toHTTP(question: Question) {
    return {
      id: question.id.toValue(),
      title: question.title,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toValue(),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
```

- **Gateways:**  
  Interfaces or adapters that handle communication between the application and external systems (e.g., databases, APIs).

- **Stubs:**  
  Simplified implementations or mocks of components used during testing or development to simulate behavior.

  - Examples: InMemoryRepositories for testing; FakeFunctions as fake-hasher of BCrypt.

- **Mappers:**  
  Convert data between domain entities and external data formats (e.g., database models or APIs), ensuring separation between domain logic and infrastructure details.

  Example:  
  A `PrismaStudentMapper` translates a Prisma database user object into a `Student` domain entity and vice versa.
