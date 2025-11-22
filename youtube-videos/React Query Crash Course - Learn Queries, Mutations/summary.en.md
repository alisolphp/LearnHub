# React Query Crash Course - Learn Queries, Mutations

* **Platform**: YouTube
* **Channel/Creator**: PedroTech
* **Duration**: 00:36:31
* **Release Date**: Jan 14, 2025
* **Video Link**: [https://www.youtube.com/watch?v=e74rB-14-m8](https://www.youtube.com/watch?v=e74rB-14-m8)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Introduction to React Query
**Summary**: React Query simplifies data fetching, caching, and real-time updates in React apps, handling complexities like loading states, errors, and synchronization without clunky code.
**Key Takeaway/Example**: It's not a fetching library like Axios but manages what happens after the fetch, making UIs faster and more efficient.
[Ask AI: Introduction to React Query](https://alisol.ir/?ai=Introduction%20to%20React%20Query|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Setting Up React Query
**Summary**: Install @tanstack/react-query, create a QueryClient instance, and wrap your app with QueryClientProvider at the root level for global access.
**Key Takeaway/Example**: In main.jsx, import QueryClient and QueryClientProvider, then wrap <App /> like this:
```jsx
const client = new QueryClient();
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
```
[Ask AI: Setting Up React Query](https://alisol.ir/?ai=Setting%20Up%20React%20Query|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Basic Data Fetching with useQuery
**Summary**: Use the useQuery hook to fetch data, providing a unique query key and an async function that performs the fetch.
**Key Takeaway/Example**: Destructure data from useQuery, and handle fetches with native fetch or Axios. Example for fetching posts:
```jsx
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error('Error fetching data');
    return response.json();
  }
});
```
[Ask AI: Basic Data Fetching with useQuery](https://alisol.ir/?ai=Basic%20Data%20Fetching%20with%20useQuery|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Handling Loading and Error States
**Summary**: useQuery automatically provides isLoading and error states for conditional rendering.
**Key Takeaway/Example**: Render loading indicators or error messages easily:
```jsx
if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error occurred: {error.message}</p>;
```
This keeps components simple without manual state management.
[Ask AI: Handling Loading and Error States](https://alisol.ir/?ai=Handling%20Loading%20and%20Error%20States|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Caching and Stale Time
**Summary**: React Query caches responses by default, reducing unnecessary fetches; use staleTime to control when data is considered outdated.
**Key Takeaway/Example**: Set staleTime in milliseconds to keep data fresh for a period, like 5000 for 5 seconds:
```jsx
useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5000
});
```
This prevents refetches on remounts within the time frame.
[Ask AI: Caching and Stale Time](https://alisol.ir/?ai=Caching%20and%20Stale%20Time|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Queries with Parameters
**Summary**: For dynamic queries like fetching by ID, include parameters in the query key and query function.
**Key Takeaway/Example**: Pass ID to make keys unique:
```jsx
useQuery({
  queryKey: ['post', id],
  queryFn: () => fetchPostById(id)
});
```
Wrap queryFn in a callback if passing args.
[Ask AI: Queries with Parameters](https://alisol.ir/?ai=Queries%20with%20Parameters|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Mutations with useMutation
**Summary**: Use useMutation for POST, PUT, DELETE requests; it provides a mutate function to trigger the action.
**Key Takeaway/Example**: For creating a post:
```jsx
const { mutate } = useMutation({
  mutationFn: async (newPost) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    });
    return response.json();
  }
});
// Call mutate({ title: 'New Post' });
```
[Ask AI: Mutations with useMutation](https://alisol.ir/?ai=Mutations%20with%20useMutation|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Invalidating Queries After Mutation
**Summary**: On mutation success, invalidate related queries to refetch and sync data automatically.
**Key Takeaway/Example**: Use useQueryClient to invalidate:
```jsx
const queryClient = useQueryClient();
useMutation({
  mutationFn: createPost,
  onSuccess: () => queryClient.invalidateQueries(['posts'])
});
```
This keeps UI in sync with server changes.
[Ask AI: Invalidating Queries After Mutation](https://alisol.ir/?ai=Invalidating%20Queries%20After%20Mutation|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Optimistic Updates
**Summary**: Update UI immediately assuming success, then rollback on error for faster feedback.
**Key Takeaway/Example**: Use onMutate to cache previous data and update optimistically, onError to revert:
```jsx
useMutation({
  mutationFn: createPost,
  onMutate: async (newPost) => {
    await queryClient.cancelQueries(['posts']);
    const previousPosts = queryClient.getQueryData(['posts']);
    queryClient.setQueryData(['posts'], (old) => [...old, { id: Date.now(), ...newPost }]);
    return { previousPosts };
  },
  onError: (err, newPost, context) => {
    queryClient.setQueryData(['posts'], context.previousPosts);
  },
  onSuccess: () => queryClient.invalidateQueries(['posts'])
});
```
[Ask AI: Optimistic Updates](https://alisol.ir/?ai=Optimistic%20Updates|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

## Conclusion and Best Practices
**Summary**: React Query is ideal for managing server state in apps of any scale, offering simplicity and power for production-ready code.
**Key Takeaway/Example**: Prefer it over manual useEffect for data handling; check code examples and cheat sheets for deeper dives.
[Ask AI: Conclusion and Best Practices](https://alisol.ir/?ai=Conclusion%20and%20Best%20Practices|PedroTech|React%20Query%20Crash%20Course%20-%20Learn%20Queries%2C%20Mutations)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
