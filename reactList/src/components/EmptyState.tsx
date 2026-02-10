import { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

const EmptyState = ({ icon = '📝', title, description, action }: EmptyStateProps) => {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">{icon}</div>
      <p className="text-gray-500 text-lg mb-2">{title}</p>
      {description && <p className="text-gray-400 text-sm mb-4">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export default EmptyState;

