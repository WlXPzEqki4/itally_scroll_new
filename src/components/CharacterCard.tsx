
import React from 'react';
import { cn } from '@/lib/utils';

interface Character {
  name: string;
  role: string;
  description: string;
  status: 'active' | 'fled' | 'deceased' | 'unknown';
  importance: 'critical' | 'high' | 'medium' | 'low';
  phone?: string;
  generation?: 'Original' | 'Second Generation';
  family_relation?: string;
  alias?: string;
  firstAppearance?: string;
}

interface CharacterCardProps {
  character: Character;
  isActive?: boolean;
  onClick?: () => void;
  isNew?: boolean;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isActive = false,
  onClick,
  isNew = false
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'fled': return 'bg-yellow-500';
      case 'deceased': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'border-red-400 ring-red-400/20';
      case 'high': return 'border-orange-400 ring-orange-400/20';
      case 'medium': return 'border-blue-400 ring-blue-400/20';
      default: return 'border-gray-400 ring-gray-400/20';
    }
  };

  const getFamilyColor = (familyRelation?: string) => {
    if (familyRelation === 'Al-Ruwais family') {
      return 'bg-purple-500/10 border-purple-400/30';
    }
    return 'bg-slate-800/90';
  };

  const getGenerationBadgeColor = (generation?: string) => {
    switch (generation) {
      case 'Original': return 'bg-blue-500/20 text-blue-300';
      case 'Second Generation': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="relative">
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10 font-medium">
          NEW
        </div>
      )}
      
      <div
        className={cn(
          'backdrop-blur-sm rounded-lg p-4 border-2 transition-all duration-300 cursor-pointer relative',
          'hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20',
          isActive && 'ring-4',
          getImportanceColor(character.importance),
          getFamilyColor(character.family_relation)
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-white font-semibold text-lg truncate">{character.name}</h3>
              {character.family_relation === 'Al-Ruwais family' && (
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" title="Al-Ruwais Family" />
              )}
            </div>
            {character.alias && (
              <p className="text-yellow-300 text-xs italic">"{character.alias}"</p>
            )}
            <p className="text-blue-300 text-sm">{character.role}</p>
          </div>
          <div className={cn('w-3 h-3 rounded-full flex-shrink-0', getStatusColor(character.status))} />
        </div>
        
        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
          {character.description}
        </p>

        {character.phone && (
          <div className="mb-3 p-2 bg-slate-700/50 rounded text-xs">
            <span className="text-gray-400">Phone: </span>
            <span className="text-green-300 font-mono">{character.phone}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              character.importance === 'critical' && 'bg-red-500/20 text-red-300',
              character.importance === 'high' && 'bg-orange-500/20 text-orange-300',
              character.importance === 'medium' && 'bg-blue-500/20 text-blue-300',
              character.importance === 'low' && 'bg-gray-500/20 text-gray-300'
            )}>
              {character.importance.toUpperCase()}
            </span>
            
            {character.generation && (
              <span className={cn(
                'px-2 py-1 rounded text-xs font-medium',
                getGenerationBadgeColor(character.generation)
              )}>
                {character.generation === 'Second Generation' ? '2ND GEN' : 'ORIGINAL'}
              </span>
            )}
          </div>
          
          <span className={cn(
            'px-2 py-1 rounded text-xs',
            getStatusColor(character.status),
            'text-white font-medium'
          )}>
            {character.status.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
