import React, { useState, useEffect } from 'react';
import ScrollSection from '@/components/ScrollSection';
import CharacterCard from '@/components/CharacterCard';
import InteractiveMap from '@/components/InteractiveMap';
import NetworkMap from '@/components/NetworkMap';
import ProgressIndicator from '@/components/ProgressIndicator';
import TimelineEvent from '@/components/TimelineEvent';
import NetworkVisualization from '@/components/NetworkVisualization';
import { cn } from '@/lib/utils';
import networkData from '@/data/networkData.json';

const Index = () => {
  const [activeSection, setActiveSection] = useState('executive');
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const sections = [
    'executive', 'opening', 'foundation', 'investment', 'scaling', 'fortress', 
    'crisis', 'innovation', 'current', 'summary', 'phases', 'military', 'strategic'
  ];

  // Enhanced network visualization data
  const networkNodes = [
    { id: 'bassem_arsan', name: 'Bassem Arsan', type: 'person' as const, status: 'active' as const, importance: 5, x: 0, y: 0 },
    { id: 'rafi_al_ruwais', name: 'Rafi Al-Ruwais', type: 'person' as const, status: 'active' as const, importance: 4, x: 0, y: 0 },
    { id: 'ahmed_al_ruwais', name: 'Ahmed Al-Ruwais', type: 'person' as const, status: 'active' as const, importance: 5, x: 0, y: 0 },
    { id: 'osama_al_dayat', name: 'Osama Al-Dayat', type: 'person' as const, status: 'active' as const, importance: 4, x: 0, y: 0 },
    { id: 'hayel_al_adamat', name: 'Hayel Al-Adamat', type: 'person' as const, status: 'active' as const, importance: 3, x: 0, y: 0 },
    { id: 'maaraba_fortress', name: 'Maaraba Fortress', type: 'location' as const, status: 'active' as const, importance: 4, x: 0, y: 0 },
    { id: 'al_saada_farms', name: 'Al-Saada Farms', type: 'location' as const, status: 'active' as const, importance: 3, x: 0, y: 0 },
    { id: 'anti_drug_vigilantes', name: 'Vigilante Groups', type: 'operation' as const, status: 'disrupted' as const, importance: 3, x: 0, y: 0 },
  ];

  const networkConnections = [
    { source: 'bassem_arsan', target: 'rafi_al_ruwais', strength: 3, type: 'operational' as const },
    { source: 'rafi_al_ruwais', target: 'ahmed_al_ruwais', strength: 5, type: 'familial' as const },
    { source: 'ahmed_al_ruwais', target: 'osama_al_dayat', strength: 4, type: 'operational' as const },
    { source: 'hayel_al_adamat', target: 'al_saada_farms', strength: 4, type: 'operational' as const },
    { source: 'ahmed_al_ruwais', target: 'maaraba_fortress', strength: 5, type: 'operational' as const },
    { source: 'anti_drug_vigilantes', target: 'maaraba_fortress', strength: 2, type: 'operational' as const },
  ];

  // Convert network data to proper types
  const convertedCharacters = Object.fromEntries(
    Object.entries(networkData.characters).map(([key, character]) => [
      key,
      {
        ...character,
        status: character.status as 'active' | 'fled' | 'deceased' | 'unknown',
        importance: character.importance as 'critical' | 'high' | 'medium' | 'low',
        generation: character.generation as 'Original' | 'Second Generation' | undefined
      }
    ])
  );

  // Convert location data to proper types
  const convertedLocations = Object.fromEntries(
    Object.entries(networkData.locations).map(([key, location]) => [
      key,
      {
        ...location,
        coordinates: location.coordinates as [number, number]
      }
    ])
  );

  // Helper function to check if character is new (appears in recent timeline events)
  const isNewCharacter = (characterId: string) => {
    const character = convertedCharacters[characterId];
    if (!character?.firstAppearance) return false;
    
    const recentEvents = ['network_recovery_2024', 'generational_transition_2024', 'residential_compound_2024'];
    return recentEvents.includes(character.firstAppearance);
  };

  // Get characters for current section
  const getCharactersForSection = (section: string) => {
    switch (section) {
      case 'foundation':
        return ['bassem_arsan', 'rafi_al_ruwais'];
      case 'investment':
        return ['khaldoun_al_hatiti'];
      case 'scaling':
        return ['muhammad_al_ruwais', 'ahmed_al_ruwais'];
      case 'current':
      case 'summary':
        return ['ahmed_al_ruwais', 'muhammad_al_ruwais', 'osama_al_dayat', 'hayel_al_adamat', 'abdul_azeez_al_ruwais'];
      default:
        return Object.keys(convertedCharacters).slice(0, 4);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <ProgressIndicator sections={sections} activeSection={activeSection} />
      
      <div className="pt-16">
        {/* Executive Overview - NEW SECTION 1 */}
        <ScrollSection
          id="executive"
          onInView={(inView) => inView && setActiveSection('executive')}
          className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent leading-tight">
                Executive Intelligence Assessment
              </h1>
              <p className="text-2xl text-gray-300 mt-6 max-w-4xl mx-auto">
                Al-Ruwais Network: 30-Month Evolution Analysis
              </p>
              <div className="mt-8 inline-flex items-center px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-full">
                <span className="text-red-400 font-semibold text-lg">THREAT LEVEL: CRITICAL</span>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">13</div>
                    <div className="text-gray-300 text-sm mb-1">Intelligence Reports</div>
                    <div className="text-xs text-gray-500">Mar 2022 - Aug 2024</div>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">5</div>
                    <div className="text-gray-300 text-sm mb-1">Evolution Phases</div>
                    <div className="text-xs text-gray-500">Foundation → Innovation</div>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">7</div>
                    <div className="text-gray-300 text-sm mb-1">Family Members</div>
                    <div className="text-xs text-gray-500">Multi-generational</div>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">4</div>
                    <div className="text-gray-300 text-sm mb-1">Countries</div>
                    <div className="text-xs text-gray-500">Syria, Lebanon, Jordan, Iran</div>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">$700K+</div>
                    <div className="text-gray-300 text-sm mb-1">Per Operation</div>
                    <div className="text-xs text-gray-500">2022 Revenue</div>
                  </div>
                  <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">8th</div>
                    <div className="text-gray-300 text-sm mb-1">Brigade Level</div>
                    <div className="text-xs text-gray-500">Military Integration</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-semibold text-lg mb-4">Threat Assessment Factors</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">State institutional penetration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Advanced technological capabilities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Multi-generational sustainability</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Cross-border operational integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm">Military-grade equipment access</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/20 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
              <h3 className="text-white font-semibold text-xl mb-6">Evolution Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-gray-300">Government advisor supply chain coordination</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-gray-300">Hezbollah base with heavy weapons</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-gray-300">Survived major airstrike, 15-month recovery</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-gray-300">Drone and mortar delivery systems</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0 mt-1"></div>
                    <span className="text-gray-300">Brigade-level military integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Opening Hook - Enhanced with new statistics */}
        <ScrollSection
          id="opening"
          onInView={(inView) => inView && setActiveSection('opening')}
          className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
                  The Al-Ruwais Network
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  From a Syrian government advisor's medical imports to a multi-generational criminal enterprise spanning borders...
                </p>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <p className="text-gray-400 italic text-lg leading-relaxed">
                    "What began as legitimate pharmaceutical imports evolved into one of the region's most sophisticated 
                    drug trafficking operations, now led by a 19-year-old commanding a compound of 15+ residents."
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 w-full max-w-md">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-blue-500/20 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">$700K+</div>
                      <div className="text-sm text-gray-300">Initial Investment</div>
                    </div>
                    <div className="bg-green-500/20 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">2.5+ Years</div>
                      <div className="text-sm text-gray-300">Operation Duration</div>
                    </div>
                    <div className="bg-purple-500/20 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">11</div>
                      <div className="text-sm text-gray-300">Key Operators</div>
                    </div>
                    <div className="bg-red-500/20 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">15+</div>
                      <div className="text-sm text-gray-300">Compound Residents</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Foundation Era - Enhanced with phase indicators */}
        <ScrollSection
          id="foundation"
          onInView={(inView) => inView && setActiveSection('foundation')}
          className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">The Foundation</h2>
                
                <div className="space-y-6">
                  <TimelineEvent
                    title="Supply Chain Established"
                    date="March 11, 2022"
                    description="Bassem Arsan establishes medical import route from Iran through Damascus to Ghasm village farm"
                    type="foundation"
                    phase="Phase 1"
                    impact="high"
                    isActive={true}
                  />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  {getCharactersForSection('foundation').map(characterId => (
                    <CharacterCard
                      key={characterId}
                      character={convertedCharacters[characterId]}
                      isActive={selectedCharacter === characterId}
                      onClick={() => setSelectedCharacter(characterId)}
                      isNew={isNewCharacter(characterId)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="h-96 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <NetworkMap
                    activeSection={activeSection}
                    onLocationSelect={(location) => console.log('Selected location:', location)}
                  />
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold mb-4 text-lg">Key Coordinates</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Ghasm Farm:</span>
                      <span className="text-blue-400 font-mono text-sm">32°30'01.9"N, 36°23'16.3"E</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Damascus Office:</span>
                      <span className="text-blue-400 font-mono text-sm">33°25'09.4"N, 36°15'05.4"E</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Investment Strategy - Enhanced with financial breakdown */}
        <ScrollSection
          id="investment"
          onInView={(inView) => inView && setActiveSection('investment')}
          className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Strategic Investment</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                A single $700,000 operation through Border Outpost 89 provides the capital needed for massive expansion
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 h-full">
                  <h3 className="text-2xl font-semibold text-white mb-8">Financial Flow Analysis</h3>
                  <div className="space-y-8">
                    <div className="flex items-center justify-between bg-green-500/20 rounded-xl p-6">
                      <div>
                        <div className="text-green-400 font-semibold text-lg mb-1">Revenue Generated</div>
                        <div className="text-3xl font-bold text-white">$700,000</div>
                      </div>
                      <div className="text-green-400 text-3xl">💰</div>
                    </div>
                    
                    <div className="grid sm:grid-cols-3 gap-6">
                      <div className="bg-blue-500/20 rounded-xl p-6 text-center">
                        <div className="text-blue-400 font-semibold mb-2">Equipment</div>
                        <div className="text-2xl font-bold text-white">$300K</div>
                      </div>
                      <div className="bg-purple-500/20 rounded-xl p-6 text-center">
                        <div className="text-purple-400 font-semibold mb-2">Security</div>
                        <div className="text-2xl font-bold text-white">$200K</div>
                      </div>
                      <div className="bg-yellow-500/20 rounded-xl p-6 text-center">
                        <div className="text-yellow-400 font-semibold mb-2">Operations</div>
                        <div className="text-2xl font-bold text-white">$200K</div>
                      </div>
                    </div>

                    {/* Revenue Streams */}
                    <div className="bg-slate-700/30 rounded-xl p-6">
                      <h4 className="text-white font-semibold mb-4">Current Revenue Streams</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {networkData.financial_data.revenue_streams.map((stream, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
                            <div>
                              <div className="text-white text-sm font-medium">{stream.type.replace('_', ' ').toUpperCase()}</div>
                              <div className="text-gray-400 text-xs">{stream.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <TimelineEvent
                  title="Major Funding Secured"
                  date="March 4, 2022"
                  description="$700K operation provides expansion capital"
                  type="financial"
                  phase="Phase 1"
                  impact="high"
                  isActive={true}
                />
                
                {getCharactersForSection('investment').map(characterId => (
                  <CharacterCard
                    key={characterId}
                    character={convertedCharacters[characterId]}
                    isActive={selectedCharacter === characterId}
                    onClick={() => setSelectedCharacter(characterId)}
                    isNew={isNewCharacter(characterId)}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Network Visualization - Enhanced with opposition forces */}
        <ScrollSection
          id="scaling"
          onInView={(inView) => inView && setActiveSection('scaling')}
          className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Network Growth & Opposition</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                The network expands rapidly while facing increased opposition from vigilante groups and security forces
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-16 items-center">
              <div className="order-2 lg:order-1">
                <NetworkVisualization
                  data={{
                    nodes: networkNodes,
                    edges: networkConnections,
                    activeNode: selectedCharacter || undefined
                  }}
                />
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="h-96 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                  <NetworkMap
                    activeSection={activeSection}
                    onLocationSelect={(location) => console.log('Selected location:', location)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-4">🏭</div>
                <div className="text-3xl font-bold text-white mb-2">6</div>
                <div className="text-gray-300 text-sm">Facilities</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-4">👥</div>
                <div className="text-3xl font-bold text-white mb-2">11</div>
                <div className="text-gray-300 text-sm">Key Operators</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
                <div className="text-4xl mb-4">🏠</div>
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-gray-300 text-sm">Residents</div>
              </div>
              <div className="bg-red-800/30 backdrop-blur-sm rounded-xl p-6 border border-red-700 text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <div className="text-3xl font-bold text-red-400 mb-2">2</div>
                <div className="text-gray-300 text-sm">Opposition Forces</div>
              </div>
            </div>

            {/* Opposition Forces Information */}
            <div className="mt-12 bg-red-900/20 border border-red-700/50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-red-400 mb-6">Opposition Forces</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(networkData.opposition_forces).map(([key, force]) => (
                  <div key={key} className="bg-slate-800/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold text-lg mb-3">{force.name}</h4>
                    <div className="space-y-3">
                      {'impact_level' in force && (
                        <div>
                          <span className="text-gray-400 text-sm">Impact Level: </span>
                          <span className={cn(
                            'text-sm font-medium px-2 py-1 rounded',
                            force.impact_level === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'
                          )}>
                            {force.impact_level?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      {force.capabilities && (
                        <div>
                          <span className="text-gray-400 text-sm">Capabilities: </span>
                          <span className="text-gray-300 text-sm">{force.capabilities.join(', ')}</span>
                        </div>
                      )}
                      {'network_response' in force && force.network_response && (
                        <div className="mt-3 p-3 bg-orange-900/20 border-l-4 border-orange-400 rounded">
                          <span className="text-orange-300 text-sm">
                            <strong>Network Response:</strong> {force.network_response}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Crisis and Recovery - Enhanced timeline */}
        <ScrollSection
          id="crisis"
          onInView={(inView) => inView && setActiveSection('crisis')}
          className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Crisis & Recovery</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From major disruption to full recovery with enhanced military integration
              </p>
            </div>
            
            <div className="space-y-8">
              <TimelineEvent
                title="Major Network Disruption"
                date="May 14, 2023"
                description="Jordanian airstrike kills Meri Al-Rumaithan, network leadership evacuated"
                type="crisis"
                phase="Phase 3"
                impact="high"
                outcome="Leadership transition, Rafi fled to Lebanon"
                isActive={true}
              />
              
              <TimelineEvent
                title="Full Network Recovery"
                date="July 1, 2024"
                description="Rafi Al-Ruwais returns, enhanced military integration achieved"
                type="expansion"
                phase="Phase 4"
                impact="high"
                innovations={['Brigade-level cooperation', 'Systematic competitor elimination']}
                isActive={true}
              />
            </div>
          </div>
        </ScrollSection>

        {/* Innovation Section - Enhanced with opposition context */}
        <ScrollSection
          id="innovation"
          onInView={(inView) => inView && setActiveSection('innovation')}
          className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Tactical Innovation</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                July 2024: The network deploys an 82mm mortar system for cross-border drug delivery
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <TimelineEvent
                  title="Mortar Delivery System"
                  date="July 1, 2024"
                  description="Revolutionary 82mm mortar system enables 3km range drug delivery"
                  type="innovation"
                  phase="Phase 4"
                  impact="high"
                  isActive={true}
                />
                
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                  <h3 className="text-xl font-semibold text-white mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Range:</span>
                        <span className="text-blue-400 font-mono font-semibold">3km</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Payload:</span>
                        <span className="text-blue-400 font-mono font-semibold">Plastic-encased</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Supplier:</span>
                        <span className="text-blue-400 font-mono font-semibold">Hezbollah</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Accuracy:</span>
                        <span className="text-green-400 font-mono font-semibold">High</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="h-96 rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
                <NetworkMap
                  activeSection={activeSection}
                  onLocationSelect={(location) => console.log('Selected location:', location)}
                />
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Current Operations - Enhanced with new characters */}
        <ScrollSection
          id="current"
          onInView={(inView) => inView && setActiveSection('current')}
          className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Current Operations</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Multi-generational network with residential compound and cross-border coordination
              </p>
            </div>
            
            <div className="space-y-8">
              <TimelineEvent
                title="Next Generation Leadership"
                date="August 1, 2024"
                description="19-year-old Ahmed Al-Ruwais leading major operations"
                type="leadership"
                phase="Phase 5"
                impact="medium"
                isActive={true}
              />
              
              <TimelineEvent
                title="Operational Compound Established"
                date="August 7, 2024"
                description="15+ permanent residents including family and cross-border personnel"
                type="security"
                phase="Phase 5"
                impact="high"
                isActive={true}
              />
            </div>
            
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCharactersForSection('current').map(characterId => (
                <CharacterCard
                  key={characterId}
                  character={convertedCharacters[characterId]}
                  isActive={selectedCharacter === characterId}
                  onClick={() => setSelectedCharacter(characterId)}
                  isNew={isNewCharacter(characterId)}
                />
              ))}
            </div>
          </div>
        </ScrollSection>

        {/* Summary Dashboard - Enhanced with comprehensive data */}
        <ScrollSection
          id="summary"
          onInView={(inView) => inView && setActiveSection('summary')}
          className="bg-gradient-to-t from-slate-950 to-black min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Network Status: August 2024</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Complete overview of current operations, capabilities, and multi-generational leadership structure
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                  <h3 className="text-2xl font-semibold text-white mb-8">Operational Capabilities</h3>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Production Capacity</span>
                        <span className="text-green-400 font-semibold px-3 py-1 bg-green-400/20 rounded-full">OPERATIONAL</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Border Access</span>
                        <span className="text-green-400 font-semibold px-3 py-1 bg-green-400/20 rounded-full">SECURED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Government Protection</span>
                        <span className="text-green-400 font-semibold px-3 py-1 bg-green-400/20 rounded-full">ACTIVE</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Delivery Innovation</span>
                        <span className="text-blue-400 font-semibold px-3 py-1 bg-blue-400/20 rounded-full">DEPLOYED</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Military Integration</span>
                        <span className="text-purple-400 font-semibold px-3 py-1 bg-purple-400/20 rounded-full">8TH BRIGADE</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 text-lg">Network Resilience</span>
                        <span className="text-green-400 font-semibold px-3 py-1 bg-green-400/20 rounded-full">HIGH</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-8">
                  <CharacterCard
                    character={convertedCharacters.ahmed_al_ruwais}
                    isActive={selectedCharacter === 'ahmed_al_ruwais'}
                    onClick={() => setSelectedCharacter('ahmed_al_ruwais')}
                  />
                  <CharacterCard
                    character={convertedCharacters.osama_al_dayat}
                    isActive={selectedCharacter === 'osama_al_dayat'}
                    onClick={() => setSelectedCharacter('osama_al_dayat')}
                    isNew={true}
                  />
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h4 className="text-white font-semibold mb-6 text-lg">Key Metrics</h4>
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                      <div className="text-gray-300">Facility Operational</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-blue-400 mb-2">3km</div>
                      <div className="text-gray-300">Delivery Range</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                      <div className="text-gray-300">Compound Residents</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/10 rounded-lg">
                      <div className="text-3xl font-bold text-orange-400 mb-2">2nd</div>
                      <div className="text-gray-300">Generation Active</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
                  <h4 className="text-white font-semibold mb-6 text-lg">Recent Activity</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">Mortar system operational</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">8th Brigade coordination active</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">19-year-old commanding operations</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">Compound housing 15+ residents</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-300">Opposition forces active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Phase Analysis Section - NEW */}
        <ScrollSection
          id="phases"
          onInView={(inView) => inView && setActiveSection('phases')}
          className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Network Evolution: 5-Phase Analysis</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Transformation from basic smuggling to military-integrated enterprise
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Foundation Phase</h3>
                    <p className="text-gray-400">March 2022 • Duration: 1 month</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6">Basic operations with government connections</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Bassem Arsan (Syrian Council of Ministers) coordination</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">$700K+ operation financial scale demonstrated</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Iran-Syria supply chain activated</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">5-8</div>
                      <div className="text-xs text-gray-400">Core Members</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">Medium</div>
                      <div className="text-xs text-gray-400">Threat Level</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Expansion Phase</h3>
                    <p className="text-gray-400">July - September 2022 • Duration: 3 months</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6">Manufacturing integration and Hezbollah base establishment</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Two production sites with 'tons' of inventory</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Direct Lebanese Hezbollah command presence</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Multi-governorate operations established</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">10-15</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">High</div>
                      <div className="text-xs text-gray-400">Threat Level</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Crisis & Disruption */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Crisis & Disruption</h3>
                    <p className="text-gray-400">October 2022 - February 2023 • Duration: 5 months</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6">Major law enforcement operations and internal disruptions</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Syrian and international raids on facilities</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Key members arrested or forced to flee</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Temporary loss of production capacity</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">7-10</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">Severe</div>
                      <div className="text-xs text-gray-400">Threat Level</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4: Fortress Phase */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Fortress Phase</h3>
                    <p className="text-gray-400">March 2023 - June 2024 • Duration: 16 months</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6">Defensive consolidation, adaptation, and infrastructure hardening</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Maaraba Fortress constructed, security perimeter enforced</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Redundant supply lines and safe houses established</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Increased operational secrecy and compartmentalization</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">12-16</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">Very High</div>
                      <div className="text-xs text-gray-400">Threat Level</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-400 font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Recovery & Innovation</h3>
                    <p className="text-gray-400">July - August 2024 • Ongoing</p>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 mb-6">Full recovery with enhanced capabilities</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Brigade-level cooperation, competitor elimination</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">Mortar-based smuggling (3km range)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">15+ permanent residents including cross-border personnel</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">20+</div>
                      <div className="text-xs text-gray-400">Members</div>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-500 mb-1">Critical+</div>
                      <div className="text-xs text-gray-400">Threat Level</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Military Integration Analysis - NEW */}
        <ScrollSection
          id="military"
          onInView={(inView) => inView && setActiveSection('military')}
          className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Institutional Penetration Analysis</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                From criminal organization to hybrid military-criminal enterprise
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold text-white mb-8">Corruption Levels & Timeline</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <div className="w-0.5 h-16 bg-green-500/30 mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-green-400 font-semibold">Government Ministry</span>
                        <span className="text-gray-500 text-sm">2022</span>
                      </div>
                      <p className="text-white font-medium mb-2">Bassem Arsan - Syrian Council of Ministers</p>
                      <p className="text-gray-300 text-sm">Legal advisor with Iran medical import authorization access</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                      <div className="w-0.5 h-16 bg-yellow-500/30 mt-2"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-yellow-400 font-semibold">Intelligence Services</span>
                        <span className="text-gray-500 text-sm">2022-2023</span>
                      </div>
                      <p className="text-white font-medium mb-2">Air Force Intelligence</p>
                      <p className="text-gray-300 text-sm">School appropriation for drug manufacturing operations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-red-400 font-semibold">Military Brigade</span>
                        <span className="text-gray-500 text-sm">2024</span>
                      </div>
                      <p className="text-white font-medium mb-2">8th Brigade - Full Operational Partnership</p>
                      <div className="bg-red-900/20 rounded-lg p-4 mt-4">
                        <p className="text-red-300 text-sm font-medium mb-3">Brigade Services:</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Profit percentage payments</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Weapons theft from warehouses</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Competitor elimination</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">Legal protection services</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold text-lg mb-4">Key Military Coordinator</h4>
                  <CharacterCard
                    character={convertedCharacters.osama_al_dayat}
                    isActive={selectedCharacter === 'osama_al_dayat'}
                    onClick={() => setSelectedCharacter('osama_al_dayat')}
                    isNew={true}
                  />
                </div>
                
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold text-lg mb-4">Corruption Progression</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">2022:</span>
                      <span className="text-green-400 text-sm">Individual connections</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">2023:</span>
                      <span className="text-yellow-400 text-sm">Service coordination</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">2024:</span>
                      <span className="text-red-400 text-sm">Operational partnership</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>

        {/* Strategic Implications - NEW FINAL SECTION */}
        <ScrollSection
          id="strategic"
          onInView={(inView) => inView && setActiveSection('strategic')}
          className="bg-gradient-to-t from-black to-slate-950 min-h-screen flex items-center"
        >
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Strategic Assessment & Implications</h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Paradigm shift in organized crime sophistication
              </p>
            </div>
            
            <div className="space-y-12">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h3 className="text-2xl font-semibold text-white mb-8">Network Characteristics</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-gray-400">Sophistication Level:</span>
                      <span className="text-red-400 font-semibold ml-4">Unprecedented</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Institutional Integration:</span>
                      <span className="text-orange-400 font-semibold ml-4">Ministry → Brigade</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Technology:</span>
                      <span className="text-purple-400 font-semibold ml-4">Military-grade</span>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <span className="text-gray-400">Geographic Scope:</span>
                      <span className="text-blue-400 font-semibold ml-4">Multi-country residential</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sustainability:</span>
                      <span className="text-green-400 font-semibold ml-4">Multi-generational</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold text-lg mb-6">Resilience Factors</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-green-400 font-medium mb-2">Leadership Redundancy</h5>
                      <p className="text-gray-300 text-sm">Family-based succession across multiple countries</p>
                    </div>
                    <div>
                      <h5 className="text-blue-400 font-medium mb-2">Infrastructure Redundancy</h5>
                      <p className="text-gray-300 text-sm">Multiple facilities with functional redundancy</p>
                    </div>
                    <div>
                      <h5 className="text-purple-400 font-medium mb-2">Institutional Protection</h5>
                      <p className="text-gray-300 text-sm">Brigade-level military cooperation</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h4 className="text-white font-semibold text-lg mb-6">Strategic Concerns</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                      <div>
                        <p className="text-white font-medium text-sm">Criminal Network Evolution</p>
                        <p className="text-gray-400 text-xs">Quasi-institutional status potential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                      <div>
                        <p className="text-white font-medium text-sm">Corruption Institutionalization</p>
                        <p className="text-gray-400 text-xs">Systematic state apparatus compromise</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                      <div>
                        <p className="text-white font-medium text-sm">Cross-Border Integration</p>
                        <p className="text-gray-400 text-xs">International criminal coordination model</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-red-400 mb-6">Paradigm Shift Analysis</h3>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-4">Traditional Model</h4>
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <p className="text-gray-300 text-sm">Criminal organization vs. state apparatus</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-3xl text-red-400">→</div>
                  </div>
                  <div className="text-center">
                    <h4 className="text-white font-semibold mb-4">Emerging Model</h4>
                    <div className="bg-red-900/30 rounded-lg p-4">
                      <p className="text-red-300 text-sm">Hybrid criminal-military cooperation</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-red-300 font-medium text-lg">
                    New paradigm challenges traditional boundaries between crime and state
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollSection>
      </div>
    </div>
  );
};

export default Index;
