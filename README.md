# Social Network Application

This project involves the implementation of a social network application inspired by popular platforms like Facebook, Instagram, and Twitter. The application includes features for user interaction, content management, and group functionalities, with user-friendly interfaces and robust backend support.

## Technology Stack
- **Backend**: Java, Spring Boot.
- **Frontend**: Angular framework.
- **Database**: MySQL for data storage.

## Features

### User Management
- **User Registration**: New users can register, and an admin user is predefined in the system.
- **Login and Logout**: Users can log in and out of the system. Access to the application is restricted to logged-in users.
- **Password Management**: Users can update their password by entering the current password and confirming the new password.

### Posts and Comments
- **Post Handling**: Users can create posts with or without images. Each post must include textual content.
- **Comment Replies**: Users can reply to comments, with nested replies supported to any depth.
- **Reactions**: Users can react to posts and comments with likes, dislikes, or hearts.

### Sorting and Filtering
- **Sort Comments**: Comments can be sorted by likes, dislikes, hearts (ascending/descending), or publication date (newest to oldest or vice versa).
- **Sort Posts**: Posts can be sorted by publication date (ascending/descending).

### Groups
- **Group Creation and Membership**: Registered users can create groups and become group administrators. Users can join groups by sending membership requests.
- **Group Administration**: System administrators can suspend groups, and group administrators can manage membership requests.

### Reporting and Moderation
- **Content Reporting**: Users can report inappropriate content or users. Reported content is reviewed by group administrators or the system administrator.
- **Content Moderation**: Group administrators can suspend inappropriate content, and the system administrator can block users.

### Profile Management
- **Profile Updates**: Users can update their display name, profile description, and profile picture. Users can also view the groups they belong to.
- **User Search**: Users can search for other users to send friend requests. Friendships are established upon mutual approval.

### Home Page
- **Content Feed**: The home page displays random public posts, group posts, and posts from friends. Public posts are visible across the application.

## Administrative Features
- **Group Moderation**: Group administrators can block or unblock users from the group and manage membership requests.
- **System Administration**: System administrators can remove group administrators, suspend groups, and manage blocked users.




