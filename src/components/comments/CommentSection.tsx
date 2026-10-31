'use client';

import { useCallback, useEffect, useState } from 'react';

import { Comment } from '../../lib/supabase/types';

import { createClient } from '@/lib/supabase/client';

import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';

interface CommentSectionProps {
  topicId: string;
}

export function CommentSection({ topicId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState<string | null>(null);

  const sortComments = useCallback((comments: Comment[]) => {
    comments.sort((a, b) => {
      if (a.is_pinned !== b.is_pinned) {
        return a.is_pinned ? -1 : 1;
      }

      if (a.likes !== b.likes) {
        return b.likes - a.likes;
      }

      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    comments.forEach((comment) => sortComments(comment.replies));
  }, []);

  const loadComments = useCallback(async () => {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserId(user?.id ?? null);

    const [commentsResult, likesResult] = await Promise.all([
      supabase
        .from('comments')
        .select(
          `
            *,
            profiles (
              id,
              username,
              display_name,
              avatar_url,
              bio,
              created_at,
              subscription_tier
            )
          `
        )
        .eq('topic_id', topicId)
        .order('created_at', {
          ascending: false,
        }),

      supabase.from('comment_likes').select('comment_id,user_id'),
    ]);

    const commentRows = commentsResult.data ?? [];

    const likeRows = likesResult.data ?? [];

    const likeCounts = new Map<number, number>();

    const likedByUser = new Set<number>();

    likeRows.forEach((like) => {
      likeCounts.set(like.comment_id, (likeCounts.get(like.comment_id) ?? 0) + 1);

      if (like.user_id === user?.id) {
        likedByUser.add(like.comment_id);
      }
    });

    const map = new Map<number, Comment>();

    const roots: Comment[] = [];

    commentRows.forEach((row) => {
      map.set(row.id, {
        id: row.id,
        topic_id: row.topic_id,
        user_id: row.user_id,
        parent_id: row.parent_id,
        content: row.content,
        created_at: row.created_at,
        edited_at: row.edited_at,
        is_deleted: row.is_deleted,
        is_pinned: row.is_pinned,

        profile: row.profiles,

        likes: likeCounts.get(row.id) ?? 0,

        likedByUser: likedByUser.has(row.id),

        replies: [],
      });
    });

    map.forEach((comment) => {
      if (comment.parent_id === null) {
        roots.push(comment);

        return;
      }

      const parent = map.get(comment.parent_id);

      parent?.replies.push(comment);
    });

    sortComments(roots);

    setComments(roots);

    setLoading(false);
  }, [topicId, sortComments]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadComments();
  }, [loadComments]);

  async function createComment(content: string) {
    if (!userId) {
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.from('comments').insert({
      topic_id: topicId,
      user_id: userId,
      parent_id: null,
      content,
    });

    if (!error) {
      await loadComments();
    }
  }

  async function editComment(commentId: number, content: string) {
    const supabase = createClient();

    const { error } = await supabase
      .from('comments')
      .update({
        content,
        edited_at: new Date().toISOString(),
      })
      .eq('id', commentId);

    if (!error) {
      await loadComments();
    }
  }

  async function deleteComment(commentId: number) {
    const supabase = createClient();

    const { error } = await supabase
      .from('comments')
      .update({
        is_deleted: true,
      })
      .eq('id', commentId);

    if (!error) {
      await loadComments();
    }
  }

  async function createReply(parentId: number, content: string) {
    if (!userId) {
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.from('comments').insert({
      topic_id: topicId,
      user_id: userId,
      parent_id: parentId,
      content,
    });

    if (!error) {
      await loadComments();
    }
  }

  function findComment(comments: Comment[], id: number): Comment | undefined {
    for (const comment of comments) {
      if (comment.id === id) {
        return comment;
      }

      const reply = findComment(comment.replies, id);

      if (reply) {
        return reply;
      }
    }

    return undefined;
  }

  async function toggleLike(commentId: number) {
    if (!userId) {
      return;
    }

    const supabase = createClient();

    const comment = findComment(comments, commentId);

    if (!comment) {
      return;
    }

    if (comment.likedByUser) {
      await supabase
        .from('comment_likes')
        .delete()
        .eq('user_id', userId)
        .eq('comment_id', commentId);
    } else {
      await supabase.from('comment_likes').insert({
        user_id: userId,
        comment_id: commentId,
      });
    }

    await loadComments();
  }

  if (loading) {
    return (
      <section id="comments" className="mb-16">
        <h2 className="mb-6 text-3xl font-bold">Comments</h2>

        <p>Loading comments...</p>
      </section>
    );
  }

  return (
    <section id="comments" className="mb-16">
      <h2 className="mb-6 text-3xl font-bold">Comments ({comments.length})</h2>

      <CommentForm onSubmit={createComment} />

      <div className="h-6" />

      {comments.length === 0 ? (
        <article className="border-border rounded-2xl border p-6">
          <p className="text-text-secondary">Be the first to comment.</p>
        </article>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              currentUserId={userId}
              onReply={createReply}
              onLike={toggleLike}
              onEdit={editComment}
              onDelete={deleteComment}
            />
          ))}
        </div>
      )}
    </section>
  );
}
