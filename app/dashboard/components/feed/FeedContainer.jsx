// components/feed/FeedContainer.jsx
'use client';

import React, { useState } from "react";
import CreatePostForm from "./CreatePostForm";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DUMMY_POSTS as INITIAL_DUMMY_POSTS } from "../../../../public/dummydata";
import PostItem from "./PostItem";

export default function FeedContainer() {
  const [posts, setPosts] = useState(INITIAL_DUMMY_POSTS);

  const currentUser = {
    name: "Marwin Gaviria",
    role: "Administración",
    avatar: "https://github.com/shadcn.png", // Or use your local image
  };

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    // This section now takes the remaining height from DashboardPage (`flex-grow`)
    // and becomes the scrollable container itself.
    // - `flex-grow`: Already applied by the parent `DashboardPage`.
    // - `flex flex-col`: Stacks its immediate children (h1, CreatePostForm, post list) vertically.
    // - `items-center`: Centers children horizontally.
    // - `overflow-y-auto`: Makes this entire section scrollable vertically if content overflows.
    // - `p-4`: Add overall padding for content.
    <section className="flex-grow flex flex-col items-center overflow-y-auto p-4 bg-gray-50"> {/* Removed min-h-screen, added flex-grow, overflow-y-auto, p-4, bg */}

      {/* Title inside the scrollable area */}
      <h1 className="text-4xl my-5 text-gray-800">
        Bienvenido, <span className="text-blue-500">Marwin</span>
      </h1>

      {/* Create Post Form */}
      {/* - `w-full max-w-5xl`: Keeps width consistent. */}
      {/* - `mb-8`: Adds margin below the form. */}
      <div className="w-full max-w-5xl mb-8">
        <CreatePostForm currentUser={currentUser} onPublish={handleNewPost} />
      </div>

      {/* Post List Container */}
      {/* This div just holds the post cards and provides spacing between them.
          The scrolling is handled by its parent (the <section>). */}
      {/* - `w-full max-w-5xl`: Keeps width consistent. */}
      {/* - `flex flex-col`: Stacks cards vertically. */}
      {/* - `space-y-6`: Adds vertical spacing between post cards. */}
      <div className="w-full max-w-5xl flex flex-col space-y-6"> {/* Removed overflow-y-auto, flex-grow, px-4, pb-8 */}
        <TooltipProvider>
          {posts.length > 0 ? (
            posts.map(post => (
              <PostItem key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500 text-lg mt-10 text-center">No hay publicaciones para mostrar.</p>
          )}
        </TooltipProvider>
      </div>
    </section>
  );
}