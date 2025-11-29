# Laravel WebSockets Course | Chat App Example

* **Platform**: YouTube
* **Channel/Creator**: Emad Zaamout 
* **Duration**: 01:15:41
* **Release Date**: May 2, 2022
* **Video Link**: [https://www.youtube.com/watch?v=qdhnC_FUBbs](https://www.youtube.com/watch?v=qdhnC_FUBbs)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=b11a91a9 -->

### AI-Powered buttons

Teach Me: 
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Refactor Challenge](https://alisol.ir/?ai=learnhub_summary_refactor&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Laravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)
<!-- LH-BUTTONS:END -->

## Course Introduction and Demo
The course focuses on implementing custom WebSockets in Laravel without third-party vendors, using your own server for real-time communication. It starts with an overview and builds a simple chat app that demonstrates two-way messaging between browsers without page refreshes.

Key takeaway: The demo shows connecting users (with or without names), sending messages, and seeing updates in real time across multiple browsers, emphasizing functionality over UI design.

[Ask AI: Course Introduction and Demo](https://alisol.ir/?ai=Course%20Introduction%20and%20Demo%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## What Are WebSockets?
WebSockets enable real-time, two-way communication between a client (like a browser or mobile device) and server, unlike traditional HTTP requests. They use the WS protocol on port 6001 (or WSS on 443 for secure connections), ideal for apps like chat systems where users get updates without refreshing.

Key takeaway: Compare to HTTP (ports 80/443); WebSockets avoid polling for updates. Pusher is a hosted option, but the course teaches self-hosted setup for control and no cost.

[Ask AI: What Are WebSockets?](https://alisol.ir/?ai=What%20Are%20WebSockets%3F%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Setting Up the Laravel Project
Start with a fresh Laravel installation using Composer, set up a database (e.g., via HeidiSQL), configure .env for DB connection, and use database as queue driver if Redis isn't available. Run migrations for jobs table to handle queued events.

Key takeaway: Use commands like `composer create-project laravel/laravel .` for setup, `php artisan queue:table` and `php artisan migrate` for queue prep.
```bash
composer create-project laravel/laravel .
php artisan queue:table
php artisan migrate
```

[Ask AI: Setting Up the Laravel Project](https://alisol.ir/?ai=Setting%20Up%20the%20Laravel%20Project%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Installing Packages
Install Beyond Code's laravel-websockets package (Pusher-compatible) and Pusher's PHP SDK via Composer. Publish migrations and config files, then run migrations. Start queue worker and WebSocket server in separate terminals.

Key takeaway: Commands include `composer require beyondcode/laravel-websockets`, `php artisan vendor:publish --provider="BeyondCode\LaravelWebSockets\WebSocketsServiceProvider" --tag="migrations"`, and run `php artisan queue:work` plus `php artisan websockets:serve`.
```bash
composer require pusher/pusher-php-server
php artisan websockets:serve
```

[Ask AI: Installing Packages](https://alisol.ir/?ai=Installing%20Packages%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Configuring Environment and Broadcasting
Update .env with Pusher vars (use 'staging' for key/id), set broadcast driver to 'pusher', add WebSocket host/port. Modify broadcasting.php for Pusher options (scheme 'http', disable TLS verification for local), and websockets.php for dashboard path, app details, and host/port.

Key takeaway: Set `BROADCAST_DRIVER=pusher` in .env; in broadcasting.php, add host/port and curl options for local dev.
```php
'options' => [
    'scheme' => 'http',
    'host' => env('LARAVEL_WEBSOCKETS_HOST'),
    'port' => env('LARAVEL_WEBSOCKETS_PORT'),
    'useTLS' => false,
    'curl_options' => [
        CURLOPT_SSL_VERIFYHOST => 0,
        CURLOPT_SSL_VERIFYPEER => 0,
    ],
],
```

[Ask AI: Configuring Environment and Broadcasting](https://alisol.ir/?ai=Configuring%20Environment%20and%20Broadcasting%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Using the WebSockets Dashboard
Access the dashboard at /laravel-websockets to monitor connections. Debug errors via browser dev tools (Network tab) and server logs. Restart server after config changes; test connections and event sending.

Key takeaway: Common fixes include correcting host in broadcasting.php or setting 'encrypted' => false in websockets.php for local testing.

[Ask AI: Using the WebSockets Dashboard](https://alisol.ir/?ai=Using%20the%20WebSockets%20Dashboard%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Creating the Connection API
Add a SocketsController with a connect method using Pusher broadcaster for authentication. Route it as POST /api/sockets/connect. Return valid auth response.

Key takeaway: Use Postman or browser for testing; constructor needs app key, secret, id from .env.
```php
public function connect(Request $request)
{
    $broadcaster = new PusherBroadcaster(
        new Pusher(env('PUSHER_APP_KEY'), env('PUSHER_APP_SECRET'), env('PUSHER_APP_ID'), [])
    );
    return $broadcaster->validAuthenticationResponse($request, []);
}
```

[Ask AI: Creating the Connection API](https://alisol.ir/?ai=Creating%20the%20Connection%20API%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Building the Frontend UI
Replace welcome.blade.php with chat-app-example.blade.php. Add CDNs for jQuery, Pusher JS, Vue 2, Bootstrap 5. Use Vue for app logic: data for connected state, name, messages; methods for connect/disconnect/send. Build card UI with input, buttons, message display area.

Key takeaway: Use v-model for inputs, v-if for conditional display, v-for to loop messages. Pass config vars from web.php to view via Blade.

[Ask AI: Building the Frontend UI](https://alisol.ir/?ai=Building%20the%20Frontend%20UI%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Handling Connections in Frontend
In Vue's mounted, init apps from passed data. In connect method, create Pusher instance with host/port/auth endpoint/CSRF token. Bind events for state changes, connected/disconnected/error. Force WS over WSS for local by setting forceTLS: false.

Key takeaway: Subscribe to channels post-connection; use dev tools to debug pending requests.
```javascript
this.pusher = new Pusher(this.apps.key, {
    host: this.host,
    port: this.port,
    wsPort: this.port,
    wsPath: this.apps.path,
    disableStats: true,
    authEndpoint: this.authEndpoint,
    auth: {
        headers: {
            'X-CSRF-Token': '{{ csrf_token() }}',
            'X-App-Id': this.apps.id
        }
    },
    enabledTransports: ['ws', 'flash'],
    forceTLS: false
});
```

[Ask AI: Handling Connections in Frontend](https://alisol.ir/?ai=Handling%20Connections%20in%20Frontend%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Creating and Dispatching Events
Make SendMessage event implementing ShouldBroadcast. Define broadcastOn to a new channel, broadcastWith for data (name, message, time). In routes/channels.php, register the channel. In web.php, add POST /chat/send route to dispatch event with request data.

Key takeaway: Format time with now()->utc()->format('Y-m-d H:i:s'); default name to 'anonymous'.
```php
public function broadcastOn()
{
    return new Channel('send-message-event');
}

public function broadcastWith()
{
    return ['name' => $this->name, 'message' => $this->message, 'time' => $this->time];
}
```

[Ask AI: Creating and Dispatching Events](https://alisol.ir/?ai=Creating%20and%20Dispatching%20Events%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

## Subscribing and Receiving Messages
In frontend, add subscribeToAllChannels method to loop and call subscribeToChannel. Bind to 'log-message' event, check if data matches your event, parse and push to incomingMessages with local time conversion. Use jQuery.ajax for sending messages to backend API.

Key takeaway: Validate message not empty before send; clear input post-send. Monitor queue terminal for processed events.
```javascript
subscribeToChannel(channel) {
    this.pusher.subscribe(channel).bind('log-message', (data) => {
        if (data.type === 'api-message' && data.details.includes('send-message-event')) {
            let messageData = JSON.parse(data.message);
            let utcDate = new Date(messageData.time);
            this.incomingMessages.push({
                name: messageData.name,
                message: messageData.message,
                time: utcDate.toLocaleString()
            });
        }
    });
}
```

[Ask AI: Subscribing and Receiving Messages](https://alisol.ir/?ai=Subscribing%20and%20Receiving%20Messages%7CEmad%20Zaamout%20%7CLaravel%20WebSockets%20Course%20%7C%20Chat%20App%20Example)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
