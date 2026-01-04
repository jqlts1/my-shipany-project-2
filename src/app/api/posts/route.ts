import { NextRequest, NextResponse } from 'next/server';

import { envConfigs } from '@/config';
import { getUuid } from '@/shared/lib/hash';
import { addPost, NewPost, PostStatus, PostType } from '@/shared/models/post';
import { getUsers } from '@/shared/models/user';

export async function POST(req: NextRequest) {
  try {
    // 1. Auth Check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid API key' }, { status: 401 });
    }

    const apiKey = authHeader.split(' ')[1];
    
    // Check against environment variable
    if (apiKey !== envConfigs.blog_api_secret) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Get a designated user for the post (e.g. the first admin or user)
    // Since we don't have a userId from the token, we'll fetch the first user from the DB
    const users = await getUsers({ limit: 1 });
    if (!users || users.length === 0) {
       return NextResponse.json({ error: 'No users found in database to attribute post to' }, { status: 500 });
    }
    const defaultUserId = users[0].id;

    // 2. Parse Body
    const body = await req.json();
    const { 
      slug, 
      title, 
      content, 
      description, 
      categories, 
      image,
      authorName,
      authorImage 
    } = body;

    // 3. Validation
    if (!slug || !title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
    }

    // 4. Create Post
    const newPost: NewPost = {
      id: getUuid(),
      userId: defaultUserId,
      parentId: '', 
      slug: slug.trim().toLowerCase(),
      type: PostType.ARTICLE,
      title: title.trim(),
      description: description?.trim() || '',
      image: image || '',
      content: content?.trim() || '',
      categories: categories?.trim() || 'all',
      tags: '',
      authorName: authorName?.trim() || '',
      authorImage: authorImage || '',
      status: PostStatus.PUBLISHED,
    };

    const result = await addPost(newPost);

    if (!result) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        id: result.id,
        slug: result.slug,
        url: `/blog/${result.slug}`
      } 
    }, { status: 201 });

  } catch (error: any) {
    console.error('API create post failed:', error);
    
    if (error.code === '23505') { 
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
