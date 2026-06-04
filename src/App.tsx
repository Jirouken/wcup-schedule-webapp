import { useState } from 'react';
import { matches } from './data/matches';
import { useWatchList } from './hooks/useWatchList';
import { useScores } from './hooks/useScores';
import { useStandings } from './hooks/useStandings';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import type { Filters } from './components/FilterPanel';
import { MatchList } from './components/MatchList';
import { WatchList } from './components/WatchList';
import { StandingsPanel } from './components/StandingsPanel';
import { BroadcastInfoBanner } from './components/BroadcastInfoBanner';
import './index.css';

type Tab = 'matches' | 'watchlist' | 'standings';

const defaultFilters: Filters = {
  phase: 'all',
  broadcaster: 'all',
  japanOnly: false,
  watchedOnly: false,
};

function App() {
  const { watched, toggle, copyShareUrl } = useWatchList();
  const { getScore } = useScores();
  const standings = useStandings();
  const [tab, setTab] = useState<Tab>('matches');
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'group' | 'date'>('group');

  const activeFilterCount = [
    filters.phase !== 'all',
    filters.broadcaster !== 'all',
    filters.japanOnly,
    filters.watchedOnly,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0e1a' }}>
      <Header onCopyShare={copyShareUrl} />

      {/* Tab bar */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 pt-2">
          <button
            onClick={() => setTab('matches')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === 'matches'
                ? 'bg-gray-800 text-amber-400 border-t border-x border-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            ⚽ 全試合一覧
            <span className="ml-1.5 text-xs text-gray-500">({matches.length})</span>
          </button>
          <button
            onClick={() => setTab('watchlist')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === 'watchlist'
                ? 'bg-gray-800 text-amber-400 border-t border-x border-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            📋 マイウォッチリスト
            {watched.size > 0 && (
              <span className="ml-1.5 bg-amber-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                {watched.size}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab('standings')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              tab === 'standings'
                ? 'bg-gray-800 text-amber-400 border-t border-x border-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            📊 順位表
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {tab === 'matches' ? (
          <>
            <BroadcastInfoBanner />

            {/* Desktop: sidebar + content */}
            <div className="lg:flex lg:gap-6">
              {/* Desktop filter sidebar */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-20">
                  <FilterPanel
                    filters={filters}
                    onChange={setFilters}
                    watchedCount={watched.size}
                  />
                </div>
              </aside>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                {/* Mobile filter button */}
                <div className="lg:hidden mb-3 flex items-center gap-2">
                  <button
                    onClick={() => setFilterOpen(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                      activeFilterCount > 0
                        ? 'border-amber-500/60 bg-amber-900/30 text-amber-300'
                        : 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    🔽 絞り込み
                    {activeFilterCount > 0 && (
                      <span className="bg-amber-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => setFilters(defaultFilters)}
                      className="text-xs text-gray-400 hover:text-gray-200"
                    >
                      リセット
                    </button>
                  )}
                </div>

                <MatchList
                  matches={matches}
                  watched={watched}
                  onToggle={toggle}
                  filters={filters}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  getScore={getScore}
                />
              </div>
            </div>

            {/* Mobile filter drawer */}
            <FilterPanel
              filters={filters}
              onChange={f => setFilters(f)}
              watchedCount={watched.size}
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
              isMobile
            />
          </>
        ) : tab === 'watchlist' ? (
          <WatchList
            matches={matches}
            watched={watched}
            onToggle={toggle}
            getScore={getScore}
          />
        ) : (
          <StandingsPanel groups={standings.groups} />
        )}
      </div>
    </div>
  );
}

export default App;
