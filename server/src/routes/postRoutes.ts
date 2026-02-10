import { Router, Request, Response, NextFunction } from 'express';
import { posts, Post } from '../data/posts.js';
import { validatePost, validateId } from '../middleware/validator.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

// 获取文章列表
router.get('/list', (req: Request, res: Response) => {
  const { page = '1', page_size = '10', keyword } = req.query;
  
  const pageNum = Number(page);
  const pageSizeNum = Number(page_size);
  
  let filteredPosts = posts;
  
  // 关键词搜索
  if (keyword && typeof keyword === 'string') {
    const keywordLower = keyword.toLowerCase();
    filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(keywordLower) ||
        post.content.toLowerCase().includes(keywordLower)
    );
  }
  
  // 分页
  const total = filteredPosts.length;
  const start = (pageNum - 1) * pageSizeNum;
  const end = start + pageSizeNum;
  const list = filteredPosts.slice(start, end);
  
  res.json({
    code: 200,
    message: 'success',
    success: true,
    data: {
      list,
      total,
      page: pageNum,
      page_size: pageSizeNum,
    },
  });
});

// 获取文章详情
router.get('/:id', validateId, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  
  if (!post) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在',
      success: false,
      data: null,
    });
  }
  
  res.json({
    code: 200,
    message: 'success',
    success: true,
    data: post,
  });
});

// 创建文章
router.post('/', validatePost, (req: Request, res: Response) => {
  const { title, content, author_id = 1, author_name = '匿名用户' } = req.body;
  
  const newId = Math.max(...posts.map(p => p.id), 0) + 1;
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const now = new Date().toISOString();
  
  const newPost: Post = {
    id: newId,
    title: title.trim(),
    content: content.trim(),
    slug,
    author_id,
    author_name,
    created_at: now,
    updated_at: now,
  };
  
  posts.push(newPost);
  
  res.json({
    code: 200,
    message: '创建成功',
    success: true,
    data: newPost,
  });
});

// 更新文章
router.put('/:id', validateId, validatePost, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content } = req.body;
  
  const index = posts.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在',
      success: false,
      data: null,
    });
  }
  
  const updatedPost: Post = {
    ...posts[index],
    title: title.trim(),
    content: content.trim(),
    updated_at: new Date().toISOString(),
  };
  
  posts[index] = updatedPost;
  
  res.json({
    code: 200,
    message: '更新成功',
    success: true,
    data: updatedPost,
  });
});

// 删除文章
router.delete('/:id', validateId, (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      code: 404,
      message: '文章不存在',
      success: false,
      data: null,
    });
  }
  
  posts.splice(index, 1);
  
  res.json({
    code: 200,
    message: '删除成功',
    success: true,
    data: null,
  });
});

export default router;

