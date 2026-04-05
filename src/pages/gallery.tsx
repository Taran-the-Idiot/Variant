import {useEffect, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './gallery.module.css';

type AirtableAttachment = {
	url?: string;
	thumbnails?: {
		large?: {url?: string};
		full?: {url?: string};
	};
};

type AirtableRecord = {
	id: string;
	fields: Record<string, unknown>;
};

type ProjectCard = {
	id: string;
	title: string;
	coverImageUrl: string;
	githubUrl: string;
	demoUrl: string;
};

type GalleryConfig = {
	airtableBaseId?: string;
	airtableTableName?: string;
	airtableApiToken?: string;
	airtableViewName?: string;
	airtableTitleField?: string;
	airtableCoverField?: string;
	airtableGithubField?: string;
	airtableDemoField?: string;
};

const fallbackImage = '/img/repo.png';

function asString(value: unknown): string | undefined {
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function extractImageUrl(value: unknown): string | undefined {
	if (typeof value === 'string') {
		return value.trim() || undefined;
	}

	if (Array.isArray(value) && value.length > 0) {
		const [firstItem] = value as AirtableAttachment[];
		return firstItem?.thumbnails?.large?.url ?? firstItem?.thumbnails?.full?.url ?? firstItem?.url;
	}

	return undefined;
}

function getField(fields: Record<string, unknown>, names: string[]): unknown {
	for (const name of names) {
		if (Object.prototype.hasOwnProperty.call(fields, name)) {
			return fields[name];
		}
	}

	return undefined;
}

function toProject(record: AirtableRecord, config: GalleryConfig): ProjectCard | null {
	const title =
		asString(getField(record.fields, [config.airtableTitleField ?? 'Title', 'Name', 'Project'])) ??
		'Untitled project';
	const coverImageUrl =
		extractImageUrl(
			getField(record.fields, [config.airtableCoverField ?? 'Cover image', 'Cover', 'Image']),
		) ?? fallbackImage;
	const githubUrl =
		asString(getField(record.fields, [config.airtableGithubField ?? 'GitHub repo', 'GitHub', 'Repo'])) ??
		'';
	const demoUrl =
		asString(getField(record.fields, [config.airtableDemoField ?? 'Demo', 'Demo URL', 'Website'])) ??
		'';

	if (!githubUrl || !demoUrl) {
		return null;
	}

	return {
		id: record.id,
		title,
		coverImageUrl,
		githubUrl,
		demoUrl,
	};
}

function GalleryCard({project}: {project: ProjectCard}) {
	return (
		<article className={styles.card}>
			<div className={styles.imageWrap}>
				<img className={styles.image} src={project.coverImageUrl} alt={`${project.title} cover`} loading="lazy" />
			</div>
			<div className={styles.cardBody}>
				<Heading as="h2" className={styles.cardTitle}>
					{project.title}
				</Heading>
				<div className={styles.actions}>
					<a
						className={clsx('button button--secondary button--sm', styles.actionButton)}
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer">
						Repo
					</a>
					<a
						className={clsx('button button--primary button--sm', styles.actionButton)}
						href={project.demoUrl}
						target="_blank"
						rel="noopener noreferrer">
						Demo
					</a>
				</div>
			</div>
		</article>
	);
}

export default function GalleryPage() {
	const {siteConfig} = useDocusaurusContext();
	const customFields = siteConfig.customFields as GalleryConfig;
	const {
		airtableBaseId,
		airtableTableName,
		airtableApiToken,
		airtableViewName,
		airtableTitleField,
		airtableCoverField,
		airtableGithubField,
		airtableDemoField,
	} = customFields;

	const [projects, setProjects] = useState<ProjectCard[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!airtableBaseId || !airtableTableName || !airtableApiToken) {
			setError('For admin: Set AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME, and AIRTABLE_API_TOKEN');
			setLoading(false);
			return;
		}

		const baseId = airtableBaseId;
		const tableName = airtableTableName;
		const apiToken = airtableApiToken;

		const controller = new AbortController();

		async function loadProjects() {
			try {
				setLoading(true);
				setError(null);

				const params = new URLSearchParams();
				if (airtableViewName) {
					params.set('view', airtableViewName);
				}

				const queryString = params.toString();
				const response = await fetch(
					`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}${
						queryString ? `?${queryString}` : ''
					}`,
					{
						signal: controller.signal,
						headers: {
							Authorization: `Bearer ${apiToken}`,
						},
					},
				);

				if (!response.ok) {
					throw new Error(`Airtable request failed with status ${response.status}`);
				}

				const data = (await response.json()) as {records?: AirtableRecord[]};
				const nextProjects = (data.records ?? [])
					.map((record) =>
						toProject(record, {
							airtableTitleField,
							airtableCoverField,
							airtableGithubField,
							airtableDemoField,
						}),
					)
					.filter((project): project is ProjectCard => project !== null);

				setProjects(nextProjects);
			} catch (requestError) {
				if (requestError instanceof DOMException && requestError.name === 'AbortError') {
					return;
				}

				setError(requestError instanceof Error ? requestError.message : 'Unable to load projects from Airtable.');
			} finally {
				setLoading(false);
			}
		}

		void loadProjects();

		return () => controller.abort();
	}, [airtableBaseId, airtableTableName, airtableApiToken, airtableViewName, airtableTitleField, airtableCoverField, airtableGithubField, airtableDemoField]);

	return (
		<Layout
			title="Gallery"
			description="A project gallery pulled from Airtable and displayed as linked cards.">
			<main className={styles.page}>
				<section className={styles.hero}>
					<div className={styles.heroInner}>
						<Heading as="h1" className={styles.title}>
							The Gallery!
						</Heading>
						<p className={styles.subtitle}>
                            Here are some projects made by the community! Take a scroll and check them out!
						</p>
					</div>
				</section>

				<section className={styles.content}>
					{loading ? (
						<div className={styles.statusCard}>Loading projects from Airtable...</div>
					) : error ? (
						<div className={clsx(styles.statusCard, styles.errorCard)}>{error}</div>
					) : projects.length === 0 ? (
						<div className={styles.statusCard}>No projects were found in Airtable.</div>
					) : (
						<div className={styles.grid}>
							{projects.map((project) => (
								<GalleryCard key={project.id} project={project} />
							))}
						</div>
					)}
				</section>
			</main>
		</Layout>
	);
}
