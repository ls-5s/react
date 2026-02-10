# Assets 资源文件夹

此文件夹用于存放项目的静态资源文件。

## 目录结构

- `images/` - 图片资源（如 logo、图标、背景图等）
- `fonts/` - 字体文件（如自定义字体）

## 使用方式

在组件中导入资源：

```tsx
import logo from '../assets/images/logo.png';
import customFont from '../assets/fonts/custom-font.woff2';
```

## 注意事项

- 图片建议使用 WebP 格式以获得更好的压缩效果
- 字体文件建议使用 woff2 格式以获得更好的浏览器兼容性
- 大文件建议使用 CDN 或外部链接

