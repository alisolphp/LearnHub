# Course Summary: Learn How To Code: Google's Go (golang) Programming Language

* **Platform**: Udemy  
* **Instructor**: Todd McLeod  
* **Rating**: 4.5/5
* **Duration**: ~29.5 hours  
* **Last Updated**: March 2025  
* **Course Link**: [Enroll on Udemy](https://www.udemy.com/course/learn-how-to-code/)

*This document summarizes the key points from the course. I highly recommend watching the full course if you have the opportunity.*

## Before You Get Started
- I summarize key points from useful courses to learn and review quickly.  
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=courses/udemy-learn-how-to-code-googles-go-golang-programming-language)
<!-- LH-BUTTONS:END -->

## Welcome to the Course – Let’s Get Excited About Go!

**Summary**  
Todd kicks things off from his basement with real contagious energy – you can feel he genuinely loves teaching Go. He walks through all the resources you’ll have (code attached to almost every video, a massive course resources section, and his GitHub repo `goestot11/learn-to-code-go-version-three` that contains every example plus extra experiments). He also shows the Go Playground for instant coding and stresses mindset: grit is the #1 predictor of success, imposter syndrome is normal, and we’re all just figuring it out together.

**Example**  
The GitHub repo has folders like `000` for fun stuff` (e.g. a quick script to unzip 150 folders) and numbered folders that match the lectures.

**Link for More Details**: [Ask AI: Welcome to Go Programming](https://alisol.ir/?ai=Welcome%20to%20Go%20Programming%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Why Go? The Three Big Reasons Todd Fell in Love with It

**Summary**  
Go was born at Google because nothing else satisfied their needs. It was designed by absolute legends (Ken Thompson, Rob Pike, Robert Griesemer – the same people who gave us Unix, UTF-8, etc.) starting in 2006–2007, right when multi-core CPUs arrived. Go gives you fast compilation, fast execution like C/C++, and the joy of Python/Ruby plus real concurrency baked in from day one.

**Example**  
Graphics in the lecture show Go sitting perfectly in the sweet spot: fast + fun for humans + efficient concurrency.

**Link for More Details**: [Ask AI: Why Learn Go](https://alisol.ir/?ai=Why%20Learn%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Official Documentation – Your Best Friend Forever

**Summary**  
Todd hammers home: always go to the official docs first (`go.dev`). Key resources: Tour of Go, Effective Go, Language Spec, Standard Library docs, Go by Example, Go Playground. He shows exactly how to navigate them and why random Google results can be dangerous.

**Example**  
Want to see how to do a for loop? Go to `gobyexample.com/for` and copy the exact syntax.

**Link for More Details**: [Ask AI: Go Documentation and Resources](https://alisol.ir/?ai=Go%20Documentation%20and%20Resources%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Format Printing – Saying Hello World with Style

**Summary**  
Deep dive into the `fmt` package: `Print`, `Println`, `Printf`. Learns about verbs (`%v` default, `%T` type, `%s` string, `%d` decimal, `%t` bool, etc.) and escape sequences (`\n`, `\t`).

**Example**  
```go
name := "Kim"
age := 22
fmt.Printf("%s is %d years old\n\tand the type is %T %T", name, age, name, age)
```
Output: `Kim is 22 years old` → tab → `and the type is string int`

**Link for More Details**: [Ask AI: Format Printing in Go](https://alisol.ir/?ai=Format%20Printing%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## How Computers Really Work – Zeros, Ones, and Porch Lights

**Summary**  
Fun analogy: computers are just giant collections of light switches (transistors). One switch → 2 states, two switches → 4 states, eight switches (1 byte) → 256 possible values. Everything (text, images, video) is just clever coding schemes on top of binary.

**Example**  
The power symbol is a 0 inside a 1 – literally “off” and “on”.

**Link for More Details**: [Ask AI: How Computers Work Binary Principles](https://alisol.ir/?ai=How%20Computers%20Work%20Binary%20Principles%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## ASCII → Unicode → UTF-8 – Why Go Loves Emojis

**Summary**  
ASCII = 1 byte → 256 chars (very Western-centric). Unicode assigns every character in every language a unique number. UTF-8 is the clever variable-length encoding that makes it efficient. Go uses UTF-8 natively → native emoji support.

**Example**  
You can literally print `fmt.Println("Hello 🌍")` with no extra work.

**Link for More Details**: [Ask AI: ASCII Unicode and UTF-8 in Go](https://alisol.ir/?ai=ASCII%20Unicode%20and%20UTF-8%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Raw String Literals – When You Want Exact Text

**Summary**  
Use backticks `` ` `` for multi-line strings without escaping. Perfect for SQL, HTML, regex, or just pretty-printing.

**Example**  
```go
fmt.Println(`Line 1
Line 2
    with tabs
Line 3`)
```
prints exactly like that.

**Link for More Details**: [Ask AI: String Literals in Go](https://alisol.ir/?ai=String%20Literals%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Hands-On Exercise 1 – Your First Go Program

**Summary**  
Write a tiny program that prints text with emojis and a raw string literal. Do it in the Go Playground or local editor – Todd shows automatic import with VS Code.

**Example**  
```go
package main
import "fmt"
func main() {
    fmt.Println("I ❤️ Go!")
    fmt.Println(`Raw literal
works great
for multiple lines`)
}
```

**Link for More Details**: [Ask AI: Hands-On Printing with Emojis](https://alisol.ir/?ai=Hands-On%20Printing%20with%20Emojis%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Error Handling in Go – No Exceptions, Just Values

**Summary**  
Go returns errors as values (usually second return value). Check with `if err != nil`. Four common ways: `fmt.Println`, `log.Println` (adds timestamp), `log.Fatalln` (exits with code 1), `panic` (exits with code 2 + stack trace).

**Example**  
```go
f, err := os.Open("missing.txt")
if err != nil {
    log.Fatal(err) // prints timestamp + error and exits
}
```

**Link for More Details**: [Ask AI: Error Handling Basics in Go](https://alisol.ir/?ai=Error%20Handling%20Basics%20in%20Go%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Logging Errors to a File

**Summary**  
Use `log.SetOutput()` to redirect all log messages (including errors) to a file instead of the terminal.

**Example**  
```go
file, _ := os.Create("log.txt")
log.SetOutput(file)
log.Println("This goes to the file!")
```

**Link for More Details**: [Ask AI: Logging Errors to Files](https://alisol.ir/?ai=Logging%20Errors%20to%20Files%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Custom Errors – Make Them Speak Your Language

**Summary**  
`errors.New("message")` or `fmt.Errorf("message %v", value)` for context. Idiomatic to declare package-level errors with `var errWhatever = errors.New(...)`.

**Example**  
```go
var errNegativeSqrt = errors.New("math: square root of negative number")
```

**Link for More Details**: [Ask AI: Creating Custom Errors](https://alisol.ir/?ai=Creating%20Custom%20Errors%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Even Richer Errors – Structs That Implement error

**Summary**  
Create a struct, attach an `Error() string` method → it becomes type `error`. Now you can return latitude/longitude, timestamps, whatever you want along with the message.

**Example**  
```go
type MyError struct { Lat, Long string; Err error }
func (e *MyError) Error() string { return fmt.Sprintf("error at %s,%s: %v", e.Lat, e.Long, e.Err) }
```

**Link for More Details**: [Ask AI: Advanced Custom Errors with Structs](https://alisol.ir/?ai=Advanced%20Custom%20Errors%20with%20Structs%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

## Final Thoughts from Todd

**Summary**  
Todd wraps up with heartfelt congratulations, reminding us that consistent daily action toward our goals turns us into our strongest selves. He shares his other courses and the meditation site heartmindway.com.

**Link for More Details**: [Ask AI: Go Course Wrap-Up and Mindset](https://alisol.ir/?ai=Go%20Course%20Wrap-Up%20and%20Mindset%7CTodd%20McLeod%7CLearn%20How%20To%20Code%3A%20Google%27s%20Go%20%28golang%29%20Programming%20Language)

---

**Original Course**  
[Learn How To Code: Google's Go (golang) Programming Language on Udemy](https://www.udemy.com/course/learn-how-to-code/)

---

**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:  
- Website: [alisol.ir](https://alisol.ir)  
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
