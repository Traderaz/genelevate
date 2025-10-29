'use client';

import { useState, useEffect } from 'react';
import { NetflixDashboardLayout } from '@/components/layout/netflix-dashboard-layout';
import { RoleGuard } from '@/components/auth/role-guard';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Play, 
  Pause, 
  Clock, 
  Users, 
  Star, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Calendar,
  Tag,
  RefreshCw,
  Copy,
  Archive
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAdminContent, AdminContent } from '@/hooks/useAdminData';

export const dynamic = 'force-dynamic';

export default function AdminContentPage() {
  const { content, loading, error, updateContent, deleteContent, approveContent } = useAdminContent();
  const [filteredContent, setFilteredContent] = useState<AdminContent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Filter content based on search and filters
  useEffect(() => {
    let filtered = content;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredContent(filtered);
  }, [content, searchTerm, typeFilter, statusFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'webinar':
        return Video;
      case 'article':
        return FileText;
      case 'video':
        return Play;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'webinar':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'article':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'video':
        return 'bg-red-500/10 text-red-600 border-red-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'draft':
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
      case 'archived':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'pending_review':
        return 'bg-orange-500/10 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const handleContentAction = async (action: string, contentId: string) => {
    try {
      setActionLoading(contentId);
      
      switch (action) {
        case 'approve':
          await approveContent(contentId);
          break;
        case 'archive':
          await updateContent(contentId, { status: 'archived' });
          break;
        case 'publish':
          await updateContent(contentId, { status: 'published' });
          break;
        case 'draft':
          await updateContent(contentId, { status: 'draft' });
          break;
        case 'delete':
          if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
            await deleteContent(contentId);
          }
          break;
        case 'flag_issue':
          await updateContent(contentId, { hasIssues: true });
          break;
        case 'resolve_issue':
          await updateContent(contentId, { hasIssues: false });
          break;
        case 'view':
          // Navigate to content details page (implement later)
          console.log('View content:', contentId);
          break;
        default:
          console.log(`${action} content:`, contentId);
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      alert(`Failed to ${action} content. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  const contentStats = {
    total: content.length,
    published: content.filter(item => item.status === 'published').length,
    draft: content.filter(item => item.status === 'draft').length,
    pendingReview: content.filter(item => item.status === 'pending_review').length,
    withIssues: content.filter(item => item.hasIssues).length
  };

  return (
    <RoleGuard allowedRoles={['admin']}>
      <NetflixDashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-primary" />
                Content Management
              </h1>
              <p className="text-muted-foreground">
                Manage courses, webinars, articles, and educational content
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Content
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </Button>
            </div>
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{contentStats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Content</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{contentStats.published}</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{contentStats.draft}</p>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{contentStats.pendingReview}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{contentStats.withIssues}</p>
                  <p className="text-sm text-muted-foreground">With Issues</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search and Filter Content</CardTitle>
              <CardDescription>
                Find specific content and filter by type or status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search by title, author, category, or tags..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Types</option>
                  <option value="course">Courses</option>
                  <option value="webinar">Webinars</option>
                  <option value="article">Articles</option>
                  <option value="video">Videos</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="pending_review">Pending Review</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Content List */}
          <Card>
            <CardHeader>
              <CardTitle>Content Library ({filteredContent.length})</CardTitle>
              <CardDescription>
                All educational content with management options
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading content...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredContent.map((item) => {
                    const TypeIcon = getTypeIcon(item.type);
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${getTypeColor(item.type)}`}>
                            <TypeIcon className="w-5 h-5" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{item.title}</h3>
                              {item.hasIssues && (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>By {item.author}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </span>
                              {item.duration && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.duration}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {item.views} views
                              </span>
                              {item.enrollments && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {item.enrollments} enrolled
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge className={getTypeColor(item.type)}>
                                {item.type}
                              </Badge>
                              <Badge className={getStatusColor(item.status)}>
                                {item.status.replace('_', ' ')}
                              </Badge>
                              <Badge variant="outline">
                                {item.category}
                              </Badge>
                              {item.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs">{item.rating}</span>
                                </div>
                              )}
                            </div>

                            {item.tags.length > 0 && (
                              <div className="flex items-center gap-1 flex-wrap">
                                <Tag className="w-3 h-3 text-muted-foreground" />
                                {item.tags.map((tag, index) => (
                                  <span key={index} className="text-xs text-muted-foreground">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[200px]">
                          {/* Primary Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentAction('view', item.id)}
                              disabled={actionLoading === item.id}
                              className="text-xs"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Content
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentAction('edit', item.id)}
                              disabled={actionLoading === item.id}
                              className="text-xs"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>

                          {/* Status Actions */}
                          <div className="flex items-center gap-2">
                            {item.status === 'pending_review' && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleContentAction('approve', item.id)}
                                  disabled={actionLoading === item.id}
                                  className="text-xs text-green-600 hover:text-green-700 border-green-200"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleContentAction('reject', item.id)}
                                  disabled={actionLoading === item.id}
                                  className="text-xs text-red-600 hover:text-red-700 border-red-200"
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            
                            {item.status === 'draft' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContentAction('publish', item.id)}
                                disabled={actionLoading === item.id}
                                className="text-xs text-blue-600 hover:text-blue-700 border-blue-200"
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Publish
                              </Button>
                            )}
                            
                            {item.status === 'published' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContentAction('unpublish', item.id)}
                                disabled={actionLoading === item.id}
                                className="text-xs text-yellow-600 hover:text-yellow-700 border-yellow-200"
                              >
                                <Pause className="w-3 h-3 mr-1" />
                                Unpublish
                              </Button>
                            )}
                          </div>

                          {/* Issue Management */}
                          <div className="flex items-center gap-2">
                            {item.hasIssues ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContentAction('resolve_issue', item.id)}
                                disabled={actionLoading === item.id}
                                className="text-xs text-green-600 hover:text-green-700 border-green-200"
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolve Issue
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleContentAction('flag_issue', item.id)}
                                disabled={actionLoading === item.id}
                                className="text-xs text-yellow-600 hover:text-yellow-700 border-yellow-200"
                              >
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Report Issue
                              </Button>
                            )}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentAction('duplicate', item.id)}
                              disabled={actionLoading === item.id}
                              className="text-xs text-purple-600 hover:text-purple-700 border-purple-200"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Duplicate
                            </Button>
                          </div>

                          {/* Dangerous Actions */}
                          <div className="flex items-center gap-2 pt-1 border-t border-red-100">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentAction('archive', item.id)}
                              disabled={actionLoading === item.id}
                              className="text-xs text-orange-600 hover:text-orange-700 border-orange-200"
                            >
                              <Archive className="w-3 h-3 mr-1" />
                              Archive
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentAction('delete', item.id)}
                              disabled={actionLoading === item.id}
                              className="text-xs text-red-700 hover:text-red-800 border-red-300 bg-red-50 hover:bg-red-100"
                            >
                              {actionLoading === item.id ? (
                                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3 mr-1" />
                              )}
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredContent.length === 0 && (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No content found matching your criteria</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </NetflixDashboardLayout>
    </RoleGuard>
  );
}
