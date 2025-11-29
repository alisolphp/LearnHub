# Build a gRPC server with Go - Step by step tutorial

* **Platform**: YouTube
* **Channel/Creator**: Maximilien Andile
* **Duration**: 00:26:35
* **Release Date**: Nov 21, 2022
* **Video Link**: [https://www.youtube.com/watch?v=gbrPMv_GuQY](https://www.youtube.com/watch?v=gbrPMv_GuQY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Build%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)
<!-- LH-BUTTONS:END -->

## Initializing the Go Project
* **Summary**: Start by setting up a Go module for the project using `go mod init` followed by the module path, like `github.com/maximilienandile/demo-grpc`. This creates a `go.mod` file with the module details and Go version.
* **Key Takeaway/Example**: Use this to organize dependencies and ensure the project is modular from the beginning.
* **Link for More Details**: [Ask AI: Initializing Go Modules](https://alisol.ir/?ai=Initializing%20Go%20Modules%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

## Defining the Proto File
* **Summary**: Create a `.proto` file to describe the API interface. Specify `syntax = "proto3";` for protocol buffers version 3. Define a service like `invoicer` with RPC methods such as `create` that take request and response messages. Add messages for inputs (e.g., amount, currency, from, to) and outputs (e.g., PDF bytes). Include options like `option go_package` to set the Go package path.
* **Key Takeaway/Example**: Messages can nest other messages for reuse, like embedding an `amount` message. Fields need types, names, and positions (e.g., `int64 amount = 1;`).
```proto
syntax = "proto3";
option go_package = "github.com/maximilienandile/demo-grpc/invoicer";
service Invoicer {
  rpc Create(CreateRequest) returns (CreateResponse);
}
message CreateRequest {
  Amount amount = 1;
  string from = 2;
  string to = 3;
}
message Amount {
  int64 value = 1;
  string currency = 2;
}
message CreateResponse {
  bytes pdf = 1;
}
```
* **Link for More Details**: [Ask AI: Defining Proto Files for gRPC](https://alisol.ir/?ai=Defining%20Proto%20Files%20for%20gRPC%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

## Generating Code with Protoc
* **Summary**: Install `protoc` (protobuf compiler) via instructions for your OS, like `brew install protobuf` on macOS. Run `protoc` with options like `--go_out=invoicer --go_opt=paths=source_relative --go-grpc_out=invoicer --go-grpc_opt=paths=source_relative invoicer.proto` to generate Go code files (`invoicer.pb.go` and `invoicer_grpc.pb.go`).
* **Key Takeaway/Example**: After generation, use `go get -u google.golang.org/grpc` to fetch dependencies, then `go mod tidy` to clean up `go.mod`. Regenerate code after any proto changes.
* **Link for More Details**: [Ask AI: Generating gRPC Code with Protoc](https://alisol.ir/?ai=Generating%20gRPC%20Code%20with%20Protoc%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

## Implementing the gRPC Server
* **Summary**: In `main.go`, set up a TCP listener with `net.Listen("tcp", ":8089")`. Create a gRPC server with `grpc.NewServer()`. Implement the service interface by defining a struct that embeds `UnimplementedInvoicerServer` and adds methods like `Create` to handle requests. Register the service with `invoicer.RegisterInvoicerServer(srv, &myInvoicerServer{})` and start serving with `srv.Serve(lis)`.
* **Key Takeaway/Example**: Handle errors for listening and serving. In the `Create` method, access request fields and build responses.
```go
package main
import (
  "context"
  "log"
  "net"
  "github.com/maximilienandile/demo-grpc/invoicer"
  "google.golang.org/grpc"
)
type myInvoicerServer struct {
  invoicer.UnimplementedInvoicerServer
}
func (s *myInvoicerServer) Create(ctx context.Context, req *invoicer.CreateRequest) (*invoicer.CreateResponse, error) {
  return &invoicer.CreateResponse{Pdf: []byte(req.From)}, nil
}
func main() {
  lis, err := net.Listen("tcp", ":8089")
  if err != nil {
    log.Fatalf("cannot create listener: %s", err)
  }
  srv := grpc.NewServer()
  service := &myInvoicerServer{}
  invoicer.RegisterInvoicerServer(srv, service)
  err = srv.Serve(lis)
  if err != nil {
    log.Fatalf("impossible to serve: %s", err)
  }
}
```
* **Link for More Details**: [Ask AI: Implementing gRPC Servers in Go](https://alisol.ir/?ai=Implementing%20gRPC%20Servers%20in%20Go%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

## Testing the Server
* **Summary**: Run the server with `go run main.go`. Use a tool like BloomRPC to test: import the `.proto` file, set the address to `localhost:8089`, fill in JSON request examples, and send requests to verify responses.
* **Key Takeaway/Example**: Responses show encoded bytes (e.g., ASCII values for strings). Add fields to proto, regenerate code, and test updates.
* **Link for More Details**: [Ask AI: Testing gRPC Servers with BloomRPC](https://alisol.ir/?ai=Testing%20gRPC%20Servers%20with%20BloomRPC%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

## Additional Tips and Best Practices
* **Summary**: Create a Makefile with targets like `generate-grpc-code` to automate code regeneration. Avoid editing generated files as changes are lost on regeneration. Add more RPC methods (e.g., update, delete) by updating the proto and regenerating.
* **Key Takeaway/Example**: Protocol buffers handle encoding/decoding; gRPC manages requests/responses efficiently.
* **Link for More Details**: [Ask AI: Best Practices for gRPC in Go](https://alisol.ir/?ai=Best%20Practices%20for%20gRPC%20in%20Go%7CMaximilien%20Andile%7CBuild%20a%20gRPC%20server%20with%20Go%20-%20Step%20by%20step%20tutorial)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
