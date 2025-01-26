import React from 'react';

export default function Customer() {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Name Nic Or Phone"
          className="border border-gray-300 rounded px-4 py-2 w-1/2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </div>
  );
}
