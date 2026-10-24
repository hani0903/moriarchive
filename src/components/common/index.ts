/**
 * Server-safe presentational pieces. Nothing here is a client component and
 * nothing reaches the filesystem, so this barrel is safe from either side of the
 * server/client boundary.
 */
export { Breadcrumb, type BreadcrumbItem } from '@/components/common/breadcrumb';
export { EmptyState, type EmptyStateProps } from '@/components/common/empty-state';
export { GitHubMark } from '@/components/common/github-mark';
export { IconButton, type IconButtonProps } from '@/components/common/icon-button';
export { SkillIcon } from '@/components/common/skill-icon';
export { SectionHeader, type SectionHeaderProps } from '@/components/common/section-header';
