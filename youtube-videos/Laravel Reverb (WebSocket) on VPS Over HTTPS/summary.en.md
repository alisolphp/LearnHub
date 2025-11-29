# Laravel Reverb (WebSocket) on VPS Over HTTPS

* **Platform**: YouTube
* **Channel/Creator**: Code With ERaufi
* **Duration**: 00:43:53
* **Release Date**: Aug 19, 2024
* **Video Link**: [https://www.youtube.com/watch?v=Iuq6jME4ft8](https://www.youtube.com/watch?v=Iuq6jME4ft8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=31acc7b2 -->

### AI-Powered buttons

Start teaching this to a:
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn via different lenses:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Story](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Cheat Sheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

Check my understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Laravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)
<!-- LH-BUTTONS:END -->

## Setting Up Laravel Project Locally
* **Summary**: Start by creating a new Laravel project using Composer, then navigate into the project directory.
* **Key Takeaway/Example**: Use the command to install:  
  ```bash
  composer create-project laravel/laravel laravel-reverb
  ```
  Then change directory: `cd laravel-reverb`.
* **Link for More Details**: [Ask AI: Setting Up Laravel Project Locally](https://alisol.ir/?ai=Setting%20Up%20Laravel%20Project%20Locally%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Installing Broadcasting and Reverb
* **Summary**: Install Laravel Broadcasting from the documentation, confirm installation of Reverb and Node dependencies.
* **Key Takeaway/Example**: Run:  
  ```bash
  composer require laravel/broadcasting
  ```
  Answer yes to prompts for Reverb and Node setup.
* **Link for More Details**: [Ask AI: Installing Broadcasting and Reverb](https://alisol.ir/?ai=Installing%20Broadcasting%20and%20Reverb%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Setting Up Authentication
* **Summary**: Install authentication scaffolding using Breeze with Bootstrap stack.
* **Key Takeaway/Example**: Commands include:  
  ```bash
  composer require laravel/breeze --dev
  php artisan breeze:install
  npm install
  npm run dev
  ```
  Replace files if prompted.
* **Link for More Details**: [Ask AI: Setting Up Authentication](https://alisol.ir/?ai=Setting%20Up%20Authentication%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Database Configuration and Migration
* **Summary**: Update .env for MySQL database, run migrations to set up the database.
* **Key Takeaway/Example**: In .env, set `DB_CONNECTION=mysql` and `DB_DATABASE=laravel_reverb`. Then:  
  ```bash
  php artisan migrate
  ```
  Confirm database creation if prompted.
* **Link for More Details**: [Ask AI: Database Configuration and Migration](https://alisol.ir/?ai=Database%20Configuration%20and%20Migration%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Creating and Testing Public Event
* **Summary**: Create a public event, implement broadcasting, set up listener in welcome.blade.php, and test by triggering the event.
* **Key Takeaway/Example**: Create event: `php artisan make:event PublicEvent`. In event class:  
  ```php
  implements ShouldBroadcast
  public function broadcastOn(): array
  {
      return [new Channel('test-channel')];
  }
  public function broadcastWith(): array
  {
      return ['message' => $this->message];
  }
  ```
  In welcome.blade.php:  
  ```javascript
  setTimeout(() => {
      window.Echo.channel('test-channel')
          .listen('PublicEvent', (e) => {
              console.log(e);
          });
  }, 500);
  ```
  Trigger via route: `event(new PublicEvent('Hello World'));`. Run `npm run build`, `php artisan reverb:start`, `php artisan queue:work`.
* **Link for More Details**: [Ask AI: Creating and Testing Public Event](https://alisol.ir/?ai=Creating%20and%20Testing%20Public%20Event%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Creating and Testing Private Event
* **Summary**: Create a private event, configure channel authorization, update listener for private channel, and test.
* **Key Takeaway/Example**: Create event: `php artisan make:event PrivateEvent`. In event:  
  ```php
  implements ShouldBroadcast
  public function broadcastOn(): array
  {
      return [new PrivateChannel('channel.user.' . $this->userId)];
  }
  public function broadcastWith(): array
  {
      return [$this->data];
  }
  ```
  In channels.php:  
  ```php
  Broadcast::channel('channel.user.{id}', function ($user, $id) {
      return $user->id === $id;
  });
  ```
  In welcome.blade.php:  
  ```javascript
  window.Echo.private(`channel.user.${auth().id}`)
      .listen('PrivateEvent', (e) => {
          console.log(e);
      });
  ```
  Trigger: `event(new PrivateEvent('Private Message', 1));`. Ensure logged in for testing.
* **Link for More Details**: [Ask AI: Creating and Testing Private Event](https://alisol.ir/?ai=Creating%20and%20Testing%20Private%20Event%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Deploying to VPS
* **Summary**: Zip the project, upload to VPS public_html, unzip, and set up.
* **Key Takeaway/Example**: Use FTP or Termius to upload zip to /home/domain/public_html, then:  
  ```bash
  unzip laravel-reverb.zip
  ```
* **Link for More Details**: [Ask AI: Deploying to VPS](https://alisol.ir/?ai=Deploying%20to%20VPS%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Database Setup on Server
* **Summary**: Create database and user in cPanel, assign privileges.
* **Key Takeaway/Example**: In cPanel, create database 'laravel_reverb', add user with all privileges.
* **Link for More Details**: [Ask AI: Database Setup on Server](https://alisol.ir/?ai=Database%20Setup%20on%20Server%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Configuring .env and Running Migrations on Server
* **Summary**: Update .env with database credentials, app URL, run migrations and optimize.
* **Key Takeaway/Example**: Set `APP_URL=https://domain.com`, update DB details. Then:  
  ```bash
  php artisan migrate
  php artisan optimize:clear
  ```
* **Link for More Details**: [Ask AI: Configuring .env and Running Migrations on Server](https://alisol.ir/?ai=Configuring%20.env%20and%20Running%20Migrations%20on%20Server%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Removing /public from URL
* **Summary**: Add .htaccess file to public_html to rewrite URLs without /public.
* **Key Takeaway/Example**: Upload .htaccess with rewrite rules to root.
* **Link for More Details**: [Ask AI: Removing /public from URL](https://alisol.ir/?ai=Removing%20/public%20from%20URL%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Opening Firewall Ports
* **Summary**: Open port 8080 in WHM firewall for TCP in/out.
* **Key Takeaway/Example**: In WHM > ConfigServer Security & Firewall > Firewall Configuration, add ,8080 to TCP_IN and TCP_OUT, then change and restart.
* **Link for More Details**: [Ask AI: Opening Firewall Ports](https://alisol.ir/?ai=Opening%20Firewall%20Ports%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Configuring SSL Certificate
* **Summary**: Issue trusted SSL from ZeroSSL, install in WHM using certificate, key, and CA bundle files uploaded to server.
* **Key Takeaway/Example**: Avoid self-signed certs. Upload files to storage/app/ssl, then in WHM > SSL/TLS > Install an SSL Certificate, paste contents manually for domain.
* **Link for More Details**: [Ask AI: Configuring SSL Certificate](https://alisol.ir/?ai=Configuring%20SSL%20Certificate%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Updating Reverb Config for HTTPS
* **Summary**: Update .env and config/reverb.php with domain, https scheme, and TLS file paths.
* **Key Takeaway/Example**: In .env:  
  ```env
  REVERB_HOST=domain.com
  REVERB_SCHEME=https
  REVERB_TLS_CERT_PATH=/home/domain/public_html/laravel-reverb/storage/app/ssl/certificate.crt
  REVERB_TLS_KEY_PATH=/home/domain/public_html/laravel-reverb/storage/app/ssl/private.key
  REVERB_TLS_CA_BUNDLE=/home/domain/public_html/laravel-reverb/storage/app/ssl/ca_bundle.crt
  ```
  In config/reverb.php: Add to 'tls' array:  
  ```php
  'local_cert' => env('REVERB_TLS_CERT_PATH'),
  'local_pk' => env('REVERB_TLS_KEY_PATH'),
  'cafile' => env('REVERB_TLS_CA_BUNDLE'),
  ```
* **Link for More Details**: [Ask AI: Updating Reverb Config for HTTPS](https://alisol.ir/?ai=Updating%20Reverb%20Config%20for%20HTTPS%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Running Services on Server
* **Summary**: Build assets, start Reverb and queue worker on server.
* **Key Takeaway/Example**:  
  ```bash
  npm run build
  php artisan reverb:start
  php artisan queue:work
  ```
* **Link for More Details**: [Ask AI: Running Services on Server](https://alisol.ir/?ai=Running%20Services%20on%20Server%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

## Testing and Troubleshooting
* **Summary**: Test events on server, troubleshoot connection failures by accessing ws://domain:8080 or updating Apache config.
* **Key Takeaway/Example**: For errors, curl ws://domain:8080 to check, or add to WHM Apache pre-virtualhost include:  
  ```apache
  # Proxy for WebSocket
  ProxyPass /app/ ws://localhost:8080/app/
  ProxyPassReverse /app/ ws://localhost:8080/app/
  ```
  Then restart Apache.
* **Link for More Details**: [Ask AI: Testing and Troubleshooting](https://alisol.ir/?ai=Testing%20and%20Troubleshooting%7CCode%20With%20ERaufi%7CLaravel%20Reverb%20(WebSocket)%20on%20VPS%20Over%20HTTPS)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
