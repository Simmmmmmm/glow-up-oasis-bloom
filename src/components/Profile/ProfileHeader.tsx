
import React from 'react';

interface ProfileHeaderProps {
  title: string;
  description: string;
}

const ProfileHeader = ({ title, description }: ProfileHeaderProps) => {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default ProfileHeader;
