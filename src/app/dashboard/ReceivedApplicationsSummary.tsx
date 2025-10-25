'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const ReceivedApplicationsSummary = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        // Don't show an error, just don't display the component
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/applications/my/received-applications', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        // Take only the first 5
        setApplications(data.data.slice(0, 5));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [getAccessToken]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;
  if (applications.length === 0) return null; // Don't render if no applications

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900">최근 받은 지원</h3>
          <Link href="/dashboard/applications" className="text-sm text-emerald-600 hover:underline">
            전체보기
          </Link>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {applications.map((app) => (
          <div key={app.application_id} className="flex items-start justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img className="w-full h-full rounded-full" src={app.guest_profile_image || '/favicon/favicon.svg'} alt="" />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900 mb-1">{app.guest_name}</div>
                <div className="text-sm text-gray-600">{app.request_title}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{new Date(app.applied_at).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceivedApplicationsSummary;
