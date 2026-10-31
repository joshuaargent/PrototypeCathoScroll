'use client';

import { useState } from 'react';

import { Comment } from '../../lib/supabase/types';

import { CommentForm } from './CommentForm';

interface CommentCardProps {
  comment: Comment;

  currentUserId: string | null;

  onReply: (parentId: number, content: string) => Promise<void>;

  onLike: (commentId: number) => Promise<void>;

  onEdit: (commentId: number, content: string) => Promise<void>;

  onDelete: (commentId: number) => Promise<void>;
}

function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) {
    return 'Just now';
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function CommentCard({
  comment,
  currentUserId,
  onReply,
  onLike,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const [showReply, setShowReply] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-4">
      <article className="border-border rounded-2xl border p-6">
        <div className="mb-4">
          <p className="font-semibold">{comment.profile.display_name}</p>

          <div className="text-text-muted mt-1 flex flex-wrap items-center gap-2 text-sm">
            <span>@{comment.profile.username}</span>

            <span>•</span>

            <span>{formatRelativeDate(comment.created_at)}</span>

            {comment.edited_at && (
              <>
                <span>•</span>

                <span>edited</span>
              </>
            )}
          </div>
        </div>

        {comment.is_deleted ? (
          <p className="text-text-muted italic">Comment deleted.</p>
        ) : (
          <>
            {isEditing ? (
              <CommentForm
                initialValue={comment.content}
                submitLabel="Save"
                onSubmit={async (content) => {
                  await onEdit(comment.id, content);

                  setIsEditing(false);
                }}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <p className="leading-relaxed">{comment.content}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <button
                type="button"
                onClick={() => onLike(comment.id)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                  comment.likedByUser ? 'bg-accent text-white' : 'bg-accent-light text-accent'
                } `}
              >
                ♥ {comment.likes}
              </button>

              <button
                type="button"
                onClick={() => setShowReply(!showReply)}
                className="text-text-secondary hover:text-text-primary"
              >
                Reply
              </button>

              {currentUserId === comment.user_id && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {showReply && (
              <div className="mt-6">
                <CommentForm
                  submitLabel="Reply"
                  onSubmit={async (content) => {
                    await onReply(comment.id, content);

                    setShowReply(false);
                  }}
                  onCancel={() => setShowReply(false)}
                />
              </div>
            )}
          </>
        )}
      </article>

      {comment.replies.length > 0 && (
        <div className="border-border ml-6 space-y-4 border-l pl-6">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onReply={onReply}
              onLike={onLike}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
