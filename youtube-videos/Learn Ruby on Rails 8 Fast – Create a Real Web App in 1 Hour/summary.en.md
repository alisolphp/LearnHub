# Learn Ruby on Rails 8 Fast – Create a Real Web App in 1 Hour

* **Platform**: YouTube
* **Channel/Creator**: Malachi Rails
* **Duration**: 01:02:04
* **Release Date**: Aug 8, 2025
* **Video Link**: [https://www.youtube.com/watch?v=XNDOqznkZ4Y](https://www.youtube.com/watch?v=XNDOqznkZ4Y)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- LH-BUTTONS:HASH=3bb5ce7c -->

### AI-Powered buttons

Teach Me::
[5 Years Old](https://alisol.ir/?ai=learnhub_summary_teach&level=5_years_old&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Beginner](https://alisol.ir/?ai=learnhub_summary_teach&level=beginner&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Intermediate](https://alisol.ir/?ai=learnhub_summary_teach&level=intermediate&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Advanced](https://alisol.ir/?ai=learnhub_summary_teach&level=advanced&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[(reset auto redirect)](https://alisol.ir/?ai=reset_redirect_timer)

Learn Differently:
[Analogy](https://alisol.ir/?ai=learnhub_summary_analogy&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Storytelling](https://alisol.ir/?ai=learnhub_summary_story&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Cheatsheet](https://alisol.ir/?ai=learnhub_summary_cheatsheet&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Mindmap](https://alisol.ir/?ai=learnhub_summary_mindmap&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Flashcards](https://alisol.ir/?ai=learnhub_summary_flashcards&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Practical Projects](https://alisol.ir/?ai=learnhub_summary_projects&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Code Examples](https://alisol.ir/?ai=learnhub_summary_code&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Common Mistakes](https://alisol.ir/?ai=learnhub_summary_mistakes&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

Check Understanding:
[Generate Quiz](https://alisol.ir/?ai=learnhub_summary_quiz&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Interview Me](https://alisol.ir/?ai=learnhub_summary_interview&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Assessment Rubric](https://alisol.ir/?ai=learnhub_summary_rubric&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour) | 
[Next Steps](https://alisol.ir/?ai=learnhub_summary_nextsteps&lang=en&src=youtube-videos/Learn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)
<!-- LH-BUTTONS:END -->

## Introduction and Project Setup
* **Summary**: The course recreates a real website like malle.com, featuring Stripe payments, OmniAuth login, pro-only posts, search, filters, and categories. Start by installing Rails 8, then run `rails new malaki_rails_clone --database=postgresql --css=tailwind` to set up the app with PostgreSQL and Tailwind CSS. Use `rails g scaffold post title:string description:text thumbnail_url:string video_url:string pro:boolean` to generate the Post model, then migrate with `rails db:migrate` and start the server with `rails s`.
* **Key Takeaway/Example**: Rails scaffolds provide instant CRUD functionality out of the box, making it quick to build and test models like posts.
* **Link for More Details**: [Ask AI: Rails Project Setup](https://alisol.ir/?ai=Rails%20Project%20Setup%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Adding Friendly ID for Slugs
* **Summary**: To improve privacy and SEO, add the `friendly_id` gem to your Gemfile, run `bundle install`, then generate migrations like `rails g migration add_slug_to_posts slug:uniq` and `rails g friendly_id`. Update the Post model with `extend FriendlyId` and `friendly_id :title, use: :slugged`, and modify the controller's `set_post` to use `friendly_find`. This replaces numeric IDs in URLs with slugs based on the post title.
* **Key Takeaway/Example**: After setup, new posts use titles in URLs, like `/second-post` instead of `/posts/2`.
* **Link for More Details**: [Ask AI: Friendly ID in Rails](https://alisol.ir/?ai=Friendly%20ID%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Styling Posts and Adding Video Embeds
* **Summary**: Generate a Pages controller with `rails g controller pages home pricing privacy`. Render a partial for post lists in the home view, adding Tailwind classes for grid layout. Create a helper method in `posts_helper.rb` to extract YouTube thumbnails from video URLs using regex. Include the Tailwind CDN in `application.html.erb` for development styling.
* **Key Takeaway/Example**: The thumbnail helper parses YouTube IDs:  
  ```ruby  
  def youtube_thumbnail(post)  
    id = post.video_url.match(/embed\/([\w-]+)/)[1]  
    "https://img.youtube.com/vi/#{id}/hqdefault.jpg"  
  end  
  ```
* **Link for More Details**: [Ask AI: Styling and YouTube Embeds in Rails](https://alisol.ir/?ai=Styling%20and%20YouTube%20Embeds%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Creating Navbar, Footer, and Real-time Search
* **Summary**: Create partials for `_navbar.html.erb` and `_footer.html.erb`, rendering them in the application layout. Add a search form in the navbar using Turbo and Stimulus for real-time filtering. In `posts_controller.rb`, filter posts with `Post.where("title ILIKE ? OR description ILIKE ?", "%#{query}%", "%#{query}%")` if a query param is present, and respond with Turbo Stream.
* **Key Takeaway/Example**: The Stimulus controller submits the form on input:  
  ```javascript  
  import { Controller } from "@hotwired/stimulus"  
  export default class extends Controller {  
    submit() { this.element.requestSubmit() }  
  }  
  ```
* **Link for More Details**: [Ask AI: Navbar and Real-time Search in Rails](https://alisol.ir/?ai=Navbar%20and%20Real-time%20Search%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Implementing User Authentication with Devise
* **Summary**: Add `devise` gem, install with `rails generate devise:install`, and generate User model with additional columns like provider, uid, avatar_url. Seed an admin user in `db/seeds.rb` using Rails credentials for secure email/password storage. Use before_actions in controllers to authenticate and ensure admin access for post edits.
* **Key Takeaway/Example**: Admin check in controller:  
  ```ruby  
  def ensure_admin_user  
    unless current_user.email == Rails.application.credentials.dig(:admin, :email)  
      redirect_to root_path, alert: "You must be an admin to perform this action."  
    end  
  end  
  ```
* **Link for More Details**: [Ask AI: Devise Authentication in Rails](https://alisol.ir/?ai=Devise%20Authentication%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Adding OmniAuth for Google and GitHub
* **Summary**: Add OmniAuth gems for Google and GitHub, configure in `devise.rb` with credentials. Set up routes and callbacks controller to handle auth. Update User model with `devise :omniauthable` and a `from_omniauth` method to create or find users based on provider data.
* **Key Takeaway/Example**: Callback handling creates users with auth info like name and avatar.
* **Link for More Details**: [Ask AI: OmniAuth in Rails](https://alisol.ir/?ai=OmniAuth%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Adding Categories and Filtering
* **Summary**: Generate Category and Categorization models for many-to-many association. Add `has_many :categories, through: :categorizations` to Post. In forms, use checkboxes for categories; permit in params. Filter in index with joins if category_id param is present.
* **Key Takeaway/Example**: Filter query: `Post.joins(:categories).where(categories: { id: params[:category_id] }).distinct`.
* **Link for More Details**: [Ask AI: Categories and Filtering in Rails](https://alisol.ir/?ai=Categories%20and%20Filtering%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Enabling Rich Text for Descriptions
* **Summary**: Run `rails action_text:install`, add `has_rich_text :description` to Post model, and change form fields to `f.rich_text_area :description`. This enables formatting like bold, italics, and images in post descriptions.
* **Key Takeaway/Example**: Rich text preserves formatting in views automatically.
* **Link for More Details**: [Ask AI: Action Text in Rails](https://alisol.ir/?ai=Action%20Text%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Restricting Pro Content and Styling Show Page
* **Summary**: Add scopes to Post like `scope :pro, -> { where(pro: true) }`. In show views, check if post is pro and user is subscribed; otherwise, show a subscribe message. Style with Tailwind for better layout.
* **Key Takeaway/Example**: Conditional rendering: If pro and not subscribed, hide content and prompt to subscribe.
* **Link for More Details**: [Ask AI: Pro Content Restriction in Rails](https://alisol.ir/?ai=Pro%20Content%20Restriction%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Implementing Stripe Payments
* **Summary**: Add `stripe` gem, configure API key in initializer. Create pricing page with plans, routes for checkout sessions. In controller, create Stripe sessions based on plan (monthly/yearly) using price IDs from credentials. On success, update user subscribed status.
* **Key Takeaway/Example**: Checkout session: `Stripe::Checkout::Session.create({ customer_email: current_user.email, ... })`.
* **Link for More Details**: [Ask AI: Stripe Payments in Rails](https://alisol.ir/?ai=Stripe%20Payments%20in%20Rails%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

## Deploying to Render
* **Summary**: Push code to GitHub, create Render web service with Ruby, add build script for bundle and migrations. Configure production settings like cache store, add master key and database URL. Troubleshoot errors like PG connections or table duplicates by adjusting configs and redeploying.
* **Key Takeaway/Example**: Build script: `#!/usr/bin/env bash; bundle install; rails assets:precompile; rails assets:clean`.
* **Link for More Details**: [Ask AI: Deploying Rails to Render](https://alisol.ir/?ai=Deploying%20Rails%20to%20Render%7CMalachi%20Rails%7CLearn%20Ruby%20on%20Rails%208%20Fast%20%E2%80%93%20Create%20a%20Real%20Web%20App%20in%201%20Hour)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
