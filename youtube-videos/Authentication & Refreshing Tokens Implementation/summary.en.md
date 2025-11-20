# Authentication & Refreshing Tokens Implementation

* **Platform**: YouTube
* **Channel/Creator**: Dennis Ivy
* **Duration**: 02:09:54
* **Release Date**: Oct 17, 2021
* **Video Link**: [https://www.youtube.com/watch?v=xjMP0hspNLE](https://www.youtube.com/watch?v=xjMP0hspNLE)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to JWT Authentication
JWT stands for JSON Web Tokens, and it's used here to handle authentication in a Django backend with a React frontend. The focus is on implementing access and refresh tokens, including how to rotate and blacklist refresh tokens for better security. Access tokens are short-lived (e.g., 5-15 minutes) and hold user info, while refresh tokens have longer lifespans (e.g., days or months) to renew access tokens without re-login.
* **Key Takeaway**: Store tokens in localStorage on the frontend; use private routes to redirect unauthenticated users to login.
* [Ask AI: JWT Authentication Basics](https://alisol.ir/?ai=JWT%20Authentication%20Basics%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Setting Up Django Project and API
Start by creating a virtual environment, installing Django, and setting up a project called "backend" with an app named "base". Add an "api" folder inside "base" for views, urls, and serializers. Install Django REST Framework (DRF) and add it to installed apps. Create a simple view to list API endpoints like /api/token and /api/token/refresh.
* **Key Takeaway**: Use function-based views with @api_view decorator for GET requests, returning a Response with route info.
```python
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]
    return Response(routes)
```
* [Ask AI: Django Project Setup](https://alisol.ir/?ai=Django%20Project%20Setup%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Installing and Configuring Simple JWT
Install djangorestframework-simplejwt via pip. Update settings.py to use SimpleJWT as the default authentication class. Add token obtain and refresh views to urls.py using TokenObtainPairView and TokenRefreshView from simple_jwt.views.
* **Key Takeaway**: Create a superuser and test the /api/token endpoint by posting username and password to get access and refresh tokens. Decode tokens on jwt.io to see contents like user_id and expiration.
```python
# In settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simple_jwt.authentication.JWTAuthentication',
    )
}
```
* [Ask AI: Simple JWT Configuration](https://alisol.ir/?ai=Simple%20JWT%20Configuration%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Customizing Token Lifetimes and Rotation
In settings.py, set ACCESS_TOKEN_LIFETIME to 5 minutes and REFRESH_TOKEN_LIFETIME to 90 days (or adjust based on security needs). Enable ROTATE_REFRESH_TOKENS and BLACKLIST_AFTER_ROTATION for security—add 'rest_framework_simple_jwt.token_blacklist' to installed apps and migrate.
* **Key Takeaway**: Rotating creates a new refresh token on each use; blacklisting prevents reuse of old tokens by storing them in a database table.
```python
# In settings.py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=90),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}
```
* [Ask AI: Token Rotation and Blacklisting](https://alisol.ir/?ai=Token%20Rotation%20and%20Blacklisting%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Adding Custom Claims to Tokens
Override TokenObtainPairSerializer to include additional user data like username in the access token. Create a custom MyTokenObtainPairView that uses this serializer.
* **Key Takeaway**: This allows immediate access to username in the frontend without extra requests.
```python
# In api/views.py
from rest_framework_simple_jwt.serializers import TokenObtainPairSerializer
from rest_framework_simple_jwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
```
* [Ask AI: Custom Token Claims](https://alisol.ir/?ai=Custom%20Token%20Claims%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Configuring CORS for Cross-Origin Requests
Install django-cors-headers, add it to installed apps and middleware in settings.py. Set CORS_ALLOW_ALL_ORIGINS to True for local development (whitelist specific origins in production).
* **Key Takeaway**: This allows React on port 3000 to request from Django on port 8000 without blocking.
```python
# In settings.py
INSTALLED_APPS = [
    ...,
    'corsheaders',
]

MIDDLEWARE = [
    ...,
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True
```
* [Ask AI: CORS Configuration](https://alisol.ir/?ai=CORS%20Configuration%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Setting Up React Frontend
Use npx create-react-app to set up a "frontend" project. Clean up unnecessary files, create folders for pages, components, context, and utils. Build basic pages like HomePage.js and LoginPage.js.
* **Key Takeaway**: Use React Router for navigation; create a Header component for links to home and login/logout.
```jsx
// In Header.js
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </div>
    );
}
```
* [Ask AI: React Project Setup](https://alisol.ir/?ai=React%20Project%20Setup%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Using Context API for State Management
Create AuthContext.js with useContext, useState, and useEffect. Manage authTokens, user (decoded from token), and loading state. Provide loginUser, logoutUser, and updateToken functions.
* **Key Takeaway**: Decode tokens with jwt-decode; persist state in localStorage for reloads.
```jsx
// In AuthContext.js
import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null);
    // ... functions and useEffect ...
    return <AuthContext.Provider value={{ user, authTokens, loginUser, logoutUser, updateToken }}>{children}</AuthContext.Provider>;
}
```
* [Ask AI: Context API State Management](https://alisol.ir/?ai=Context%20API%20State%20Management%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Implementing Login and Logout
In LoginPage.js, create a form to post username/password to /api/token. On success, decode token, set state/localStorage, and redirect. For logout, clear state/localStorage and redirect to login.
* **Key Takeaway**: Use fetch for API calls; handle redirects with useHistory.
```jsx
// In LoginPage.js (snippet)
async function loginUser(e) {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: e.target.username.value, password: e.target.password.value })
    });
    const data = await response.json();
    if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        history.push('/');
    }
}
```
* [Ask AI: Login Logout Implementation](https://alisol.ir/?ai=Login%20Logout%20Implementation%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Private Routes and Persistence
Create PrivateRoute.js to check for user in context; redirect to login if absent. Use localStorage to persist tokens on reload, updating state in useState callbacks.
* **Key Takeaway**: Conditional rendering in Header for login/logout based on user presence.
```jsx
// In PrivateRoute.js
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function PrivateRoute({ children, ...rest }) {
    const { user } = useContext(AuthContext);
    return (
        <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>
    );
}
```
* [Ask AI: Private Routes Persistence](https://alisol.ir/?ai=Private%20Routes%20Persistence%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Handling Refresh Tokens
Create updateToken function to post refresh token to /api/token/refresh every 4 minutes via setInterval in useEffect. Call it on initial load to handle expired access tokens. Delay child rendering until loading is false.
* **Key Takeaway**: Clear interval on cleanup; blacklist prevents reuse.
```jsx
// In AuthContext.js (snippet)
useEffect(() => {
    if (loading) {
        updateToken();
    }
    const interval = setInterval(() => {
        if (authTokens) {
            updateToken();
        }
    }, 4 * 60 * 1000);
    return () => clearInterval(interval);
}, [authTokens, loading]);
```
* [Ask AI: Refresh Token Handling](https://alisol.ir/?ai=Refresh%20Token%20Handling%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

## Protected API Endpoints and Fetching Data
In Django, create a Note model linked to User. Use ModelSerializer and a view with @permission_classes([IsAuthenticated]) to fetch user-specific notes. In React, fetch from /api/notes with Authorization header, handling errors by logging out.
* **Key Takeaway**: Query request.user.note_set.all() for user-specific data; map results in frontend.
```python
# In api/views.py (snippet)
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = user.note_set.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
```
* [Ask AI: Protected Endpoints Data Fetch](https://alisol.ir/?ai=Protected%20Endpoints%20Data%20Fetch%7CDennis%20Ivy%7CAuthentication%20%26%20Refreshing%20Tokens%20Implementation)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
