### This is a School fullstack-course project.

### The idea behind this application is simple. The user can create, comment, upvote/downvote and search for posts. The key identifier is that the user is always anonymous.

### When a user opens an application, the application generates userId (if user doesn't have it), which is stored in the user's localStorage. If the user clears its localStorage, user won't be able to delete self created posts, because application will generate new userId. When a user creates post, all information about the post is sent to the database. Request information contains: \_id (post id), message (post content), userId (which is saved to user's localStorage), date (when post was created), comments (which is array of objects) and vote (which contains integer of post votes, by default set to 0).

### The application also has a search input, that allows the user to find posts by keywords.

### If the user wants to create post, the minimum text length of post is 3 by default, so if textarea contains less characters then required it will not allow user to create the post. Also small things like automotive textarea size adjusting and "enter" to submit and "CTRL + Enter" for line break have also added to this project as a part of feature set.

### This app is not yet complete and it is missing some key details. For example there are no possibility to edit created post (not has Twitter :D) & the user is able to upvote and downvote same post infinite times.
