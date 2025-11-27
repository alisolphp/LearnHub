# Complete WordPress Plugin Development Full Course

* **Platform**: YouTube
* **Channel/Creator**: Online Web Tutor
* **Duration**: 09:49:16
* **Release Date**: Aug 27, 2024
* **Video Link**: [https://www.youtube.com/watch?v=tYLfC8nNPLs](https://www.youtube.com/watch?v=tYLfC8nNPLs)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

<!-- LH-BUTTONS:START -->
<!-- auto-generated; do not edit -->
<!-- LH-BUTTONS:END -->

## Course Overview and Prerequisites
* **Summary**: Plugins in WordPress are software pieces that add features like SEO improvements, contact forms, or sliders without core code changes. This course covers building 12 custom plugins from scratch, assuming basic WordPress knowledge, simple MySQL queries (CREATE, INSERT, UPDATE, DELETE), and some HTML/jQuery familiarity.
* **Key Takeaway/Example**: The course spans about 10 hours, focusing on practical projects to teach plugin development fundamentals.
* **Link for More Details**: [Ask AI: WordPress Plugin Basics](https://alisol.ir/?ai=WordPress%20Plugin%20Basics%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Setting Up WordPress Locally
* **Summary**: Download WordPress from wordpress.org, extract to a local server like XAMPP, create a database via phpMyAdmin, and run the installation wizard to set up admin credentials.
* **Key Takeaway/Example**: WordPress creates 12 default tables during installation. Use localhost/your-folder to access and install plugins via the admin panel.
* **Link for More Details**: [Ask AI: Local WordPress Setup](https://alisol.ir/?ai=Local%20WordPress%20Setup%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Hello World Plugin (Admin Notices and Dashboard Widgets)
* **Summary**: Create a basic plugin folder and main PHP file with header comments for plugin metadata. Use action hooks to add admin notices (success, error, info, warning) and dashboard widgets.
* **Key Takeaway/Example**: For notices, hook into 'admin_notices' and echo divs with classes like 'notice notice-success'. For widgets, use 'wp_dashboard_setup' and 'wp_add_dashboard_widget'.
```php
add_action('admin_notices', 'hw_show_message');
function hw_show_message() {
    echo '<div class="notice notice-success"><p>Hello, I am a success message</p></div>';
}
```
* **Link for More Details**: [Ask AI: Admin Notices and Widgets](https://alisol.ir/?ai=Admin%20Notices%20and%20Widgets%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Shortcode Plugin (Basics, Parameters, and Database Integration)
* **Summary**: Shortcodes are like macros wrapped in square brackets. Use 'add_shortcode' to register them, with callbacks returning content. Handle parameters with 'shortcode_atts' and fetch dynamic data from the 'wp_posts' table.
* **Key Takeaway/Example**: For a parameterized shortcode:
```php
add_shortcode('student', 'sp_handle_student_data');
function sp_handle_student_data($atts) {
    $atts = shortcode_atts(array('name' => 'default student', 'email' => 'default email'), $atts);
    return "<h3>Student: {$atts['name']}, Email: {$atts['email']}</h3>";
}
```
For DB: Query 'wp_posts' with $wpdb->get_results.
* **Link for More Details**: [Ask AI: WordPress Shortcodes](https://alisol.ir/?ai=WordPress%20Shortcodes%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## CSV Data Uploader Plugin
* **Summary**: Build a plugin to upload CSV files, parse data, and insert into a custom database table created dynamically.
* **Key Takeaway/Example**: Use activation hooks to create tables, handle file uploads, and loop through CSV rows for inserts via $wpdb.
* **Link for More Details**: [Ask AI: CSV Upload to WordPress DB](https://alisol.ir/?ai=CSV%20Upload%20to%20WordPress%20DB%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Table Data Backup to CSV Plugin
* **Summary**: Export database table data to a CSV file for backups.
* **Key Takeaway/Example**: Fetch data with $wpdb->get_results, then use PHP's fputcsv to generate and download the CSV.
* **Link for More Details**: [Ask AI: Export DB to CSV](https://alisol.ir/?ai=Export%20DB%20to%20CSV%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Custom Widget Plugin
* **Summary**: Extend WP_Widget class to create custom widgets with form, update, and widget methods.
* **Key Takeaway/Example**: Override methods like form() for backend fields and widget() for frontend output.
* **Link for More Details**: [Ask AI: Custom WordPress Widgets](https://alisol.ir/?ai=Custom%20WordPress%20Widgets%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Custom Meta Boxes Plugin
* **Summary**: Add meta boxes to post types using 'add_meta_box', save data with 'save_post' hook, and display on frontend.
* **Key Takeaway/Example**: Use nonce for security and update_post_meta to store values.
* **Link for More Details**: [Ask AI: WordPress Meta Boxes](https://alisol.ir/?ai=WordPress%20Meta%20Boxes%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Admin Login Page Customizer Plugin
* **Summary**: Use settings API to add fields for customizing login page (logo, colors) via 'register_setting' and 'add_settings_field'.
* **Key Takeaway/Example**: Hook into 'login_enqueue_scripts' to apply custom CSS based on saved options.
* **Link for More Details**: [Ask AI: Customizing WP Login Page](https://alisol.ir/?ai=Customizing%20WP%20Login%20Page%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## CRUD Operations Plugin (with AJAX and Image Upload)
* **Summary**: Implement create, read, update, delete with AJAX calls, handling image uploads via wp_handle_upload.
* **Key Takeaway/Example**: Use 'wp_ajax_' hooks for AJAX, and $wpdb for database operations.
* **Link for More Details**: [Ask AI: WordPress CRUD with AJAX](https://alisol.ir/?ai=WordPress%20CRUD%20with%20AJAX%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## WooCommerce Product Creator Plugin
* **Summary**: Use WC_Product class to programmatically create products, setting attributes like price and categories.
* **Key Takeaway/Example**: Instantiate WC_Product, set properties, and call save().
* **Link for More Details**: [Ask AI: Creating WooCommerce Products](https://alisol.ir/?ai=Creating%20WooCommerce%20Products%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## WooCommerce Product Importer via CSV Plugin
* **Summary**: Parse CSV and bulk import products into WooCommerce using loops and WC_Product methods.
* **Key Takeaway/Example**: Read CSV with fgetcsv, create products in a loop.
* **Link for More Details**: [Ask AI: Importing Products to WooCommerce](https://alisol.ir/?ai=Importing%20Products%20to%20WooCommerce%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## Plugin Generator Tool
* **Summary**: Use online tools like pluginboiler.com to generate boilerplate folder structures (admin, public, includes) for organized plugin development.
* **Key Takeaway/Example**: Folders separate concerns: admin for backend, public for frontend, includes for core classes. Handle activation/deactivation in dedicated files.
* **Link for More Details**: [Ask AI: WordPress Plugin Boilerplate](https://alisol.ir/?ai=WordPress%20Plugin%20Boilerplate%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

## WordPress REST APIs for CRUD
* **Summary**: Register custom REST routes with 'register_rest_route' for CRUD on a custom table, handling GET, POST, PUT, DELETE methods.
* **Key Takeaway/Example**: Use 'rest_api_init' hook, define callbacks, and return via rest_ensure_response. Secure with permissions_callback if needed.
```php
register_rest_route('students/v1', '/students', array(
    'methods' => 'GET',
    'callback' => 'wcp_handle_get_students'
));
```
* **Link for More Details**: [Ask AI: Custom WP REST APIs](https://alisol.ir/?ai=Custom%20WP%20REST%20APIs%7COnline%20Web%20Tutor%7CComplete%20WordPress%20Plugin%20Development%20Full%20Course)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
