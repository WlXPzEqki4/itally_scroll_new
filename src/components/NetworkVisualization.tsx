
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';

interface NetworkVisualizationProps {
  data: any;
}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data?.nodes || !data?.edges) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Get container dimensions
    const container = svgRef.current.parentElement;
    if (!container) return;
    
    const width = container.clientWidth;
    const height = container.clientHeight - 80; // Account for header

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create main group for zooming/panning
    const g = svg.append('g');

    // Define helper functions BEFORE using them
    const getNodeRadius = (importance: number) => {
      if (importance >= 9) return 20;
      if (importance >= 7) return 16;
      if (importance >= 4) return 12;
      return 8;
    };

    const getNodeColor = (cluster: string) => {
      const colors = data.visualization_properties?.node_color_mapping || {
        'al_ruwais_family': '#8B0000',
        'government_officials': '#4B0082',
        'military_officials': '#228B22',
        'military_liaisons': '#32CD32',
        'hezbollah_network': '#FF4500',
        'jordanian_network': '#DAA520',
        'military_units': '#556B2F',
        'opposition_forces': '#DC143C',
        'primary_infrastructure': '#2F4F4F'
      };
      return colors[cluster] || '#69b3a2';
    };

    const getEdgeWidth = (weight: number) => {
      if (weight >= 9) return 4;
      if (weight >= 7) return 3;
      if (weight >= 4) return 2;
      return 1;
    };

    // Define zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Create force simulation with helper functions now defined
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.edges)
        .id((d: any) => d.id)
        .distance((d: any) => 100 - (d.weight || 5) * 5)
        .strength((d: any) => (d.weight || 5) / 10)
      )
      .force('charge', d3.forceManyBody()
        .strength((d: any) => -400 - (d.importance || 5) * 30)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide()
        .radius((d: any) => getNodeRadius(d.importance) + 5)
      );

    // Create edges
    const link = g.append('g')
      .selectAll('line')
      .data(data.edges)
      .enter().append('line')
      .attr('stroke', '#666')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', (d: any) => getEdgeWidth(d.weight || 5));

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(data.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .style('cursor', 'pointer');

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: any) => getNodeRadius(d.importance))
      .attr('fill', (d: any) => getNodeColor(d.cluster))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d: any) {
        // Highlight connected edges
        link.style('stroke-opacity', (l: any) => 
          l.source.id === d.id || l.target.id === d.id ? 1 : 0.1
        );
        
        // Show tooltip
        d3.select(this)
          .attr('stroke', '#ffff00')
          .attr('stroke-width', 3);
      })
      .on('mouseout', function() {
        // Reset edge opacity
        link.style('stroke-opacity', 0.6);
        
        // Reset node stroke
        d3.select(this)
          .attr('stroke', '#fff')
          .attr('stroke-width', 2);
      });

    // Add labels to nodes
    node.append('text')
      .text((d: any) => d.label)
      .attr('x', 0)
      .attr('y', (d: any) => getNodeRadius(d.importance) + 14)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('font-weight', '500')
      .attr('fill', '#ffffff')
      .style('pointer-events', 'none');

    // Add drag behavior
    const drag = d3.drag()
      .on('start', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    node.call(drag);

    // Update positions on each simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [data]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const container = svgRef.current.parentElement;
        if (container) {
          const width = container.clientWidth;
          const height = container.clientHeight - 80;
          d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">
            {data?.network_metadata?.title || 'Network Analysis'}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span>{data?.nodes?.length || 0} Nodes</span>
            <span>{data?.edges?.length || 0} Connections</span>
            <span className="text-xs">Drag • Zoom • Pan</span>
          </div>
        </div>
      </div>

      {/* Network Graph */}
      <div className="relative h-full">
        <svg
          ref={svgRef}
          className="bg-slate-900 w-full h-full"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
};

export default NetworkVisualization;
