'use client';

import { useState, useEffect } from 'react';
import { Download, FileText, Link, Image, Video, Eye } from 'lucide-react';

interface WebinarMaterialsProps {
  webinarId: string;
}

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'image' | 'video' | 'document';
  url: string;
  description?: string;
  size?: string;
  isDownloadable: boolean;
  availableAt: 'before' | 'during' | 'after';
}

export function WebinarMaterials({ webinarId }: WebinarMaterialsProps) {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch materials from API
    setTimeout(() => {
      setMaterials([
        {
          id: '1',
          title: 'Integration Techniques Slides',
          type: 'pdf',
          url: '/materials/integration-slides.pdf',
          description: 'Complete slide deck covering all integration methods',
          size: '2.4 MB',
          isDownloadable: true,
          availableAt: 'before',
        },
        {
          id: '2',
          title: 'Practice Problems Worksheet',
          type: 'pdf',
          url: '/materials/practice-problems.pdf',
          description: 'Additional practice problems with solutions',
          size: '1.8 MB',
          isDownloadable: true,
          availableAt: 'during',
        },
        {
          id: '3',
          title: 'Online Graphing Calculator',
          type: 'link',
          url: 'https://www.desmos.com/calculator',
          description: 'Interactive graphing tool for visualizing functions',
          isDownloadable: false,
          availableAt: 'during',
        },
        {
          id: '4',
          title: 'Integration Formula Sheet',
          type: 'image',
          url: '/materials/formula-sheet.png',
          description: 'Quick reference for common integration formulas',
          size: '856 KB',
          isDownloadable: true,
          availableAt: 'after',
        },
      ]);
      setLoading(false);
    }, 500);
  }, [webinarId]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'link': return '🔗';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      case 'document': return '📝';
      default: return '📎';
    }
  };

  const getAvailabilityColor = (availableAt: string) => {
    switch (availableAt) {
      case 'before': return 'bg-blue-100 text-blue-800';
      case 'during': return 'bg-green-100 text-green-800';
      case 'after': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityText = (availableAt: string) => {
    switch (availableAt) {
      case 'before': return 'Available now';
      case 'during': return 'During webinar';
      case 'after': return 'After webinar';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-gray-200 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="font-medium text-gray-900 mb-2">No Materials Available</h3>
        <p className="text-gray-600 text-sm">
          Materials for this webinar will be shared during the session.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Webinar Materials</h2>
      
      <div className="space-y-3">
        {materials.map((material) => (
          <div key={material.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start space-x-4">
              <span className="text-2xl">{getIcon(material.type)}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900 truncate">{material.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(material.availableAt)}`}>
                    {getAvailabilityText(material.availableAt)}
                  </span>
                </div>
                
                {material.description && (
                  <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  {material.size && (
                    <span className="text-xs text-gray-500">{material.size}</span>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0">
                {material.availableAt === 'before' || material.availableAt === 'during' ? (
                  <div className="flex space-x-2">
                    <a
                      href={material.url}
                      target={material.type === 'link' ? '_blank' : '_self'}
                      rel={material.type === 'link' ? 'noopener noreferrer' : undefined}
                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 px-3 py-1 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{material.type === 'link' ? 'Open' : 'View'}</span>
                    </a>
                    
                    {material.isDownloadable && (
                      <a
                        href={material.url}
                        download
                        className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-700 px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-lg">
                    Available after webinar
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 Materials will be automatically available based on the webinar schedule.</p>
      </div>
    </div>
  );
}
