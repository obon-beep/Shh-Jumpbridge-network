function buildGraph(connections, jumpbridges, ansigates) {
  const graph = {};
  
  // Add regular connections
  connections.forEach(conn => {
    const from = conn.from.toUpperCase();
    const to = conn.to.toUpperCase();
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    graph[from].push(to);
    graph[to].push(from);
  });
  
  // Add jumpbridges (if provided)
  if (jumpbridges && jumpbridges.length > 0) {
    jumpbridges.forEach(jb => {
      const from = jb.from.toUpperCase();
      const to = jb.to.toUpperCase();
      if (!graph[from]) graph[from] = [];
      if (!graph[to]) graph[to] = [];
      graph[from].push(to);
      graph[to].push(from);
    });
  }
  
  // Add ANSI gates (if provided)
  if (ansigates && ansigates.length > 0) {
    ansigates.forEach(ag => {
      const from = ag.from.toUpperCase();
      const to = ag.to.toUpperCase();
      if (!graph[from]) graph[from] = [];
      if (!graph[to]) graph[to] = [];
      graph[from].push(to);
      graph[to].push(from);
    });
  }
  
  return graph;
}

function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const queue = new Set(Object.keys(graph));
  
  queue.forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[start] = 0;
  
  while (queue.size > 0) {
    let minNode = null;
    queue.forEach(node => {
      if (minNode === null || distances[node] < distances[minNode]) {
        minNode = node;
      }
    });
    
    if (minNode === end) break;
    queue.delete(minNode);
    
    if (!graph[minNode]) continue;
    
    graph[minNode].forEach(neighbor => {
      const alt = distances[minNode] + 1;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = minNode;
      }
    });
  }
  
  const path = [];
  let current = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return path[0] === start ? path : [];
}
