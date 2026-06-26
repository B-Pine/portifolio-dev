import React from 'react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile.js';
import PhotoGallery from '../components/PhotoGallery.jsx';

export default function AboutView({ onOpenProject, onOpenFile }) {
  const { t } = useTranslation();

  const photos = [
    {
      src: '/images/coding-session.jpg',
      title: 'In the zone',
      caption: 'A coding session — where the work actually happens.',
      linkLabel: 'View skills',
      onOpen: () => onOpenFile?.('skills')
    },
    {
      src: '/images/prize-hatana.jpg',
      title: 'Hatana Hackathon — 1st Place',
      caption: 'MasterCard Foundation × University of Rwanda · $5,000 SEF 2.0 grant.',
      linkLabel: 'See achievement',
      onOpen: () => onOpenFile?.('education')
    },
    {
      src: '/images/sigeth-pos-banner.jpg',
      title: 'SIGETH POS @ Poolside View',
      caption: 'Hotel & restaurant point-of-sales, live on site for SYSIGETH Ltd.',
      linkLabel: 'Open SIGETH',
      onOpen: () => onOpenProject?.('sigeth')
    },
    {
      src: '/images/sigeth-onsite-team.jpg',
      title: 'On-site installation',
      caption: 'Deploying SIGETH on site with the SYSIGETH team.',
      linkLabel: 'Open SIGETH',
      onOpen: () => onOpenProject?.('sigeth')
    }
  ];

  return (
    <div className="h-full overflow-auto p-8 font-mono text-sm leading-relaxed">
      <div className="max-w-3xl mx-auto pb-64">
        <div className="mb-6">
          <span className="syntax-keyword text-2xl font-bold font-headline"># {t('about.title')}</span>
          <div className="h-1 w-16 bg-primary mt-2 rounded-full" />
        </div>

        <div className="syntax-comment mb-4">// {t('about.comment')}</div>

        <div className="space-y-1 mb-8">
          <div>
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">{t('about.name')}</span>{' '}
            <span className="text-on-surface">=</span>{' '}
            <span className="syntax-string">"{profile.name}"</span>;
          </div>
          {profile.nickname && (
            <div>
              <span className="syntax-keyword">const</span>{' '}
              <span className="syntax-function">{t('about.alias')}</span>{' '}
              <span className="text-on-surface">=</span>{' '}
              <span className="syntax-string">"{profile.nickname}"</span>;
            </div>
          )}
          <div>
            <span className="syntax-keyword">const</span>{' '}
            <span className="syntax-function">{t('about.role')}</span>{' '}
            <span className="text-on-surface">=</span>{' '}
            <span className="syntax-string">"{profile.role}"</span>;
          </div>
        </div>

        <p className="text-on-surface leading-7 max-w-2xl">{profile.bio}</p>

        <section className="mt-8">
          <div className="syntax-comment text-xs mb-3">// gallery — hover a photo for more</div>
          <PhotoGallery items={photos} />
        </section>

        <div className="syntax-comment mt-8">
          // {t('about.try')}: <span className="syntax-function">skills</span> ·{' '}
          <span className="syntax-function">projects</span> ·{' '}
          <span className="syntax-function">contact</span>
        </div>
      </div>
    </div>
  );
}
