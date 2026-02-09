import React from 'react';

/**
 * Loading 组件 Props
 */
export interface LoadingProps {
  /** 加载提示文本 */
  text?: string;
  /** 是否全屏显示 */
  fullScreen?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/**
 * Loading 加载组件
 * 
 * @example
 * ```tsx
 * <Loading />
 * <Loading text="加载中..." />
 * <Loading fullScreen />
 * ```
 */
const Loading: React.FC<LoadingProps> = ({
  text = '加载中...',
  fullScreen = false,
  className = '',
  style,
}) => {
  const containerStyle: React.CSSProperties = {
    padding: '2rem',
    textAlign: 'center',
    ...(fullScreen && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 9999,
    }),
    ...style,
  };

  return (
    <div className={className} style={containerStyle}>
      {text}
    </div>
  );
};

export default Loading;

